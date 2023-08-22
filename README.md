# My Personal website

Check it out at [lovergne.dev](lovergne.dev)

This website is a place where I can experiment and be creative. I mostly publish links to
external resources that I have found interesting or thought-provoking (and some fun stuff), think
of it as my personal web library. I also write about some of my personal projects, but this is rarer.

The source code is mainly HTML and CSS with just a little bit of javascript sprikle in. 
Then I use Astro for static site generation and there is no other dependency ( well technically there
is [normalize.css](https://csstools.github.io/normalize.css/11.0.0/normalize.css) but it's so small
it doesn't count!).

## Acknoledgement

This site was originally inspired by the [cactus theme](https://astro-theme-cactus.netlify.app/) for astro but I decided do my own thing as I wanted less dependencies and tooling. The [Meta](/src/components/Meta.astro) component originaly come from there and you can clearly see some similarity in the visual design.

## Features: 

- **It's simple** and has only one dependency.
- **Fully accessible:** built with semantic HTML and score 100% on lighthouse accessibility
- **Light and Fast:** 27.7 kB landing page and score 100% on lighthouse performance.
- **It's beautiful**, well for me at least. And I really my little isometric logo. 
- **Dark / Light** theme based on `prefers-color-scheme`
- **Sufficient SEO support**: see [Meta.astro](https://github.com/TheBigRoomXXL/my-site/blob/main/src/components/Meta.astro), score 95% on lighthouse (some links are too small).
- **Print support** with a minimal secondary stylesheet (see [print.css](https://github.com/TheBigRoomXXL/my-site/blob/main/public/print.css))
- **Awesome list** page generated from data files.

## TODO

- Awesome list
  - filtering
  - tags
  - content type
- Projects page
- RSS Feed
- Site map for SEO
- Adding some bloody content!
