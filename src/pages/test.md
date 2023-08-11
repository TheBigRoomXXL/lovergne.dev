---
layout: ../layouts/Base.astro
---

# Short h1 Heading 
## Little Longer h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


___


## Lores Ipsum

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested by using additional greater-than signs right next to each other...



## Lists

Unordered

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar


## Code

Inline `code`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

```
Sample text here...
```

Syntax highlighting

``` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

## Tables

### Simple 

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

### Fancier Table

from [w3schools.com](https://www.w3schools.com/css/tryit.asp?filename=trycss_table_fancy)
<table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Berglunds snabbköp</td>
    <td>Christina Berglund</td>
    <td>Sweden</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>Helen Bennett</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>Königlich Essen</td>
    <td>Philip Cramer</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Laughing Bacchus Winecellars</td>
    <td>Yoshi Tannamuri</td>
    <td>Canada</td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td>
  </tr>
  <tr>
    <td>North/South</td>
    <td>Simon Crowther</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>Paris spécialités</td>
    <td>Marie Bertrand</td>
    <td>France</td>
  </tr>
</table>

### Data table

<table>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
    </tr>
    <tr>
      <td>Jill</td>
      <td>Smith</td>
      <td>50</td>
      <td>50</td>
      <td>50</td>
      <td>50</td>
      <td>50</td>
      <td>50</td>
      <td>50</td>
      <td>50</td>
      <td>50</td>
      <td>50</td>
    </tr>
    <tr>
      <td>Eve</td>
      <td>Jackson</td>
      <td>94</td>
      <td>94</td>
      <td>94</td>
      <td>94</td>
      <td>94</td>
      <td>94</td>
      <td>94</td>
      <td>94</td>
      <td>94</td>
      <td>94</td>
    </tr>
    <tr>
      <td>Adam</td>
      <td>Johnson</td>
      <td>67</td>
      <td>67</td>
      <td>67</td>
      <td>67</td>
      <td>67</td>
      <td>67</td>
      <td>67</td>
      <td>67</td>
      <td>67</td>
      <td>67</td>
    </tr>
</table>


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Pillas of creation: Hubble vs James Webb](https://www.nasa.gov/sites/default/files/thumbnails/image/stsci-01gfnr1kzzp67ffgv8y26kr0vw.png)
![Profile pick](https://avatars.githubusercontent.com/u/80152117?v=4)

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: icon.svg  "The Dojocat"


<section aria-label="Blog post list" class="mt-16">
   <h2>Posts</h2>
   <ul>
      <li>
         <time datetime="2023-07-04T00:00:00.000Z">04 Jul 2023</time>
         <a href="/posts/cover-image/">Example Cover Image</a>
      </li>
      <li>
         <time datetime="2023-02-22T00:00:00.000Z">22 Feb 2023</time>
         <a href="/posts/markdown-elements/">A post of Markdown elements</a>
      </li>
      <li>
         <time datetime="2023-02-22T00:00:00.000Z">22 Feb 2023</time>
         <a href="/posts/missing-content/">This post doesn't have any content</a>
      </li>
      <li>
         <time datetime="2023-02-01T00:00:00.000Z">01 Feb 2023</time>
         <a href="/posts/long-title/">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id</a>
      </li>
      <li>
         <time datetime="2023-01-30T00:00:00.000Z">30 Jan 2023</time>
         <a href="/posts/unique-tags/">Unique tags validation</a>
      </li>
      <li>
         <time datetime="2023-01-27T00:00:00.000Z">27 Jan 2023</time>
         <a href="/posts/social-image/">Example Social Image</a>
      </li>
      <li>
         <time datetime="2022-06-12T00:00:00.000Z">12 Jun 2022</time>
         <a href="/posts/second-post/">My Second Post</a>
      </li>
      <li>
         <time datetime="2022-05-13T00:00:00.000Z">13 May 2022</time>
         <a href="/posts/hello-world/">Testing testing 123!</a>
      </li>
   </ul>
</section>
