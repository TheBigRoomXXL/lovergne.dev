import { type APIRoute } from 'astro';
import type { CollectionEntry } from "astro:content";
import { TXT_WIDTH } from "src/components.txt/formatter"
import { Header } from "src/components.txt/Header.txt"
import { Footer } from "src/components.txt/Footer";
import { getCollection } from "astro:content";
import { Post } from 'src/components.txt/Post.txt';


export async function getStaticPaths() {
    const notes = await getCollection("zettelkasten");
    notes.sort((n1, n2) => {
        if (n1.data.added_date > n2.data.added_date) return -1;
        else if (n1.data.added_date < n2.data.added_date) return 1;
        else return 0;
    });

    return notes.map((note, i) => ({
        params: { slug: note.slug },
        props: {
            note: note,
            next: notes[i - 1],
            previous: notes[i + 1],
        },
    }));
}

type Props = {
    note: CollectionEntry<"zettelkasten">;
    next?: CollectionEntry<"zettelkasten">;
    previous?: CollectionEntry<"zettelkasten">;
};


export const GET: APIRoute<Props> = ({ props }) => {
    let result = Header()
    result += Post(props.note)

    const left = props.previous ? `<< ${props.previous.slug}` : ""
    const right = props.next ? `${props.next.slug} >>` : ""

    if (left.length + right.length + 4 > TXT_WIDTH) {
        throw new Error("Not implemented pignouf");
    }

    const paddingSize = TXT_WIDTH - left.length - right.length
    const before = left + " ".repeat(paddingSize) + right + "\n\n"

    result += Footer(before)

    return new Response(result)
}


