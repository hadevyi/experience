import type { CollectionEntry } from 'astro:content';
import {
  experienceCategoryConfig,
  isExperienceCategoryKey,
  isExperienceTagKey,
  type ExperienceCategoryKey,
  type ExperienceTagKey
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

export const devKeywords = ['개발', '프로젝트', '사이트', '정적', '구조', '기술', '콘텐츠'];

export type ExperienceStatus = 'draft' | 'in-progress' | 'done';
export type ExperienceVisibility = 'public' | 'private';
export type ExperiencePeriodPointPrecision = 'year' | 'month' | 'day' | 'minute';
export type ExperienceRelation =
  | 'previous'
  | 'next'
  | 'source'
  | 'result'
  | 'reference'
  | 'same-context';

export interface ExperienceRelated {
  number: string;
  relation?: ExperienceRelation;
  note?: {
    ko?: string;
    en?: string;
  };
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
  experienceTags?: ExperienceTagKey[];
  projectDomains?: string[];
  techTags?: string[];
  related?: ExperienceRelated[];
  featured?: boolean;
}

export interface ExperiencePair {
  number: string;
  meta: ExperienceMeta;
  ko: ExperienceEntry;
  en?: ExperienceEntry;
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

    return {
      number,
      meta: getExperienceMeta(number),
      ko: localizedEntries.ko,
      en: localizedEntries.en
    };
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
  field: 'focus' | 'highlights',
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

export const getLocalizedLink = (pair: ExperiencePair, index: number) => {
  const ko = pair.ko.data.links[index];
  const en = (pair.en ?? pair.ko).data.links[index] ?? ko;

  return { ko, en };
};
