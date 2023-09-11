import rss from '@astrojs/rss';
import { siteConfig } from '@site-config';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

const awesome = await getCollection('awesome');



export function GET(context: APIContext) {
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site!,
    items: awesome.map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.added_date,
      content: entry.body + `<br><a href="${entry.data.link}">${entry.data.link}</a>`,
      link: `${context.site}awesome#${entry.slug}`,
    })),
    customData: `<language>${siteConfig.lang}</language>`,
  });
}
