# TOOLS.md — 로컬 설정·도구

## 디스코드 알림 (구현·작업 보고)

구현 완료·커밋 푸시 후 디스코드로 알림을 보내려면:

1. **디스코드 서버**에서 채널 설정 → 연동 → 웹후크 → 새 웹후크 생성. URL 복사.
2. **레포 루트**에 `.env` 파일 생성 후 한 줄 추가:
   ```bash
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
   ```
3. `.env`는 `.gitignore`에 있으므로 커밋되지 않습니다. (비밀 유지)
4. HEARTBEAT/매 턴에서 커밋·푸시를 한 뒤 다음 중 하나 실행:
   - `bun run scripts/notify-discord.ts "lodash-v2: 구현 완료 함수명, 커밋 푸시 완료"`
   - `scripts/notify-discord.sh "lodash-v2: 구현 완료 함수명, 커밋 푸시 완료"`

URL이 없으면 스크립트는 조용히 건너뜁니다.
