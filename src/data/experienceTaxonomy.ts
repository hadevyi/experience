export const experienceCategoryConfig = {
  project: {
    ko: '프로젝트',
    en: 'Project'
  },
  affiliation: {
    ko: '소속/기관',
    en: 'Affiliation'
  },
  'work-experience': {
    ko: '업무경험',
    en: 'Work'
  },
  'event-operation': {
    ko: '행사/운영',
    en: 'Event'
  },
  'learning-growth': {
    ko: '학습/성장',
    en: 'Learning'
  },
  certification: {
    ko: '자격/인증',
    en: 'Certification'
  },
  'teaching-mentoring': {
    ko: '강의/멘토링',
    en: 'Teaching'
  },
  community: {
    ko: '활동/커뮤니티',
    en: 'Community'
  },
  'award-scholarship': {
    ko: '수상/장학',
    en: 'Awards'
  },
  'media-interview': {
    ko: '미디어/발표',
    en: 'Media/Talk'
  }
} as const;

export type ExperienceCategoryKey = keyof typeof experienceCategoryConfig;

export const experienceCategoryOrder = [
  'affiliation',
  'work-experience',
  'project',
  'learning-growth',
  'certification',
  'teaching-mentoring',
  'community',
  'event-operation',
  'award-scholarship',
  'media-interview'
] as const satisfies readonly ExperienceCategoryKey[];

export const experienceCategoryKeys = experienceCategoryOrder;

export const isExperienceCategoryKey = (value: string): value is ExperienceCategoryKey =>
  value in experienceCategoryConfig;

export const getExperienceCategoryLabel = (category: ExperienceCategoryKey) =>
  experienceCategoryConfig[category];

export const experienceTagConfig = {
  'problem-solving': {
    ko: '문제해결',
    en: 'Problem Solving',
    description: {
      ko: '문제를 정의하고 해결한 경험',
      en: 'Experiences where I defined and solved a problem.'
    }
  },
  improvement: {
    ko: '개선',
    en: 'Improvement',
    description: {
      ko: '기존 흐름이나 결과를 더 낫게 만든 경험',
      en: 'Experiences where I improved an existing flow or outcome.'
    }
  },
  structuring: {
    ko: '체계화',
    en: 'Systematization',
    description: {
      ko: '복잡한 정보, 흐름, 기준을 체계로 정리한 경험',
      en: 'Experiences where I organized complex information, flows, or standards into a system.'
    }
  },
  collaboration: {
    ko: '협업',
    en: 'Collaboration',
    description: {
      ko: '서로 다른 역할이나 관점을 맞춰 함께 결과를 만든 경험',
      en: 'Experiences where I worked across different roles or perspectives to create an outcome.'
    }
  },
  coordination: {
    ko: '진행 조율',
    en: 'Coordination',
    description: {
      ko: '의견, 역할, 일정, 진행 흐름을 맞춘 경험',
      en: 'Experiences where I aligned opinions, roles, schedules, or workflow.'
    }
  },
  ownership: {
    ko: '주도성',
    en: 'Initiative',
    description: {
      ko: '먼저 판단하고 맡은 일을 끝까지 밀고 간 경험',
      en: 'Experiences where I made decisions proactively and carried work through.'
    }
  },
  operation: {
    ko: '운영',
    en: 'Operation',
    description: {
      ko: '반복되는 업무, 조직, 프로그램을 안정적으로 굴린 경험',
      en: 'Experiences where I reliably operated recurring work, organizations, or programs.'
    }
  },
  'growth-foundation': {
    ko: '성장기반',
    en: 'Growth Foundation',
    description: {
      ko: '진로와 개발자로서의 기반을 만든 경험',
      en: 'Experiences that formed the foundation for my direction and growth as a developer.'
    }
  },
  'academic-achievement': {
    ko: '학업성취',
    en: 'Academic Achievement',
    description: {
      ko: '학업 성과나 교육 과정의 성취를 공식적으로 인정받은 경험',
      en: 'Experiences where academic or educational achievement was formally recognized.'
    }
  },
  'technical-learning': {
    ko: '기술학습',
    en: 'Technical Learning',
    description: {
      ko: '새 기술이나 개발 지식을 익히고 실제로 적용한 경험',
      en: 'Experiences where I learned new technical knowledge and applied it in practice.'
    }
  },
  'ai-utilization': {
    ko: 'AI 활용',
    en: 'AI Utilization',
    description: {
      ko: 'AI를 도구로 활용해 분석, 학습, 문제 해결, 작업 흐름을 개선한 경험',
      en: 'Experiences where I used AI as a tool for analysis, learning, problem solving, or workflow improvement.'
    }
  },
  reflection: {
    ko: '경험공유',
    en: 'Experience Sharing',
    description: {
      ko: '내가 겪은 과정, 시행착오, 관점을 다른 사람에게 공유한 경험',
      en: 'Experiences where I shared my process, trials, and perspective with others.'
    }
  },
  documentation: {
    ko: '문서화',
    en: 'Documentation',
    description: {
      ko: '정보를 문서나 자료로 정리해 전달한 경험',
      en: 'Experiences where I organized information into documents or materials for others.'
    }
  },
  'knowledge-sharing': {
    ko: '지식공유',
    en: 'Knowledge Sharing',
    description: {
      ko: '기술, 개념, 방법, 실습 흐름을 다른 사람에게 전달한 경험',
      en: 'Experiences where I shared technical knowledge, concepts, methods, or practice flows.'
    }
  },
  teaching: {
    ko: '강의',
    en: 'Teaching',
    description: {
      ko: '교육 콘텐츠나 수업을 진행한 경험',
      en: 'Experiences where I led a class or educational content.'
    }
  },
  mentoring: {
    ko: '멘토링',
    en: 'Mentoring',
    description: {
      ko: '개인이나 팀의 성장을 도운 경험',
      en: 'Experiences where I supported the growth of a person or team.'
    }
  },
  community: {
    ko: '네트워크',
    en: 'Network',
    description: {
      ko: '사람들과 연결되고 지속적인 관계 기반을 만든 경험',
      en: 'Experiences where I built connections and a sustained relationship base.'
    }
  },
  volunteering: {
    ko: '재능기부',
    en: 'Skill Volunteering',
    description: {
      ko: '보상보다 나눔을 목적으로 시간, 기술, 지식, 경험을 직접 제공한 경험',
      en: 'Experiences where I directly offered time, skills, knowledge, or experience for contribution rather than compensation.'
    }
  },
  sponsorship: {
    ko: '후원',
    en: 'Sponsorship',
    description: {
      ko: '금전, 물품, 자원 지원으로 사람이나 공동체를 도운 경험',
      en: 'Experiences where I supported people or communities through money, goods, or other resources.'
    }
  },
  presentation: {
    ko: '발표',
    en: 'Presentation',
    description: {
      ko: '발표나 세션을 통해 내용을 전달한 경험',
      en: 'Experiences where I delivered content through a presentation or session.'
    }
  }
} as const;

export type ExperienceTagKey = keyof typeof experienceTagConfig;

export const experienceTagKeys = Object.keys(experienceTagConfig) as ExperienceTagKey[];

export const isExperienceTagKey = (value: string): value is ExperienceTagKey =>
  value in experienceTagConfig;

export const getExperienceTagLabel = (tag: ExperienceTagKey) => experienceTagConfig[tag];

export const projectDomainConfig = {
  web: {
    ko: '웹',
    en: 'Web'
  },
  'open-source': {
    ko: '오픈소스',
    en: 'Open Source'
  },
  desktop: {
    ko: '데스크톱 앱',
    en: 'Desktop App'
  },
  mobile: {
    ko: '모바일 앱',
    en: 'Mobile App'
  },
  'ai-ml': {
    ko: 'AI/ML',
    en: 'AI/ML'
  },
  iot: {
    ko: 'IoT',
    en: 'IoT'
  },
  metaverse: {
    ko: '메타버스',
    en: 'Metaverse'
  }
} as const;

export type ProjectDomainKey = keyof typeof projectDomainConfig;

export const projectDomainKeys = Object.keys(projectDomainConfig) as ProjectDomainKey[];

export const isProjectDomainKey = (value: string): value is ProjectDomainKey =>
  value in projectDomainConfig;

export const getProjectDomainLabel = (domain: ProjectDomainKey) => projectDomainConfig[domain];

export const techTagGroupConfig = {
  language: {
    ko: '언어',
    en: 'Languages'
  },
  framework: {
    ko: '프레임워크/라이브러리',
    en: 'Frameworks/Libraries'
  },
  database: {
    ko: '데이터베이스',
    en: 'Databases'
  },
  cloudInfra: {
    ko: '클라우드/인프라',
    en: 'Cloud/Infra'
  },
  aiData: {
    ko: 'AI/ML·데이터',
    en: 'AI/ML & Data'
  },
  toolPlatform: {
    ko: '도구/플랫폼',
    en: 'Tools/Platforms'
  }
} as const;

export type TechTagGroupKey = keyof typeof techTagGroupConfig;

export const techTagGroupKeys = Object.keys(techTagGroupConfig) as TechTagGroupKey[];

export const getTechTagGroupLabel = (group: TechTagGroupKey) => techTagGroupConfig[group];

export const techTagConfig = {
  java: {
    ko: 'Java',
    en: 'Java',
    group: 'language'
  },
  android: {
    ko: 'Android',
    en: 'Android',
    group: 'toolPlatform'
  },
  firebase: {
    ko: 'Firebase',
    en: 'Firebase',
    group: 'cloudInfra'
  },
  retrofit: {
    ko: 'Retrofit',
    en: 'Retrofit',
    group: 'framework'
  },
  vue: {
    ko: 'Vue',
    en: 'Vue',
    group: 'framework'
  },
  'spring-boot': {
    ko: 'Spring Boot',
    en: 'Spring Boot',
    group: 'framework'
  },
  mybatis: {
    ko: 'MyBatis',
    en: 'MyBatis',
    group: 'framework'
  },
  jpa: {
    ko: 'JPA',
    en: 'JPA',
    group: 'framework'
  },
  querydsl: {
    ko: 'QueryDSL',
    en: 'QueryDSL',
    group: 'framework'
  },
  bootstrap: {
    ko: 'Bootstrap',
    en: 'Bootstrap',
    group: 'framework'
  },
  chartjs: {
    ko: 'Chart.js',
    en: 'Chart.js',
    group: 'framework'
  },
  zeplin: {
    ko: 'Zeplin',
    en: 'Zeplin',
    group: 'toolPlatform'
  },
  awt: {
    ko: 'AWT',
    en: 'AWT',
    group: 'framework'
  },
  swing: {
    ko: 'Swing',
    en: 'Swing',
    group: 'framework'
  },
  csharp: {
    ko: 'C#',
    en: 'C#',
    group: 'language'
  },
  aspnet: {
    ko: 'ASP.NET',
    en: 'ASP.NET',
    group: 'framework'
  },
  sqlserver: {
    ko: 'SQL Server',
    en: 'SQL Server',
    group: 'database'
  },
  mysql: {
    ko: 'MySQL',
    en: 'MySQL',
    group: 'database'
  },
  postgresql: {
    ko: 'PostgreSQL',
    en: 'PostgreSQL',
    group: 'database'
  },
  html: {
    ko: 'HTML',
    en: 'HTML',
    group: 'language'
  },
  css: {
    ko: 'CSS',
    en: 'CSS',
    group: 'language'
  },
  javascript: {
    ko: 'JavaScript',
    en: 'JavaScript',
    group: 'language'
  },
  nodejs: {
    ko: 'Node.js',
    en: 'Node.js',
    group: 'language'
  },
  ruby: {
    ko: 'Ruby',
    en: 'Ruby',
    group: 'language'
  },
  'google-analytics': {
    ko: 'Google Analytics',
    en: 'Google Analytics',
    group: 'toolPlatform'
  },
  python: {
    ko: 'Python',
    en: 'Python',
    group: 'language'
  },
  django: {
    ko: 'Django',
    en: 'Django',
    group: 'framework'
  },
  nodered: {
    ko: 'Node-RED',
    en: 'Node-RED',
    group: 'framework'
  },
  kurento: {
    ko: 'Kurento',
    en: 'Kurento',
    group: 'framework'
  },
  kotlin: {
    ko: 'Kotlin',
    en: 'Kotlin',
    group: 'language'
  },
  sqlite: {
    ko: 'SQLite',
    en: 'SQLite',
    group: 'database'
  },
  keras: {
    ko: 'Keras',
    en: 'Keras',
    group: 'aiData'
  },
  opencv: {
    ko: 'OpenCV',
    en: 'OpenCV',
    group: 'aiData'
  },
  tkinter: {
    ko: 'Tkinter',
    en: 'Tkinter',
    group: 'framework'
  },
  pillow: {
    ko: 'Pillow',
    en: 'Pillow',
    group: 'aiData'
  },
  numpy: {
    ko: 'NumPy',
    en: 'NumPy',
    group: 'aiData'
  },
  'ai-ml': {
    ko: 'AI/ML',
    en: 'AI/ML',
    group: 'aiData'
  },
  'aws-ec2': {
    ko: 'AWS EC2',
    en: 'AWS EC2',
    group: 'cloudInfra'
  },
  'aws-s3': {
    ko: 'AWS S3',
    en: 'AWS S3',
    group: 'cloudInfra'
  },
  nginx: {
    ko: 'Nginx',
    en: 'Nginx',
    group: 'cloudInfra'
  },
  jenkins: {
    ko: 'Jenkins',
    en: 'Jenkins',
    group: 'cloudInfra'
  },
  docker: {
    ko: 'Docker',
    en: 'Docker',
    group: 'cloudInfra'
  },
  figma: {
    ko: 'Figma',
    en: 'Figma',
    group: 'toolPlatform'
  },
  sensor: {
    ko: 'Sensor',
    en: 'Sensor',
    group: 'toolPlatform'
  },
  tensorflow: {
    ko: 'TensorFlow',
    en: 'TensorFlow',
    group: 'aiData'
  },
  unity: {
    ko: 'Unity',
    en: 'Unity',
    group: 'toolPlatform'
  },
  photon: {
    ko: 'Photon',
    en: 'Photon',
    group: 'toolPlatform'
  },
  'kakaotalk-api': {
    ko: 'KakaoTalk API',
    en: 'KakaoTalk API',
    group: 'toolPlatform'
  },
  'kakao-map-api': {
    ko: 'Kakao Map API',
    en: 'Kakao Map API',
    group: 'toolPlatform'
  }
} as const satisfies Record<string, { ko: string; en: string; group: TechTagGroupKey }>;

export type TechTagKey = keyof typeof techTagConfig;

export const techTagKeys = Object.keys(techTagConfig) as TechTagKey[];

export const isTechTagKey = (value: string): value is TechTagKey => value in techTagConfig;

export const getTechTagLabel = (tag: TechTagKey) => techTagConfig[tag];

export const getTechTagGroup = (tag: TechTagKey) => techTagConfig[tag].group;

export const groupedTechTagKeys = techTagGroupKeys
  .map((group) => ({
    group,
    label: getTechTagGroupLabel(group),
    tags: techTagKeys
      .filter((tag) => getTechTagGroup(tag) === group)
      .sort((left, right) => {
        if (left === 'ai-ml') return -1;
        if (right === 'ai-ml') return 1;

        return getTechTagLabel(left).en.localeCompare(getTechTagLabel(right).en, 'en');
      })
  }))
  .filter(({ tags }) => tags.length > 0);
