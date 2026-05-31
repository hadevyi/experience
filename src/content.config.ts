import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const structuredTextSchema = z.union([z.string(), z.array(z.string())]).default('');

const affiliationSchema = z
  .object({
    overview: z.string().default(''),
    reason: z.string().default(''),
    startingContext: z.string().default(''),
    challenges: z.string().default(''),
    gains: z.string().default('')
  })
  .optional();

const projectSchema = z
  .object({
    host: z.string().default(''),
    position: z.string().default(''),
    teamComposition: z
      .array(
        z.object({
          role: z.string(),
          count: z.number().int().positive(),
          note: z.string().default('')
        })
      )
      .default([]),
    techStack: z
      .array(
        z.object({
          category: z
            .enum([
              'frontend',
              'backend',
              'infra',
              'design',
              'language',
              'framework',
              'database',
              'tool',
              'environment',
              'platform',
              'other'
            ])
            .default('other'),
          name: z.string(),
          version: z.string().default(''),
          note: z.string().default('')
        })
      )
      .default([]),
    deployment: z.string().default(''),
    overview: z.string().default(''),
    background: z.string().default(''),
    scope: z.string().default(''),
    contribution: structuredTextSchema,
    roleDetails: z.array(z.string()).default([]),
    implementation: structuredTextSchema,
    challenges: structuredTextSchema,
    outcome: structuredTextSchema
  })
  .optional();

const communitySchema = z
  .object({
    overview: z.string().default(''),
    motivation: z.string().default(''),
    role: z.string().default(''),
    contribution: z.string().default(''),
    challenges: z.string().default(''),
    impact: z.string().default('')
  })
  .optional();

const workExperienceSchema = z
  .object({
    context: structuredTextSchema,
    responsibilities: structuredTextSchema,
    collaboration: structuredTextSchema,
    outcome: structuredTextSchema
  })
  .optional();

const eventOperationSchema = z
  .object({
    overview: structuredTextSchema,
    background: structuredTextSchema,
    role: structuredTextSchema,
    operation: structuredTextSchema,
    collaboration: structuredTextSchema,
    challenge: structuredTextSchema,
    result: structuredTextSchema,
    learning: structuredTextSchema
  })
  .optional();

const learningGrowthSchema = z
  .object({
    reason: z.string().default(''),
    startingPoint: z.string().default(''),
    learning: z.string().default(''),
    challenge: z.string().default(''),
    connection: z.string().default('')
  })
  .optional();

const certificationSchema = z
  .object({
    overview: z.string().default(''),
    responsibleAgency: z.string().default(''),
    administeringOrganization: z.string().default(''),
    issuer: z.string().default(''),
    acquisition: z.string().default(''),
    scope: z.string().default(''),
    preparation: z.string().default(''),
    meaning: z.string().default('')
  })
  .optional();

const teachingMentoringSchema = z
  .object({
    audience: z.string().default(''),
    reason: z.string().default(''),
    content: z.string().default(''),
    approach: z.string().default(''),
    response: z.string().default(''),
    learning: z.string().default('')
  })
  .optional();

const awardScholarshipSchema = z
  .object({
    overview: z.string().default(''),
    criteria: z
      .array(
        z.object({
          label: z.string(),
          detail: z.string().default('')
        })
      )
      .default([]),
    application: z.string().default(''),
    resultBenefit: z.string().default('')
  })
  .optional();

const mediaInterviewSchema = z
  .object({
    background: structuredTextSchema,
    context: structuredTextSchema,
    topics: structuredTextSchema,
    perspective: structuredTextSchema,
    impact: structuredTextSchema
  })
  .optional();

const experiences = defineCollection({
  loader: glob({
    pattern: ['*/ko.mdx', '*/en.mdx', '!__*/**', '!**/__*/**'],
    base: './src/content/experiences'
  }),
  schema: z.object({
    title: z.string(),
    organization: z.string(),
    summary: z.string(),
    oneLine: z.string().default(''),
    highlights: z.array(z.string()).default([]),
    affiliation: affiliationSchema,
    project: projectSchema,
    community: communitySchema,
    workExperience: workExperienceSchema,
    eventOperation: eventOperationSchema,
    learningGrowth: learningGrowthSchema,
    certification: certificationSchema,
    teachingMentoring: teachingMentoringSchema,
    awardScholarship: awardScholarshipSchema,
    mediaInterview: mediaInterviewSchema,
    sections: z
      .array(
        z.object({
          label: z.string(),
          body: z.string()
        })
      )
      .default([]),
    links: z
      .array(
        z.object({
          type: z
            .enum(['official', 'repository', 'demo', 'article', 'social', 'reference'])
            .default('reference'),
          label: z.string(),
          url: z.url()
        })
      )
      .default([])
  })
});

export const collections = { experiences };
