---
link: https://github.com/bderenzo/tinystatus/
title: "Tinystatus: a lovingly simple monitoring tool."
added_date: 2023-09-08
tags: ["tool"]
---
Sometimes, you have a basic website or a small application, and all you need is a way to receive alerts if it goes down. In such cases, you probably don't want to deploy the entire OpenTelemetry stack with all the required infrastructure and integration. **Sometimes, all you want is something simple.** This is where "tinystatus" comes into play; it couldn't be simpler.

Tinystatus is a compact 130-line Bash script that queries a list of URLs and generates an HTML report. You can effortlessly set it up in cron or systemd and direct your HTTP server to the generated `index.html`. Voilà, you've got yourself a status service. Moreover, by redirecting its `stderr` output to a mail service, you can receive real-time alerts if your website or app experiences any downtime.

Because it's so concise, you can easily customize it to your preferences by adding extra checks or tweaking the styling. And if you don't want to deal with setting up cron, systemd or the web server, it's also available as a Docker container or as a Go implementation, aptly named "go-tinystatus", which embeds the HTTP server for your convenience.
