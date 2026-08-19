#!/bin/bash
# Push the optimization changes to GitHub in small commits to satisfy the
# repository's push rule (GH013). Keeps the full change locally but uploads
# in ~20-file batches (~60MB each).
set -u
cd "$(dirname "$0")/.."
CHUNK_SIZE=20

git diff --cached --name-only > /tmp/staged.txt
# Move the batch script itself out of the change set
grep -v "push_in_chunks.sh" /tmp/staged.txt > /tmp/media.txt || true
grep "push_in_chunks.sh" /tmp/staged.txt > /tmp/script.txt || true
TOTAL=$(wc -l < /tmp/media.txt)
echo "files: $TOTAL"

i=0; n=0
while [ $i -lt $TOTAL ]; do
  n=$((n+1))
  start=$((i+1)); end=$((i+CHUNK_SIZE))
  batch=$(sed -n "${start},${end}p" /tmp/media.txt)
  count=$(echo "$batch" | wc -l)
  # Fresh index, stage only this batch
  git -c core.quotePath=false reset -q
  echo "$batch" | while IFS= read -r f; do git add -f "$f"; done
  # First batch also carries the helper script
  if [ $n -eq 1 ] && [ -s /tmp/script.txt ]; then
    while IFS= read -r f; do git add -f "$f"; done < /tmp/script.txt
  fi
  git -c user.name="Manus Agent" -c user.email="agent@manus.im" \
    commit -q -m "perf: optimize media batch $n/$(((TOTAL+CHUNK_SIZE-1)/CHUNK_SIZE))"
  echo "pushing chunk $n ($count files)..."
  if git push origin main 2>&1 | tail -1 | grep -q "error"; then
    echo "PUSH FAILED at chunk $n"
    exit 1
  fi
  i=$((i+CHUNK_SIZE))
done
echo "ALL CHUNKS PUSHED OK"
