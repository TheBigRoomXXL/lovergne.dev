import { h1, paragraph } from "src/components.txt/renderer"
import { Header } from "src/components.txt/Header.txt"
import { Footer } from "src/components.txt/Footer";
import { Activity } from "src/components.txt/Activity.txt";
import { getCollection } from "astro:content";

let notes = await getCollection("zettelkasten");

notes.sort((n1, n2) => {
    if (n1.data.added_date > n2.data.added_date) return -1;
    else if (n1.data.added_date < n2.data.added_date) return 1;
    else return 0;
});

export async function GET() {
    return new Response(
        Header() +
        h1("Hello World!") +
        paragraph(`Welcome! My name is Sebastien Lovergne. I'm an inveterate 
        tinkerer and I work as a software engineer.`) +
        paragraph(`This website is a place where I can experiment and be 
        creative. I mostly publish links to external resources that I have found
        interesting or thought-provoking (and some fun stuff think of it as my
        personal web archive. I might also write about some of my personal 
        projects in the future.`) +
        paragraph(`You can find me as @TheBigRoomXXL on github and itch.io
        or contacts me by mail at seb.lovergne@gmail.com`) +
        Activity() +
        Footer()
    )
}

