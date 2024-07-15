import { h1, paragraph, bold } from "src/components.txt/formatter"
import { Header } from "src/components.txt/Header.txt"
import { Footer } from "src/components.txt/Footer";
import { Card } from "src/components.txt/Card.txt";
import { getCollection } from "astro:content";

let notes = await getCollection("zettelkasten");

notes = notes
    .filter((n) => !n.data.tags.includes("blog"))
    .sort((n1, n2) => {
        if (n2.data.pin) return 1;
        if (n1.data.pin) return -1;
        else if (n1.data.added_date > n2.data.added_date) return -1;
        else if (n1.data.added_date < n2.data.added_date) return 1;
        else return 0;
    });


const cards = notes.reduce((acc, note) => {
    return acc + Card(note)
}, "")

export async function GET() {
    return new Response(
        Header() +
        h1("My list of " + bold("Awesome") + " things") +
        paragraph(`This is a curated list of things I have discovered on the web and found
        useful or thought-provoking, there is also some fun stuff.`) +
        paragraph(`Potential subjects include, but are not limited to, programming,
        engineering, technology, and woodworking.`) +
        paragraph(`The list is sorted by date of addition (latest first), expect for my
        favorites wich are pinned.`) +
        cards +
        Footer()
    )
}

