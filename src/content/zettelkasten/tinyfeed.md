---
link: https://feed.lovergne.dev/
title: TinyFeed
tags: ["project"]
added_date: 2025-01-01
---

*Repository: [github.com/TheBigRoomXXL/tinyfeed](https://github.com/TheBigRoomXXL/tinyfeed)*

This project began out of my frustration with the current options for feed readers. I often visit message boards like [Lobsters](https://lobste.rs/) and [Hacker News](https://news.ycombinator.com/) to find good technical blogs. Over time, I accumulated a list of RSS feeds that I follow regularly and wanted to consume them in a way similar to message boards: a simple, time-ordered list of links. 

However, most feed readers are full-fledged applications that require logins, track your reading, and have a lot of features I don’t want, such as reading inside the application instead of on the feed's website.

I also wanted something lightweight and easy to self-host. I found myself particularly frustrated with many so-called "minimalist" feed readers that don’t even support SQLite as a database option (looking at you, [Miniflux](https://miniflux.app/docs/database.html#configuration) with your need for `SUPERUSER` privileges on PostgreSQL).

My solution is TinyFeed: a CLI tool that generates a static HTML page from a collection of feeds. It's incredibly simple: no database, no configuration files, just a CLI and some HTML. Provide it with a list of RSS, Atom, or JSON feed URLs, and it will generate a single HTML page for them. Then, you can effortlessly set it up with `cron`, `systemd`, or even GitHub Pages, and voilà, you’ve got yourself an webpage that aggregate your favorite feeds.

I’ve been using it since August 2023, and I’m very pleased with it. Due to its simplicity, it integrates easily into various workflows. For example, it started as a cron job on my server, then moved to OpenRC, then I dockerized it and added it to my docker-compose based homelab. Finally, as I removed all public-facing services from my homelab, I moved it to GitHub Pages. It’s a versatile tool that can be used in many different ways. The project has now been stable for some time and I have released the offical 1.0.0 version.

The project has also gained some traction in the self-hosted community, with just over 200 stars on GitHub and a few mentions in articles and podcasts.
