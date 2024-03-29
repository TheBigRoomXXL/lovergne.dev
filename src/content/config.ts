import { z, defineCollection } from 'astro:content';


// published_date is used to publish the original publishing date of the awesome
// thing, not the date on my site. 
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


const blogrollCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    link: z.string(),
    added_date: z.date(),
    tags: z.array(z.string()).optional(),
    pin: z.boolean().optional(),
  }),
});

export const collections = {
  'awesome': awesomeCollection,
  'blogroll': blogrollCollection,
};
