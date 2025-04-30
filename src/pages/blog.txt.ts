import { h1, paragraph, bold } from "src/components.txt/formatter"
import { Header } from "src/components.txt/Header.txt"
import { Footer } from "src/components.txt/Footer";
import { Card } from "src/components.txt/Card.txt";
import { Post } from 'src/components.txt/Post.txt';
import { getCollection } from "astro:content";

let notes = await getCollection("zettelkasten");

notes = notes
    .filter((n) => n.data.tags.includes("blog-post"))
    .sort((n1, n2) => {
        if (n2.data.pin) return 1;
        if (n1.data.pin) return -1;
        else if (n1.data.added_date > n2.data.added_date) return -1;
        else if (n1.data.added_date < n2.data.added_date) return 1;
        else return 0;
    });


const cards = notes.reduce((acc, note) => {
    return acc + Post(note) + "\n\n"
}, "")

export async function GET() {
    return new Response(
        Header() +
        cards +
        Footer()
    )
}

