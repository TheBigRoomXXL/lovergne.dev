import { TXT_WIDTH } from "./formatter"
import { Fieldset } from "./Fieldset.txt";
import { renderMarkdownToPlainTxt } from "./tree-renderer";
import type { CollectionEntry } from "astro:content";



export function Card(note: CollectionEntry<"zettelkasten">): string {

    let title = note.data.title

    if (note.data.pin) {
        title = "♥ " + title
    }
    if (note.data.author) {
        title += ` by ${note.data.author}`
    }
    if (note.data.published_date) {
        title += ` (${note.data.published_date.getFullYear()})`
    }

    const content = renderMarkdownToPlainTxt(note.body, TXT_WIDTH - 6)

    return Fieldset(title, content)
}
