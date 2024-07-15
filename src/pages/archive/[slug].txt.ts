import type { APIRoute } from 'astro';
import { TXT_WIDTH, h1, paragraph } from "src/components.txt/formatter"
import { Header } from "src/components.txt/Header.txt"
import { Footer } from "src/components.txt/Footer";
import { getCollection } from "astro:content";

import { renderMarkdownToPlainTxt } from 'src/components.txt/tree-renderer';

let notes = await getCollection("zettelkasten");

export async function getStaticPaths() {
    const note = await getCollection("zettelkasten");
    return note.map((note) => ({
        params: { slug: note.slug },
        props: note,
    }));
}

notes.sort((n1, n2) => {
    if (n1.data.added_date > n2.data.added_date) return -1;
    else if (n1.data.added_date < n2.data.added_date) return 1;
    else return 0;
});


export const GET: APIRoute = ({ props }) => {
    let result = Header()

    let title = props.data.title
    if (props.data.author) {
        title += ` by ${props.data.author}`
    }
    if (props.data.published_date) {
        title += ` (${props.data.published_date.getFullYear()})`
    }
    result += h1(title)
    result += paragraph("This page is about : " + props.data.link)

    result += renderMarkdownToPlainTxt(props.body, TXT_WIDTH)

    result += Footer()

    return new Response(result)
}


