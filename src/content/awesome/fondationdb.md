---
link: https://www.foundationdb.org/files/fdb-paper.pdf
title: "FoundationDB: A Distributed Unbundled Transactional Key Value Store"
added_date: 2023-08-29
published_date: 2021-06-18
tags: ["scientific-paper"]
---
FoundationDB is a distributed transactional key value store created in 2009 wich 
guarantee ACID transactions at scale.

This is paper published by the FoundationDB team summarising there
approach to building a distributed database 10 years after building it.
There is a lot of interesting things inside it but here are my main takeaway:

- They built the simulation and testing framework **before** starting to build
the actual database. This really highlights the importance of extensive testing
capabilities if you want to achieve consistency and robustness in complex
systems.
-  FoundationDB offers a minimal and carefully chosen feature set and instead
really on a layered architecture to enable other developer to implement there
own feature and data-model. This approch has seen a lot of success as
FoundationDB has been used as a literal foundation for other paradigm of
distributed databases: semi-relational databases, document and object stores,
graph databases and more.
- I am way over my head with the internals of the transaction system.
