#!/bin/bash
# Commit + push remaining files listed in /tmp/media.txt in batches of 20.
set -u
cd "$(dirname "$0")/.."
CHUNK_SIZE=20
TOTAL=$(wc -l < /tmp/media.txt)
i=0; n=10
while [ $i -lt $TOTAL ]; do
  n=$((n+1))
  start=$((i+1)); end=$((i+CHUNK_SIZE))
  batch=$(sed -n "${start},${end}p" /tmp/media.txt)
  git add -f $(echo "$batch" | tr '\n' ' ')
  git -c user.name="Manus Agent" -c user.email="agent@manus.im" commit -q -m "perf: optimize media batch $n/$(((TOTAL+CHUNK_SIZE-1)/CHUNK_SIZE))"
  echo "pushing chunk $n..."
  git push origin main 2>&1 | tail -1 | grep -q "!" && { echo "FAILED at $n"; exit 1; }
  i=$((i+CHUNK_SIZE))
done
echo "ALL REMAINING CHUNKS PUSHED"
