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
  'learning-growth': {
    ko: '학습/성장',
    en: 'Learning'
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
    ko: '미디어/인터뷰',
    en: 'Media'
  }
} as const;

export type ExperienceCategoryKey = keyof typeof experienceCategoryConfig;

export const experienceCategoryOrder = [
  'affiliation',
  'work-experience',
  'project',
  'learning-growth',
  'teaching-mentoring',
  'community',
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
    ko: '구조화',
    en: 'Structuring',
    description: {
      ko: '복잡한 내용, 정보, 시스템을 정리한 경험',
      en: 'Experiences where I organized complex information, systems, or context.'
    }
  },
  collaboration: {
    ko: '협업',
    en: 'Collaboration',
    description: {
      ko: '팀이나 타인과 함께 만든 경험',
      en: 'Experiences created with a team or other people.'
    }
  },
  coordination: {
    ko: '조율',
    en: 'Coordination',
    description: {
      ko: '의견, 역할, 일정, 흐름을 맞춘 경험',
      en: 'Experiences where I aligned opinions, roles, schedules, or workflow.'
    }
  },
  ownership: {
    ko: '오너십',
    en: 'Ownership',
    description: {
      ko: '맡은 일을 주도적으로 끝까지 끌고 간 경험',
      en: 'Experiences where I took ownership and carried work through.'
    }
  },
  operation: {
    ko: '운영',
    en: 'Operation',
    description: {
      ko: '지속적으로 관리하고 유지한 경험',
      en: 'Experiences where I maintained or operated something over time.'
    }
  },
  learning: {
    ko: '학습',
    en: 'Learning',
    description: {
      ko: '새롭게 배우고 익힌 경험',
      en: 'Experiences where I learned and practiced something new.'
    }
  },
  reflection: {
    ko: '회고',
    en: 'Reflection',
    description: {
      ko: '경험을 돌아보고 다음 행동으로 연결한 경험',
      en: 'Experiences where I reflected and connected the lesson to the next action.'
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
      ko: '배운 것을 다른 사람에게 전달한 경험',
      en: 'Experiences where I shared what I learned with others.'
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
    ko: '커뮤니티',
    en: 'Community',
    description: {
      ko: '사람들과 연결되고 활동한 경험',
      en: 'Experiences where I connected and participated with a community.'
    }
  },
  contribution: {
    ko: '기여',
    en: 'Contribution',
    description: {
      ko: '금전 기부, 후원, 참여처럼 넓은 의미로 보탠 경험',
      en: 'Experiences where I contributed through donation, support, or participation.'
    }
  },
  volunteering: {
    ko: '재능기부',
    en: 'Volunteering',
    description: {
      ko: '시간, 기술, 지식, 경험을 직접 나눈 경험',
      en: 'Experiences where I volunteered time, skills, knowledge, or experience.'
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
  }
} as const;

export type ProjectDomainKey = keyof typeof projectDomainConfig;

export const projectDomainKeys = Object.keys(projectDomainConfig) as ProjectDomainKey[];

export const isProjectDomainKey = (value: string): value is ProjectDomainKey =>
  value in projectDomainConfig;

export const getProjectDomainLabel = (domain: ProjectDomainKey) => projectDomainConfig[domain];

export const techTagConfig = {
  java: {
    ko: 'Java',
    en: 'Java'
  },
  android: {
    ko: 'Android',
    en: 'Android'
  },
  firebase: {
    ko: 'Firebase',
    en: 'Firebase'
  },
  retrofit: {
    ko: 'Retrofit',
    en: 'Retrofit'
  },
  zeplin: {
    ko: 'Zeplin',
    en: 'Zeplin'
  },
  awt: {
    ko: 'AWT',
    en: 'AWT'
  },
  swing: {
    ko: 'Swing',
    en: 'Swing'
  },
  csharp: {
    ko: 'C#',
    en: 'C#'
  },
  aspnet: {
    ko: 'ASP.NET',
    en: 'ASP.NET'
  },
  sqlserver: {
    ko: 'SQL Server',
    en: 'SQL Server'
  },
  mysql: {
    ko: 'MySQL',
    en: 'MySQL'
  },
  postgresql: {
    ko: 'PostgreSQL',
    en: 'PostgreSQL'
  },
  html: {
    ko: 'HTML',
    en: 'HTML'
  },
  css: {
    ko: 'CSS',
    en: 'CSS'
  },
  javascript: {
    ko: 'JavaScript',
    en: 'JavaScript'
  },
  ruby: {
    ko: 'Ruby',
    en: 'Ruby'
  },
  'google-analytics': {
    ko: 'Google Analytics',
    en: 'Google Analytics'
  },
  python: {
    ko: 'Python',
    en: 'Python'
  },
  django: {
    ko: 'Django',
    en: 'Django'
  },
  'django-rest-framework': {
    ko: 'Django REST Framework',
    en: 'Django REST Framework'
  },
  kotlin: {
    ko: 'Kotlin',
    en: 'Kotlin'
  },
  sqlite: {
    ko: 'SQLite',
    en: 'SQLite'
  },
  keras: {
    ko: 'Keras',
    en: 'Keras'
  },
  opencv: {
    ko: 'OpenCV',
    en: 'OpenCV'
  },
  tkinter: {
    ko: 'Tkinter',
    en: 'Tkinter'
  },
  pillow: {
    ko: 'Pillow',
    en: 'Pillow'
  },
  numpy: {
    ko: 'NumPy',
    en: 'NumPy'
  },
  'scikit-learn': {
    ko: 'scikit-learn',
    en: 'scikit-learn'
  },
  'ai-ml': {
    ko: 'AI/ML',
    en: 'AI/ML'
  },
  'aws-ec2': {
    ko: 'AWS EC2',
    en: 'AWS EC2'
  },
  'aws-s3': {
    ko: 'AWS S3',
    en: 'AWS S3'
  },
  sensor: {
    ko: 'Sensor',
    en: 'Sensor'
  }
} as const;

export type TechTagKey = keyof typeof techTagConfig;

export const techTagKeys = Object.keys(techTagConfig) as TechTagKey[];

export const isTechTagKey = (value: string): value is TechTagKey => value in techTagConfig;

export const getTechTagLabel = (tag: TechTagKey) => techTagConfig[tag];
