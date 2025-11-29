import { h1, paragraph, bold } from "src/components.txt/formatter"
import { Header } from "src/components.txt/Header.txt"
import { Footer } from "src/components.txt/Footer";
import { Card } from "src/components.txt/Card.txt";
import { getCollection } from "astro:content";

let blogroll = await getCollection("zettelkasten");
blogroll = blogroll
    .filter((n) => n.data.tags.includes("blogroll"))
    .sort((b1, b2) => {
        if (b2.data.pin) return 1;
        if (b1.data.pin) return -1;
        else return Math.random() >= 0.5 ? -1 : 1;
    });

const cards = blogroll.reduce((acc, blog) => {
    return acc + Card(blog)
}, "")

export async function GET() {
    return new Response(
        Header() +
        h1("Blogroll") +
        paragraph(`A (partial) list of blogs I like and consistently read. You can follow all
    of them through the magic of RSS.`) +
        paragraph(`The list is sorted randomly, expect for my favorites which are pinned.`) +
        cards +
        Footer()
    )
}

