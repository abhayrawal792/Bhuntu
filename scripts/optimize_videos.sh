#!/bin/bash
# Compress all MP4s in the three media locations (filenames preserved).
# H.264 baseline-friendly mobile playback: crf 28, yuv420p, faststart for streaming.
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CRF="${CRF:-28}"

for d in "$ROOT/public/all_media" "$ROOT/dist/all_media" "$ROOT/all_media"; do
  [ -d "$d" ] || continue
  for f in "$d"/*.mp4; do
    [ -e "$f" ] || continue
    tmp="$f.tmp.mp4"
    before=$(stat -c%s "$f")
    ffmpeg -y -loglevel error -i "$f" -c:v libx264 -preset slow -crf "$CRF" \
      -pix_fmt yuv420p -profile:v main -vf "scale='min(1280,iw)':-2" \
      -c:a aac -b:a 64k -movflags +faststart "$tmp"
    after=$(stat -c%s "$tmp")
    if [ "$after" -lt "$before" ]; then
      mv "$tmp" "$f"
      echo "$f: $(echo "scale=0; $before/1048576" | bc)MB -> $(echo "scale=0; $after/1048576" | bc)MB"
    else
      rm -f "$tmp"
      echo "$f: skipped (no gain)"
    fi
  done
done
echo "Video compression done."
