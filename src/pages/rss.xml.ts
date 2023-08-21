import rss from '@astrojs/rss';
import { siteConfig } from '@site-config';
import type { APIContext } from 'astro';
import { CollectionEntry, getCollection } from 'astro:content';

const awesome = await getCollection('awesome');

function getContent(entry: CollectionEntry<'awesome'>): string {
  return `${entry.data.description} 
    <br><a href="${entry.data.link}">${entry.data.link}</a>`
}


export function get(context: APIContext) {
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site!,
    items: awesome.map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.added_date,
      content: getContent(entry),
      link: `${context.site}awesome#${entry.data.title}`,
    })),
    customData: `<language>${siteConfig.lang}</language>`,
  });
}
