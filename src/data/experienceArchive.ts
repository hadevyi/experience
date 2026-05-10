import type { CollectionEntry } from 'astro:content';
import {
  experienceCategoryConfig,
  isExperienceCategoryKey,
  isExperienceTagKey,
  isProjectDomainKey,
  isTechTagKey,
  type ExperienceCategoryKey,
  type ExperienceTagKey,
  type ProjectDomainKey,
  type TechTagKey
} from './experienceTaxonomy';

export const experienceLanguages = ['ko', 'en'] as const;
export type ExperienceLanguage = (typeof experienceLanguages)[number];
export type ExperienceEntry = CollectionEntry<'experiences'>;

export const statusLabels = {
  now: {
    ko: '진행중',
    en: 'In progress'
  },
  done: {
    ko: '완료',
    en: 'Done'
  }
} as const;

export type ExperienceStatus = 'draft' | 'in-progress' | 'done';
export type ExperienceVisibility = 'public' | 'private';
export type ExperiencePeriodPointPrecision = 'year' | 'month' | 'day' | 'minute';
export type ExperienceRelation =
  | 'affiliation'
  | 'university'
  | 'department'
  | 'project'
  | 'activity'
  | 'award'
  | 'lab-recommendation'
  | 'extended-activity'
  | 'previous-role'
  | 'previous'
  | 'next'
  | 'source'
  | 'result'
  | 'reference'
  | 'related';

export interface ExperienceRelated {
  number: string;
  relation?: ExperienceRelation;
  note?: {
    ko?: string;
    en?: string;
  };
}

export const experienceRelationLabels = {
  affiliation: {
    ko: '소속',
    en: 'Affiliation'
  },
  university: {
    ko: '학교',
    en: 'University'
  },
  department: {
    ko: '학과',
    en: 'Department'
  },
  project: {
    ko: '프로젝트',
    en: 'Project'
  },
  activity: {
    ko: '활동',
    en: 'Activity'
  },
  award: {
    ko: '수상',
    en: 'Award'
  },
  'lab-recommendation': {
    ko: '랩실 추천',
    en: 'Lab recommendation'
  },
  'extended-activity': {
    ko: '이어진 활동',
    en: 'Extended activity'
  },
  'previous-role': {
    ko: '이전 역할',
    en: 'Previous role'
  },
  previous: {
    ko: '이전',
    en: 'Previous'
  },
  next: {
    ko: '다음',
    en: 'Next'
  },
  source: {
    ko: '출처',
    en: 'Source'
  },
  result: {
    ko: '결과',
    en: 'Result'
  },
  reference: {
    ko: '참고',
    en: 'Reference'
  },
  related: {
    ko: '연관',
    en: 'Related'
  }
} as const satisfies Record<ExperienceRelation, ExperienceLocalizedMetaText>;

const isExperienceRelation = (value: string): value is ExperienceRelation =>
  value in experienceRelationLabels;

export interface ExperienceLocalizedMetaText {
  ko?: string;
  en?: string;
}

export interface ExperienceRepresentativeImage {
  src: string;
  alt?: ExperienceLocalizedMetaText;
  caption?: ExperienceLocalizedMetaText;
}

export interface ExperiencePeriod {
  start: string;
  end?: string | null;
  current?: boolean;
}

interface ParsedExperiencePeriodPoint {
  year: number;
  month?: number;
  day?: number;
  hour?: string;
  minute?: string;
  precision: ExperiencePeriodPointPrecision;
}

export interface ExperienceMeta {
  number: string;
  periods: ExperiencePeriod[];
  category: ExperienceCategoryKey;
  visibility: ExperienceVisibility;
  status: ExperienceStatus;
  teamSize?: number;
  experienceTags?: ExperienceTagKey[];
  projectDomains?: ProjectDomainKey[];
  techTags?: TechTagKey[];
  related?: ExperienceRelated[];
  representativeImage?: ExperienceRepresentativeImage | null;
  featured?: boolean;
}

export interface ExperiencePair {
  number: string;
  meta: ExperienceMeta;
  ko: ExperienceEntry;
  en?: ExperienceEntry;
}

export interface ExperienceLocalizedSection {
  ko: {
    label: string;
    body: string;
  };
  en: {
    label: string;
    body: string;
  };
}

const metaModules = import.meta.glob('../content/experiences/*/meta.json', {
  eager: true,
  import: 'default'
}) as Record<string, ExperienceMeta>;

const periodPointPattern =
  /^(\d{4})(?:-(\d{2})(?:-(\d{2})(?:[T ](\d{2}):(\d{2})(?::\d{2})?(?:Z|[+-]\d{2}:\d{2})?)?)?)?$/;

const parseExperiencePeriodPoint = (value: string): ParsedExperiencePeriodPoint => {
  const matched = value.match(periodPointPattern);

  if (!matched) {
    throw new Error(
      `Invalid period point "${value}". Use YYYY, YYYY-MM, YYYY-MM-DD, or YYYY-MM-DDTHH:mm format.`
    );
  }

  const [, year, month, day, hour, minute] = matched;

  if (hour && (!month || !day)) {
    throw new Error(`Invalid period point "${value}". Time requires a full YYYY-MM-DD date.`);
  }

  return {
    year: Number(year),
    month: month ? Number(month) : undefined,
    day: day ? Number(day) : undefined,
    hour,
    minute,
    precision: hour ? 'minute' : day ? 'day' : month ? 'month' : 'year'
  };
};

const periodPointSortValue = (point: ParsedExperiencePeriodPoint) =>
  point.year * 100000000 +
  (point.month ?? 1) * 1000000 +
  (point.day ?? 1) * 10000 +
  Number(point.hour ?? '00') * 100 +
  Number(point.minute ?? '00');

const validateExperiencePeriods = (number: string, periods: ExperiencePeriod[]) => {
  if (!Array.isArray(periods) || periods.length === 0) {
    throw new Error(`Experience ${number} must define at least one period in "periods".`);
  }

  periods.forEach((period, index) => {
    const start = parseExperiencePeriodPoint(period.start);

    if (period.current && period.end) {
      throw new Error(`Experience ${number} period ${index + 1} cannot use both "end" and "current".`);
    }

    if (period.end) {
      const end = parseExperiencePeriodPoint(period.end);

      if (periodPointSortValue(end) < periodPointSortValue(start)) {
        throw new Error(`Experience ${number} period ${index + 1} has an end date before its start date.`);
      }
    }
  });
};

const validateRepresentativeImage = (number: string, image?: ExperienceRepresentativeImage | null) => {
  if (!image) return;

  if (typeof image.src !== 'string' || image.src.trim().length === 0) {
    throw new Error(`Experience ${number} representativeImage must include a non-empty "src".`);
  }

};

const formatExperiencePeriodPoint = (point: ParsedExperiencePeriodPoint) => {
  const year = String(point.year);
  const month = point.month ? String(point.month).padStart(2, '0') : '';
  const day = point.day ? String(point.day).padStart(2, '0') : '';
  const time = point.hour && point.minute ? `${point.hour}:${point.minute}` : '';

  if (point.precision === 'year') return year;
  if (point.precision === 'month') return `${year}.${month}`;
  if (point.precision === 'day') return `${year}.${month}.${day}`;

  return `${year}.${month}.${day} ${time}`;
};

const padDatePart = (value: number) => String(value).padStart(2, '0');
const getMonthLastDay = (year: number, month: number) => new Date(year, month, 0).getDate();

const getPeriodPointStartDate = (point: ParsedExperiencePeriodPoint) =>
  `${point.year}-${padDatePart(point.month ?? 1)}-${padDatePart(point.day ?? 1)}`;

const getPeriodPointEndDate = (point: ParsedExperiencePeriodPoint) => {
  const month = point.month ?? 12;
  const day =
    point.precision === 'year'
      ? 31
      : point.precision === 'month'
        ? getMonthLastDay(point.year, month)
        : point.day ?? 1;

  return `${point.year}-${padDatePart(month)}-${padDatePart(day)}`;
};

const isSameDate = (start: ParsedExperiencePeriodPoint, end: ParsedExperiencePeriodPoint) =>
  start.year === end.year && start.month === end.month && start.day === end.day;

export const formatExperiencePeriod = (period: ExperiencePeriod, language: ExperienceLanguage = 'ko') => {
  const start = parseExperiencePeriodPoint(period.start);
  const startText = formatExperiencePeriodPoint(start);

  if (period.current) {
    return `${startText} - ${language === 'ko' ? '현재' : 'Present'}`;
  }

  if (!period.end) return startText;

  const end = parseExperiencePeriodPoint(period.end);

  if (start.precision === 'minute' && end.precision === 'minute' && isSameDate(start, end)) {
    return `${startText} - ${end.hour}:${end.minute}`;
  }

  return `${startText} - ${formatExperiencePeriodPoint(end)}`;
};

export const formatExperiencePeriods = (meta: ExperienceMeta, language: ExperienceLanguage = 'ko') =>
  meta.periods.map((period) => formatExperiencePeriod(period, language)).join(' / ');

export const getExperiencePeriodDateRanges = (meta: ExperienceMeta) =>
  meta.periods.map((period) => {
    const start = parseExperiencePeriodPoint(period.start);
    const end = period.current
      ? '9999-12-31'
      : period.end
        ? getPeriodPointEndDate(parseExperiencePeriodPoint(period.end))
        : getPeriodPointEndDate(start);

    return {
      start: getPeriodPointStartDate(start),
      end
    };
  });

export const getExperiencePeriodYears = (meta: ExperienceMeta) => {
  const currentYear = new Date().getFullYear();
  const years = new Set<string>();

  meta.periods.forEach((period) => {
    const start = parseExperiencePeriodPoint(period.start);
    const endYear = period.current
      ? currentYear
      : period.end
        ? parseExperiencePeriodPoint(period.end).year
        : start.year;

    for (let year = start.year; year <= endYear; year += 1) {
      years.add(String(year));
    }
  });

  return [...years];
};

const metaByNumber = new Map(
  Object.entries(metaModules).filter(([path]) => /\/\d{3}\/meta\.json$/.test(path)).map(([path, meta]) => {
    const number = path.match(/\/(\d{3})\/meta\.json$/)?.[1] ?? meta.number;

    validateExperiencePeriods(number, meta.periods);
    validateRepresentativeImage(number, meta.representativeImage);

    if (!isExperienceCategoryKey(meta.category)) {
      throw new Error(
        `Invalid category "${meta.category}" in experience ${number}. Use one of: ${Object.keys(
          experienceCategoryConfig
        ).join(', ')}`
      );
    }

    const invalidTags = (meta.experienceTags ?? []).filter((tag) => !isExperienceTagKey(tag));

    if (invalidTags.length > 0) {
      throw new Error(`Invalid experienceTags "${invalidTags.join(', ')}" in experience ${number}.`);
    }

    const invalidProjectDomains = (meta.projectDomains ?? []).filter((domain) => !isProjectDomainKey(domain));

    if (invalidProjectDomains.length > 0) {
      throw new Error(`Invalid projectDomains "${invalidProjectDomains.join(', ')}" in experience ${number}.`);
    }

    const invalidTechTags = (meta.techTags ?? []).filter((tag) => !isTechTagKey(tag));

    if (invalidTechTags.length > 0) {
      throw new Error(`Invalid techTags "${invalidTechTags.join(', ')}" in experience ${number}.`);
    }

    const invalidRelations = (meta.related ?? []).flatMap((item) => {
      const relation = item.relation as string | undefined;

      return relation && !isExperienceRelation(relation) ? [relation] : [];
    });

    if (invalidRelations.length > 0) {
      throw new Error(`Invalid related relation "${invalidRelations.join(', ')}" in experience ${number}.`);
    }

    return [number, meta] as const;
  })
);

export const parseExperienceEntryId = (id: string) => {
  const [number, language] = id.split('/');

  if (!number || !experienceLanguages.includes(language as ExperienceLanguage)) {
    throw new Error(`Invalid experience entry id: ${id}`);
  }

  return {
    number,
    language: language as ExperienceLanguage
  };
};

export const getExperienceMeta = (number: string) => {
  const meta = metaByNumber.get(number);

  if (!meta) {
    throw new Error(`Missing meta.json for experience ${number}`);
  }

  return meta;
};

type ExperienceTemplateField =
  | 'affiliation'
  | 'project'
  | 'community'
  | 'workExperience'
  | 'learningGrowth'
  | 'teachingMentoring'
  | 'awardScholarship'
  | 'mediaInterview';

const experienceTemplateFieldByCategory = {
  affiliation: 'affiliation',
  project: 'project',
  community: 'community',
  'work-experience': 'workExperience',
  'learning-growth': 'learningGrowth',
  'teaching-mentoring': 'teachingMentoring',
  'award-scholarship': 'awardScholarship',
  'media-interview': 'mediaInterview'
} as const satisfies Record<ExperienceCategoryKey, ExperienceTemplateField>;

const validateExperienceCategoryTemplate = (
  number: string,
  language: ExperienceLanguage,
  category: ExperienceCategoryKey,
  entry: ExperienceEntry
) => {
  const templateField = experienceTemplateFieldByCategory[category];
  const templateValue = entry.data[templateField];

  if (!templateValue) {
    throw new Error(
      `Experience ${number}/${language}.mdx must use "${templateField}" because its category is "${category}".`
    );
  }

  if (entry.data.sections.length > 0) {
    throw new Error(
      `Experience ${number}/${language}.mdx uses category "${category}", so "sections" must stay empty. Use "${templateField}" instead.`
    );
  }
};

export const getExperiencePairs = (entries: ExperienceEntry[]) => {
  const grouped = new Map<string, Partial<Record<ExperienceLanguage, ExperienceEntry>>>();

  entries.forEach((entry) => {
    const { number, language } = parseExperienceEntryId(entry.id);
    const current = grouped.get(number) ?? {};
    current[language] = entry;
    grouped.set(number, current);
  });

  return [...grouped.entries()].map(([number, localizedEntries]) => {
    if (!localizedEntries.ko) {
      throw new Error(`Missing ko.mdx for experience ${number}`);
    }

    const pair = {
      number,
      meta: getExperienceMeta(number),
      ko: localizedEntries.ko,
      en: localizedEntries.en
    };

    validateExperienceCategoryTemplate(number, 'ko', pair.meta.category, pair.ko);

    if (pair.en) {
      validateExperienceCategoryTemplate(number, 'en', pair.meta.category, pair.en);
    }

    return pair;
  });
};

export const readExperienceOrder = (pair: ExperiencePair) => Number(pair.meta.number ?? pair.number);

export const resolveExperienceStatus = (status: ExperienceStatus): keyof typeof statusLabels =>
  status === 'in-progress' ? 'now' : 'done';

export const getLocalizedEntry = (pair: ExperiencePair, language: ExperienceLanguage) =>
  language === 'en' ? pair.en ?? pair.ko : pair.ko;

export const getLocalizedText = (
  pair: ExperiencePair,
  field: 'title' | 'organization' | 'summary' | 'oneLine'
) => ({
  ko: pair.ko.data[field],
  en: (pair.en ?? pair.ko).data[field] || pair.ko.data[field]
});

export const getLocalizedListItem = (
  pair: ExperiencePair,
  field: 'highlights',
  index: number
) => ({
  ko: pair.ko.data[field][index] ?? '',
  en: (pair.en ?? pair.ko).data[field][index] ?? pair.ko.data[field][index] ?? ''
});

export const getLocalizedSection = (pair: ExperiencePair, index: number) => {
  const ko = pair.ko.data.sections[index];
  const en = (pair.en ?? pair.ko).data.sections[index] ?? ko;

  return { ko, en };
};

const affiliationSectionLabels = {
  overview: {
    ko: '소속/기관 소개',
    en: 'Affiliation Overview'
  },
  reason: {
    ko: '속하게 된 이유',
    en: 'Why I Joined'
  },
  startingContext: {
    ko: '합류 당시',
    en: 'When I Joined'
  },
  challenges: {
    ko: '어려웠던 점',
    en: 'Challenges'
  },
  gains: {
    ko: '얻은 것',
    en: 'What I Gained'
  }
} as const;

type AffiliationSectionKey = keyof typeof affiliationSectionLabels;

const affiliationSectionKeys = Object.keys(affiliationSectionLabels) as AffiliationSectionKey[];

const projectSectionLabels = {
  overview: {
    ko: '프로젝트 개요',
    en: 'Project Overview'
  },
  teamComposition: {
    ko: '팀 구성',
    en: 'Team Composition'
  },
  background: {
    ko: '기획 배경',
    en: 'Planning Background'
  },
  scope: {
    ko: '목표와 구현 범위',
    en: 'Goal and Scope'
  },
  contribution: {
    ko: '내 역할과 기여',
    en: 'My Role and Contribution'
  },
  roleDetails: {
    ko: '실제 구현/기여 상세',
    en: 'Implementation / Contribution Details'
  },
  implementation: {
    ko: '설계와 구현',
    en: 'Design and Implementation'
  },
  challenges: {
    ko: '어려웠던 점과 해결',
    en: 'Challenges and Solutions'
  },
  outcome: {
    ko: '결과와 배운 점',
    en: 'Outcome and Learning'
  }
} as const;

type ProjectSectionKey = keyof typeof projectSectionLabels;

const projectSectionKeys = Object.keys(projectSectionLabels) as ProjectSectionKey[];

interface ProjectTeamCompositionItem {
  role: string;
  count: number;
  note?: string;
}

const formatProjectResponsibilities = (items: string[]) => items.map((item) => `• ${item}`).join('\n');

const isProjectTeamComposition = (value: unknown[]): value is ProjectTeamCompositionItem[] =>
  value.every((item) => typeof item === 'object' && item !== null && 'role' in item && 'count' in item);

const formatProjectTeamComposition = (
  items: ProjectTeamCompositionItem[],
  language: ExperienceLanguage
) =>
  items
    .map((item) => {
      const count = language === 'ko' ? `${item.count}명` : item.count === 1 ? '1 person' : `${item.count} people`;
      const note = item.note ? ` - ${item.note}` : '';

      return `• ${item.role} ${count}${note}`;
    })
    .join('\n');

const communitySectionLabels = {
  overview: {
    ko: '활동/커뮤니티 소개',
    en: 'Activity / Community Overview'
  },
  motivation: {
    ko: '참여한 이유',
    en: 'Why I Joined'
  },
  role: {
    ko: '맡은 역할',
    en: 'My Role'
  },
  contribution: {
    ko: '기여한 방식',
    en: 'How I Contributed'
  },
  challenges: {
    ko: '어려웠던 점',
    en: 'Challenges'
  },
  impact: {
    ko: '남은 영향',
    en: 'Impact'
  }
} as const;

type CommunitySectionKey = keyof typeof communitySectionLabels;

const communitySectionKeys = Object.keys(communitySectionLabels) as CommunitySectionKey[];

const workExperienceSectionLabels = {
  context: {
    ko: '조직과 책임',
    en: 'Organization and Responsibility'
  },
  responsibilities: {
    ko: '맡은 일',
    en: 'Responsibilities'
  },
  collaboration: {
    ko: '협업 방식',
    en: 'Collaboration'
  },
  outcome: {
    ko: '결과와 변화',
    en: 'Outcome and Change'
  }
} as const;

type WorkExperienceSectionKey = keyof typeof workExperienceSectionLabels;

const workExperienceSectionKeys = Object.keys(workExperienceSectionLabels) as WorkExperienceSectionKey[];

const learningGrowthSectionLabels = {
  background: {
    ko: '시작 배경',
    en: 'Starting Point'
  },
  learning: {
    ko: '배운 내용',
    en: 'What I Learned'
  },
  change: {
    ko: '이후 변화',
    en: 'What Changed'
  }
} as const;

type LearningGrowthSectionKey = keyof typeof learningGrowthSectionLabels;

const learningGrowthSectionKeys = Object.keys(learningGrowthSectionLabels) as LearningGrowthSectionKey[];

const teachingMentoringSectionLabels = {
  audience: {
    ko: '대상',
    en: 'Audience'
  },
  reason: {
    ko: '참여하게 된 이유',
    en: 'Reason for Participating'
  },
  content: {
    ko: '전달한 내용',
    en: 'Content Delivered'
  },
  approach: {
    ko: '준비와 진행 방식',
    en: 'Preparation and Approach'
  },
  response: {
    ko: '반응과 결과',
    en: 'Response and Outcome'
  },
  learning: {
    ko: '남은 배움',
    en: 'Learning'
  }
} as const;

type TeachingMentoringSectionKey = keyof typeof teachingMentoringSectionLabels;

const teachingMentoringSectionKeys = Object.keys(teachingMentoringSectionLabels) as TeachingMentoringSectionKey[];

const awardScholarshipSectionLabels = {
  criteria: {
    ko: '인정받은 기준',
    en: 'Recognition Criteria'
  },
  relatedActivity: {
    ko: '연결된 활동',
    en: 'Related Activity'
  },
  meaning: {
    ko: '나에게 남은 의미',
    en: 'Meaning'
  }
} as const;

type AwardScholarshipSectionKey = keyof typeof awardScholarshipSectionLabels;

const awardScholarshipSectionKeys = Object.keys(awardScholarshipSectionLabels) as AwardScholarshipSectionKey[];

const mediaInterviewSectionLabels = {
  background: {
    ko: '소개된 배경',
    en: 'Background'
  },
  topics: {
    ko: '다룬 주제',
    en: 'Topics'
  },
  message: {
    ko: '전달하고 싶었던 메시지',
    en: 'Message'
  }
} as const;

type MediaInterviewSectionKey = keyof typeof mediaInterviewSectionLabels;

const mediaInterviewSectionKeys = Object.keys(mediaInterviewSectionLabels) as MediaInterviewSectionKey[];

type StructuredBodyValue = string | string[] | ProjectTeamCompositionItem[] | undefined;

const normalizeStructuredBody = (value: StructuredBodyValue, language: ExperienceLanguage) => {
  if (!Array.isArray(value)) {
    return value ?? '';
  }

  if (isProjectTeamComposition(value)) {
    return formatProjectTeamComposition(value, language);
  }

  return formatProjectResponsibilities(value);
};

const buildStructuredSections = <Key extends string>(
  labels: Record<Key, { ko: string; en: string }>,
  keys: readonly Key[],
  koData: Record<Key, StructuredBodyValue>,
  enData: Record<Key, StructuredBodyValue>
): ExperienceLocalizedSection[] =>
  keys
    .map((key) => {
      const koBody = normalizeStructuredBody(koData[key], 'ko');
      const enBody = normalizeStructuredBody(enData[key], 'en') || koBody;

      return {
        ko: {
          label: labels[key].ko,
          body: koBody
        },
        en: {
          label: labels[key].en,
          body: enBody
        }
      };
    })
    .filter((section) => section.ko.body.trim().length > 0 || section.en.body.trim().length > 0);

export const getExperienceDetailSections = (pair: ExperiencePair): ExperienceLocalizedSection[] => {
  if (pair.meta.category === 'affiliation' && pair.ko.data.affiliation) {
    const koAffiliation = pair.ko.data.affiliation;
    const enAffiliation = (pair.en ?? pair.ko).data.affiliation ?? koAffiliation;

    return affiliationSectionKeys
      .map((key) => ({
        ko: {
          label: affiliationSectionLabels[key].ko,
          body: koAffiliation[key] ?? ''
        },
        en: {
          label: affiliationSectionLabels[key].en,
          body: enAffiliation[key] ?? koAffiliation[key] ?? ''
        }
      }))
      .filter((section) => section.ko.body.trim().length > 0 || section.en.body.trim().length > 0);
  }

  if (pair.meta.category === 'project' && pair.ko.data.project) {
    const koProject = pair.ko.data.project;
    const enProject = (pair.en ?? pair.ko).data.project ?? koProject;

    return buildStructuredSections(
      projectSectionLabels,
      projectSectionKeys,
      koProject,
      enProject
    );
  }

  if (pair.meta.category === 'community' && pair.ko.data.community) {
    const koCommunity = pair.ko.data.community;
    const enCommunity = (pair.en ?? pair.ko).data.community ?? koCommunity;

    return buildStructuredSections(
      communitySectionLabels,
      communitySectionKeys,
      koCommunity,
      enCommunity
    );
  }

  if (pair.meta.category === 'work-experience' && pair.ko.data.workExperience) {
    const koWorkExperience = pair.ko.data.workExperience;
    const enWorkExperience = (pair.en ?? pair.ko).data.workExperience ?? koWorkExperience;

    return buildStructuredSections(
      workExperienceSectionLabels,
      workExperienceSectionKeys,
      koWorkExperience,
      enWorkExperience
    );
  }

  if (pair.meta.category === 'learning-growth' && pair.ko.data.learningGrowth) {
    const koLearningGrowth = pair.ko.data.learningGrowth;
    const enLearningGrowth = (pair.en ?? pair.ko).data.learningGrowth ?? koLearningGrowth;

    return buildStructuredSections(
      learningGrowthSectionLabels,
      learningGrowthSectionKeys,
      koLearningGrowth,
      enLearningGrowth
    );
  }

  if (pair.meta.category === 'teaching-mentoring' && pair.ko.data.teachingMentoring) {
    const koTeachingMentoring = pair.ko.data.teachingMentoring;
    const enTeachingMentoring = (pair.en ?? pair.ko).data.teachingMentoring ?? koTeachingMentoring;

    return buildStructuredSections(
      teachingMentoringSectionLabels,
      teachingMentoringSectionKeys,
      koTeachingMentoring,
      enTeachingMentoring
    );
  }

  if (pair.meta.category === 'award-scholarship' && pair.ko.data.awardScholarship) {
    const koAwardScholarship = pair.ko.data.awardScholarship;
    const enAwardScholarship = (pair.en ?? pair.ko).data.awardScholarship ?? koAwardScholarship;

    return buildStructuredSections(
      awardScholarshipSectionLabels,
      awardScholarshipSectionKeys,
      koAwardScholarship,
      enAwardScholarship
    );
  }

  if (pair.meta.category === 'media-interview' && pair.ko.data.mediaInterview) {
    const koMediaInterview = pair.ko.data.mediaInterview;
    const enMediaInterview = (pair.en ?? pair.ko).data.mediaInterview ?? koMediaInterview;

    return buildStructuredSections(
      mediaInterviewSectionLabels,
      mediaInterviewSectionKeys,
      koMediaInterview,
      enMediaInterview
    );
  }

  return pair.ko.data.sections
    .map((_, index) => getLocalizedSection(pair, index))
    .filter((section) => section.ko.body.trim().length > 0 || section.en.body.trim().length > 0);
};

export const getLocalizedLink = (pair: ExperiencePair, index: number) => {
  const ko = pair.ko.data.links[index];
  const en = (pair.en ?? pair.ko).data.links[index] ?? ko;

  return { ko, en };
};
