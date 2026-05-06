import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const affiliationSchema = z
  .object({
    reason: z.string().default(''),
    startingContext: z.string().default(''),
    connectedExperiences: z.string().default(''),
    meaning: z.string().default('')
  })
  .optional();

const projectSchema = z
  .object({
    host: z.string().default(''),
    position: z.string().default(''),
    participationReason: z.string().default(''),
    description: z.string().default(''),
    responsibilities: z.array(z.string()).default([]),
    techStack: z
      .array(
        z.object({
          name: z.string(),
          version: z.string().default(''),
          note: z.string().default('')
        })
      )
      .default([]),
    deployment: z.string().default(''),
    technicalDetails: z.string().default(''),
    result: z.string().default('')
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
          label: z.string(),
          url: z.url()
        })
      )
      .default([])
  })
});

export const collections = { experiences };
