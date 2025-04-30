import { TXT_WIDTH, h1, paragraph } from "./formatter"
import { renderMarkdownToPlainTxt } from "./tree-renderer";
import type { CollectionEntry } from "astro:content";


export function Post(note: CollectionEntry<"zettelkasten">): string {

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

    let subtitle = "Published " + note.data.added_date.toLocaleDateString("en-EN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
    if (note.data.link != null) {
        subtitle += " about " + note.data.link
    }

    const content = renderMarkdownToPlainTxt(note.body, { width: TXT_WIDTH - 6 })

    return h1(title) + paragraph(subtitle) + content
}
