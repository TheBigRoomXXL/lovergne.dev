---
link: https://lovergne.dev/index.txt
title: Rendering my website to ASCII
added_date: 2024-07-13
tags: ["ascii", "fun"]
---

Last wednesday an idea crossed my mind: 

> What if I rendered my mardown files to plain text?

Well that's obviously a stupid idea as markdown is already plain text and who actually use plain text for reading ? That was such a stupid idea that I concidered it might be origininal, in oder to not be disilusioned from that notion i have not checked.

I might have stoped there fter realizing it was stupid but it just happend that I had a free weekend so I got to work and now you can view any page on my website as lain text just by adding the `.txt` extention at the end of the url.

While that was already stupid I decide that was not enought so I also realized and rich-text to ascii text editor. You can check it out (here)[INSERT LINK]. 

## But how did I get there? 

A few mouth ago I stanble accros [falken.directory](http://len.falken.directory/feed.xml), a full blog made out of `.txt` files. Since then i toyed with the
idea of doing something similar.

Then few weeks ago, while working my [(buggy) 8086 virtual machine](git@github.com:TheBigRoomXXL/8086.git) i had to print the state of my registers and i knew i would have to look a it at lot so i decided to make it nice with a beautiful table, that's when I rediscovered ascii diagrams with the box drawings characters. Unlike the traditional `-` and `|` those characters don't leave any gap wich I find very satisfiying. 

What my register table looked like:

```ascii
     ┌─────────────────────┐  
     │       STORAGE       │  
┌────┼──────────┬──────────┤  
│ ax │ 00000000 │ 00000000 │  
│ bx │ 00000010 │ 11100001 │  
│ cx │ 00000001 │ 00001111 │  
│ dx │ 00000000 │ 00000000 │  
├────┼──────────┴──────────┤  
│ sp │ 11100110   00000011 │  
│ bp │ 00000000   00000000 │  
│ si │ 00000000   00000000 │  
│ di │ 00000000   00000000 │  
├────┼─────────────────────┤  
│ ip │ 00011000   00000000 │  
├────┼─────────────────────┤  
│ fl │ 00000000   10000000 │  
└────┴─────────────────────┘  
```


Finnaly just a few days ago I read the about the OpenSSH regreSSHion [CVE-2024-6387](https://www.qualys.com/2024/07/01/cve-2024-6387/regresshion.txt?ref=upstract.com) and I thought to myself "There plain tet formating look so good, I shoud write my notes likethat". 

> Insert a paragraph abbout how painfull it is to edit plaintext instead of markdown


After that it was only a matter of time before I though of hacking my astro repos to add a new rendering format for each page.
