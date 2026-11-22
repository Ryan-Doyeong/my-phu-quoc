#!/usr/bin/env node
import fs from 'node:fs'

function respond(payload) {
  process.stdout.write(`${JSON.stringify(payload)}\n`)
}

try {
  const raw = fs.readFileSync(0, 'utf8')
  const input = raw ? JSON.parse(raw) : {}
  const toolName = input?.toolCall?.name ?? ''
  const cmd = String(input?.toolCall?.args?.CommandLine ?? '')

  if (toolName !== 'run_command' || !cmd) {
    respond({ decision: 'allow' })
    process.exit(0)
  }

  // 순수 git / gh 명령(타 실행기 체이닝 없음)은 커밋 메시지·PR 본문 내 정책 언급 오탐 방지를 위해 허용
  const isPureVcsCmd =
    /^\s*(?:git|gh)\b/.test(cmd) &&
    !/\b(?:curl|wget|http|httpie|node|python3?|tsx|ts-node|deno|bun|ruby|perl|php)\b/.test(cmd)

  if (isPureVcsCmd) {
    respond({ decision: 'allow' })
    process.exit(0)
  }

  const assignsBannedKey =
    /(?:^|[\s;&|])(?:export\s+)?(?:NEXT_PUBLIC_)?GOOGLE_(?:PLACES|MAPS)_API_KEY\s*=/m.test(cmd)

  const invokesRunnerOrHttp =
    /\b(?:curl|wget|http|httpie|node|python3?|tsx|ts-node|deno|bun|ruby|perl|php)\b/.test(cmd)

  const hitsGooglePlacesEndpointOrHeader =
    /places\.googleapis\.com|maps\.googleapis\.com\/maps\/api\/|X-Goog-Api-Key/i.test(cmd)

  if (assignsBannedKey || (invokesRunnerOrHttp && hitsGooglePlacesEndpointOrHeader)) {
    respond({
      decision: 'deny',
      reason:
        '[원천 금지 정책] GOOGLE_PLACES_API_KEY / GOOGLE_MAPS_API_KEY 및 Google Places/Maps 유료 API는 베트남에서 사용할 수 없어 영구 차단되어 있습니다. 키가 불필요한 공개 Google Maps URL(lib/mapsLink.ts)만 사용하세요.',
    })
    process.exit(0)
  }

  respond({ decision: 'allow' })
} catch {
  respond({ decision: 'allow' })
}
