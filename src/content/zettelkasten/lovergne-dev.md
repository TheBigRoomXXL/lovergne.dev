---
link: https://lovergne.dev/
title: My Personal Site
tags: ["project", "test"]
added_date: 2023-07-08
published_date: 2023-07-08
---

*Repository: [github.com/theBigRoomXXL/lovergne.dev](https://github.com/theBigRoomXXL/lovergne.dev)*

I started this project in the summer of 2023 as a way to experiment with a more minimalistic stack and design for the web. This site is organized like a [zettelkasten](https://en.wikipedia.org/wiki/Zettelkasten): everything that I write is a self-contained note that links to other resources. A tag system is used to categorize the notes into different pages of the site (awesome, blogroll, projects), and each note has its own page with a unique URL.

I use Astro for static site generation, and there are no other dependencies (well, technically, there is [normalize.css](https://csstools.github.io/normalize.css/11.0.0/normalize.css) for CSS reset, but it's so small it doesn't really count!). The site was originally hosted on my homelab, but I moved it to GitHub Pages so that I could close all public-facing services on my homelab.

There are a lot of little things I like about this site:

- **Light and Fast:** The landing page is currently only 32KB (fonts and logo included!), which means it's *blazingly fast™*.
- **Fully Accessible:** Built with semantic HTML and accessibility in mind.
- **It's Beautiful:** Well, at least I think so. And I really love my little isometric logo.
- **Dark/Light Theme:** Based on `prefers-color-scheme`.
- **Print Support:** With a minimal secondary stylesheet (see [print.css](https://github.com/TheBigRoomXXL/lovergne.dev/blob/main/public/print.css)). I don't think anyone else cares about that, but I like it.
- **RSS Feed Support.**

And finally, the thing I like the most is that **every page is also rendered as a plain text file!** Just click on the little [Want Some ASCII?](/archive/lovergne-dev.txt) button at the bottom of the page, and you'll get the plain text version. This is a useless but lovely feature. It started when I was playing with [ASCII diagram characters](https://gist.github.com/dsample/79a97f38bf956f37a0f99ace9df367b9) to render tables and then read the [OpenSSH regreSSHion report](https://www.qualys.com/2024/07/01/cve-2024-6387/regresshion.txt) and though " what if I used the same plain text formatting but using more advanced unicode characters?". After that it turned into a deep-dive into Unicode and hacks like [bold and italic formatting using mathematical characters](https://en.wikipedia.org/wiki/Mathematical_Alphanumeric_Symbols). This was also an opportunity to work with [Abstract Syntax Trees](https://en.wikipedia.org/wiki/Abstract_syntax_tree) to parse the markdow, which was something that piqued my curiosity for a long time.
