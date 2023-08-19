import { z, defineCollection } from 'astro:content';

const awesomeCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    link: z.string(),
    added_date: z.date(),
    published_date: z.date().optional(),
    tags: z.array(z.string()).optional(),
    pin: z.boolean().optional(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  'awesome': awesomeCollection,
};