---
link: https://buttondown.com/hillelwayne/archive/what-makes-concurrency-so-hard/
title: "What makes concurrency so hard?"
added_date: 2025-03-09
tags: ["article", "distributed"]
---

The short version: Concurrency is difficult due to the **state space explosion** that occurs
very quickly when you distribute a system, which exceeds our ability to model. 

The author provides a neat demonstration of this hypothesis, and it really resonates with
my own experience. 

Recently, I’ve been thinking about this idea a lot since I discovered 
[Residual Theory](https://youtu.be/_MPUoiG6w_U?si=-G54W3aPhlvWTiQd). In
this theory, we begin with too many possible states to create an accurate model, but
progressively reduce the complexity by focusing on [attractors](https://en.m.wikipedia.org/wiki/Attractor),
solutions that cover large areas of the state space, so that unforeseen states already
have a solution.
