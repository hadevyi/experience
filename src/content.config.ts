import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const experiences = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/experiences' }),
  schema: z.object({
    title: z.string(),
    organization: z.string(),
    period: z.string(),
    summary: z.string(),
    focus: z.array(z.string()),
    order: z.number(),
    featured: z.boolean().default(false)
  })
});

export const collections = { experiences };
