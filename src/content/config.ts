import { z, defineCollection } from 'astro:content';

const Tag = z.enum([
  "blog",
  "article",
  "paper",
  "tool",
  "paper",
  "cybersecurity",
  "ops",
  "test",
  "css",
  "philosophy",
  "database",
  "learning-ressource"
])
// 

// published_date is used to publish the original publishing date of the awesome
// thing, not the date on my site. 
const zettelkastenCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    link: z.string(),
    added_date: z.date(),
    published_date: z.date().optional(),
    author: z.string().optional(),
    tags: z.array(Tag).default([]),
    pin: z.boolean().optional(),
  }),
});




export const collections = {
  'zettelkasten': zettelkastenCollection,
};
