export const siteMeta = {
  title: 'Experience',
  brand: '당현아 경험 정리',
  subtitle: '독립 경험 기록 사이트',
  tagline: '성장 흐름과 운영 기준을 시간 맥락으로 정리하는 기록',
  description:
    '이력서 뒤에 있는 맥락과 배운 점, 운영 기준을 시간 흐름에 따라 정리하는 당현아의 경험 기록 사이트입니다.',
  siteUrl: 'https://hadevyi.github.io/experience/',
  rootPath: '/experience/',
  repoUrl: 'https://github.com/hadevyi/experience'
} as const;

export const mainNav = [
  {
    href: '/experience/',
    label: '홈',
    description: '경험 정리 메인 페이지'
  },
  {
    href: 'https://hadevyi.github.io/',
    label: '공식 홈페이지',
    description: '공식 홈페이지로 돌아가기',
    external: true
  },
  {
    href: 'https://github.com/hadevyi/experience',
    label: '저장소',
    description: '이 사이트 저장소 보기',
    external: true
  }
] as const;

export const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/hadevyi'
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hadevyi/'
  }
] as const;
