#!/usr/bin/env python3
"""Optimize site media in place (filenames preserved so all page references keep working).

Targets:
  - JPEGs: re-encode at max 1440px long edge, quality 82, progressive, no metadata.
    On WhatsApp-style photos this typically cuts 70-85% of file size with no visible loss.
  - PNGs: convert to optimized RGB JPEG-compatible quality (kept as PNG, quantized).
Location sources of truth (all kept byte-identical across the three places):
  - public/all_media   (consumed by vite build)
  - dist/all_media     (served by GitHub Pages)
  - repo-root all_media (legacy GitHub Pages copy)
"""
import os
import sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIRS = [
    os.path.join(ROOT, "public", "all_media"),
    os.path.join(ROOT, "dist", "all_media"),
    os.path.join(ROOT, "all_media"),
]
MAX_EDGE = 1440
JPEG_Q = 82
JPEG_SUB = 2  # 4:2:0 chroma, smaller files, fine for photos


def optimize_jpeg(path):
    with Image.open(path) as im:
        im = im.convert("RGB")
        if max(im.size) > MAX_EDGE:
            ratio = MAX_EDGE / max(im.size)
            im = im.resize((round(im.width * ratio), round(im.height * ratio)), Image.LANCZOS)
        tmp = path + ".opt"
        im.save(tmp, "JPEG", quality=JPEG_Q, subsampling=JPEG_SUB,
                optimize=True, progressive=True)
    size_before = os.path.getsize(path)
    size_after = os.path.getsize(tmp)
    os.replace(tmp, path)
    return size_before, size_after


def optimize_png(path):
    with Image.open(path) as im:
        if im.mode in ("RGBA", "LA", "P"):
            im = im.quantize(colors=256, method=Image.FASTOCTREE)
        tmp = path + ".opt"
        im.save(tmp, "PNG", optimize=True)
    size_before = os.path.getsize(path)
    size_after = os.path.getsize(tmp)
    if size_after < size_before:
        os.replace(tmp, path)
    else:
        os.remove(tmp)
        size_after = size_before
    return size_before, size_after


def main():
    total_before = total_after = 0
    files = 0
    for d in DIRS:
        if not os.path.isdir(d):
            continue
        for name in sorted(os.listdir(d)):
            p = os.path.join(d, name)
            if not os.path.isfile(p):
                continue
            low = name.lower()
            if low.endswith((".jpg", ".jpeg")):
                b, a = optimize_jpeg(p)
            elif low.endswith(".png"):
                b, a = optimize_png(p)
            elif low.endswith(".mp4"):
                continue  # handled separately by ffmpeg
            else:
                continue
            total_before += b
            total_after += a
            files += 1
    print(f"processed={files} before={total_before/1e6:.1f}MB after={total_after/1e6:.1f}MB "
          f"saving={100*(1-total_after/total_before):.0f}%")


if __name__ == "__main__":
    sys.exit(main())
