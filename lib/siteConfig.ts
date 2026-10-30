/**
 * 사이트 전역 플래그 설정
 * - 사용자(Ryan) 지시: 유료 스폰서 느낌을 주는 요소는 우선 모두 숨김 처리(플래그로 관리, 추후 복구 가능)
 */
export const SITE_CONFIG = {
  // 커뮤니티 파트너, 스폰서 안내 등 유료 스폰서 느낌을 주는 문구/링크 화면 표시 여부
  showCommunityPartnerMentions: false,
} as const
