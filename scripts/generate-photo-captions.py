import base64
import concurrent.futures
import json
import os
import re
import time
from pathlib import Path

import requests
from PIL import Image
from io import BytesIO

ROOT = Path.cwd()
PHOTO_DIR = ROOT / 'public' / 'all_media'
OUT = ROOT / 'src' / 'data' / 'photoCaptions.js'
MODEL = 'gemini-3-flash-preview'
API = os.environ['OPENAI_API_BASE'].rstrip('/') + '/chat/completions'
HEADERS = {'Authorization': f"Bearer {os.environ['OPENAI_API_KEY']}", 'Content-Type': 'application/json'}

files = sorted([p for p in PHOTO_DIR.iterdir() if p.suffix.lower() in {'.jpg', '.jpeg', '.png'}], key=lambda p: p.name)

def encode(path):
    with Image.open(path) as image:
        image = image.convert('RGB')
        image.thumbnail((640, 640))
        buffer = BytesIO()
        image.save(buffer, format='JPEG', quality=72, optimize=True)
    return 'data:image/jpeg;base64,' + base64.b64encode(buffer.getvalue()).decode('ascii')

def parse_json(text):
    cleaned = text.strip()
    if cleaned.startswith('```'):
        cleaned = re.sub(r'^```(?:json)?\s*', '', cleaned)
        cleaned = re.sub(r'\s*```$', '', cleaned)
    start = cleaned.find('[')
    end = cleaned.rfind(']')
    if start >= 0 and end > start:
        cleaned = cleaned[start:end + 1]
    return json.loads(cleaned)

def call_batch(batch):
    content = [{
        'type': 'text',
        'text': (
            'You are writing photo-specific memory captions for Samjhana from Abu. '
            'For each numbered image, return one JSON object using the exact filename. '
            'Describe only visible details; do not invent dates, places, identities, or events. '
            'Write warm, intimate English from Abu, but keep it concise. If a face is visible, '
            'mention the visible expression or style; if it is a group, object, or landscape, '
            'describe that visible subject instead. Make memory and comment clearly related to '
            'the image. Return JSON array only with keys file, caption, memory, comment.\n\n' +
            '\n'.join(f'{i + 1}. {p.name}' for i, p in enumerate(batch))
        )
    }]
    for p in batch:
        content.append({'type': 'image_url', 'image_url': {'url': encode(p), 'detail': 'low'}})
    payload = {
        'model': MODEL,
        'messages': [{'role': 'user', 'content': content}],
        'max_tokens': 2200,
        'response_format': {
            'type': 'json_schema',
            'json_schema': {
                'name': 'photo_captions',
                'strict': True,
                'schema': {
                    'type': 'array',
                    'items': {
                        'type': 'object',
                        'properties': {
                            'file': {'type': 'string'},
                            'caption': {'type': 'string'},
                            'memory': {'type': 'string'},
                            'comment': {'type': 'string'},
                        },
                        'required': ['file', 'caption', 'memory', 'comment'],
                        'additionalProperties': False,
                    },
                },
            },
        },
    }
    for attempt in range(4):
        try:
            response = requests.post(API, headers=HEADERS, json=payload, timeout=180)
            response.raise_for_status()
            content = response.json()['choices'][0]['message']['content']
            if isinstance(content, list):
                content = ''.join(part.get('text', '') for part in content if isinstance(part, dict))
            data = parse_json(content)
            expected = {p.name for p in batch}
            data = [row for row in data if row.get('file') in expected]
            if len(data) != len(batch):
                raise ValueError(f'Expected {len(batch)} captions, got {len(data)}')
            return data
        except Exception as exc:
            if attempt == 3:
                raise
            time.sleep(2 ** attempt)

all_rows = []
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
    futures = [executor.submit(call_batch, files[i:i + 4]) for i in range(0, len(files), 4)]
    for index, future in enumerate(futures, 1):
        rows = future.result()
        all_rows.extend(rows)
        print(f'completed batch {index}/{len(futures)} ({len(all_rows)}/{len(files)})', flush=True)

by_file = {row['file']: row for row in all_rows}
missing = [p.name for p in files if p.name not in by_file]
if missing:
    raise SystemExit(f'Missing captions for {len(missing)} files: {missing[:5]}')

lines = [
    '// Vision-reviewed metadata for the real all_media photo catalog.',
    '// Captions describe visible content only and are keyed by exact filename.',
    'export const photoCaptions = ',
    json.dumps(by_file, ensure_ascii=False, indent=2),
    ';',
    '',
]
OUT.write_text('\n'.join(lines), encoding='utf-8')
print(f'Wrote {len(by_file)} filename-keyed photo caption records to {OUT}')
