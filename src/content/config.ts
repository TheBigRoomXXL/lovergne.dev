import { z, defineCollection } from 'astro:content';

const awesomeCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    link: z.string(),
    added_date: z.date(),
    published_date: z.date().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    pin: z.boolean().optional(),
  }),
});

export const collections = {
  'awesome': awesomeCollection,
};
