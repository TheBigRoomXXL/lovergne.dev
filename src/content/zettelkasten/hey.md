---
link: https://github.com/rakyll/hey
title: "Hey: tiny program that sends some load to a web application"
added_date: 2023-12-13
tags: ["tool", "ops", "test"]
---
When I deploy a new app in production, I like to do a quick load test to have
an idea of how much traffic I can support while staying under my latency target. 

Hey is an excellent CLI tool for that. You give it the URL of the page you want
to test and it will generate some load for it. You can easily configure the load
(number of requests, headers, rate limit...) with flags. Once the loading is
finished, you received a very readable report with the latency distribution and
other key indicators.

Another practical tool to have in the toolbox!
