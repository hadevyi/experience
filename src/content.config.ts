import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

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
    focus: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
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
