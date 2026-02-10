#!/usr/bin/env bash
set -euo pipefail

# lodash-v2 루트로 이동
cd "$(dirname "${BASH_SOURCE[0]}")/.." || exit 1

# 변경 사항이 없으면 조용히 종료
if git diff --quiet && git diff --cached --quiet; then
  echo "[commit-and-push] No changes to commit."
  exit 0
fi

if [ "$#" -lt 1 ]; then
  echo "[commit-and-push] 사용법: scripts/commit-and-push.sh \"type: 제목 (명령형)\""
  exit 1
fi

COMMIT_MSG="$1"

echo "[commit-and-push] Staging all changes..."
git add -A

echo "[commit-and-push] Committing with message:"
echo "  $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

echo "[commit-and-push] Pushing to origin..."
git push

echo "[commit-and-push] Done."

