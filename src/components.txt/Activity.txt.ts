import { getCollection } from "astro:content";
import { h2, TXT_WIDTH } from "./formatter"
import { formatDate } from "src/components/utils";


let notes = await getCollection("zettelkasten");
let longestSlug = 0

notes.sort((n1, n2) => {
    if (n1.data.added_date > n2.data.added_date) return -1;
    else if (n1.data.added_date < n2.data.added_date) return 1;
    else return 0;
});



export function Activity(): string {
    let result = h2("Recent Activities")
    const titleSize = TXT_WIDTH - 13

    notes.forEach((note) => {
        // result += formatDate(note.data.added_date) + ": "
        let title = note.data.title
        if (title.length > titleSize) {
            title = title.slice(0, titleSize - 1) + "…"
        }
        result += title + "\n"

        result += ` ↳ https://lovergne.dev/archive/${note.slug}\n\n`
    })


    return result
}
