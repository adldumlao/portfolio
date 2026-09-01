import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['active', 'wip', 'archived']).default('active'),
    stack: z.array(z.string()).default([]),
    repoUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    date: z.coerce.date(),
    order: z.number().default(99),
  }),
});

const homelab = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/homelab' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(['complete', 'in-progress', 'planned']).default('planned'),
    order: z.number().default(99),
  }),
});

export const collections = { projects, homelab };
