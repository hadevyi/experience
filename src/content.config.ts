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
