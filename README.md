# My Personal website

Check it out at [lovergne.dev](lovergne.dev)

This website is a place where I can experiment and be creative. I mostly publish links to
external resources that I have found interesting or thought-provoking (and some fun stuff), think
of it as my personal web library. I also write about some of my personal projects, but this is rarer.

The source code is mainly HTML and CSS with just a little bit of javascript sprikle in. 
Then I use Astro for static site generation and there is no other dependency ( well technically there
is [normalize.css](https://csstools.github.io/normalize.css/11.0.0/normalize.css) but it's so small
it doesn't count!).


## Features: 

- **It's simple** and has only one dependency.
- **Fully accessible:** built with semantic HTML and score 100% on lighthouse accessibility
- **Light and Fast:** 27.7 kB landing page and score 100% on lighthouse performance.
- **It's beautiful**, well at least for me and I really my little isometric logo. 
- **Dark / Light** theme based on `prefers-color-scheme`
- **Sufficient SEO support**: see [Meta.astro](https://github.com/TheBigRoomXXL/my-site/blob/main/src/components/Meta.astro), score 95% on lighthouse (some links are too small).
- **Print support** with a minimal secondary stylesheet (see [print.css](https://github.com/TheBigRoomXXL/my-site/blob/main/public/print.css))
- **Awesome list** page generated from data files.

## TODO

- Awesome list
  - filtering and sorting
  - pin
  - tags
  - content type
  - author
- Projects page
- RSS Feed
- Adding some bloody content!
