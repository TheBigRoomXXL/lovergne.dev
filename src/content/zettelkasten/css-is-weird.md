---
link: https://www.youtube.com/watch?v=aHUtMbJw8iA&t=906s
title: Why is CSS so Weird?
added_date: 2023-08-23
tags: ["css"]
---
Because the web has been build with a set of value at it's core
: **the web is open, it's for everyone and everything**. By
accepting those value we must, at the same time, accept that we loose some 
degree of control, we don't choose who will look at our website and on what
devices. That lake of control means we must build websites for an infinite
canvas with unknown constraints and capabilities. But designing for the
unknown is hard, for that, we need flexibility, and this is where CSS come in.

The **Cascade** in Cascading Style Sheets is the process of assembling
styles from different inputs. You gain from that process the capability
to merge **intent** from different sources: the Author, the Browser and
remarkably, the User.

<img
alt="Author Browser and User consolidate into one style throught cascade"
src=/cascade.svg
style="max-width:80%; max-height:200px;"
/>

It also allows us to fail gracefully by cascading upward wich is good for
resilence and backward compatibility.
But the tradeoff is that your instructions can be overridden, they became
suggestions. This is one of the pitfalls of CCS and why we sometime have to use
the infamous `!important`. The other consequence is that
everything is hierarchically linked. This is great, as one style can be reused
in many similar places to achieve consistency, but this is also another big
pitfall of CSS as a style might impact elements it was never meant to.

Overall some might think that we made a bad tradeoff with CSS by loosing too
much control, but I don't think so. As John Allsopp said, <cite>"Control[...]
is a limitation of the printed page"</cite>,  when a book is produce and sold
only the editor can make it accessible, and he fails to do it most of the time
whether it's diagrams with bad contrast or the absence of braille editions
or other things. But with the browser and CSS  the user has the last word,
he can make it feet it's need, whatever it is.'
