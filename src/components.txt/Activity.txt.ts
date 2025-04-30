import { getCollection } from "astro:content";
import { h2, TXT_WIDTH } from "./formatter"
import { formatDate } from "src/components/utils";


let notes = await getCollection("zettelkasten");

const postAndProject = notes
    .filter(
        (n) => n.data.tags.includes("blog-post") || n.data.tags.includes("project"),
    )
    .sort((n1, n2) => {
        if (n2.data.pin) return 1;
        if (n1.data.pin) return -1;
        else if (n1.data.added_date > n2.data.added_date) return -1;
        else if (n1.data.added_date < n2.data.added_date) return 1;
        else return 0;
    });

const others = notes
    .filter(
        (n) =>
            !n.data.tags.includes("blog-post") && !n.data.tags.includes("project"),
    )
    .sort((n1, n2) => {
        if (n2.data.pin) return 1;
        if (n1.data.pin) return -1;
        else if (n1.data.added_date > n2.data.added_date) return -1;
        else if (n1.data.added_date < n2.data.added_date) return 1;
        else return 0;
    });


export function Activity(): string {
    let result = h2("Blog posts and projects")

    const titleSize = TXT_WIDTH - 13

    postAndProject.forEach((note) => {
        let title = note.data.title
        if (title.length > titleSize) {
            title = title.slice(0, titleSize - 1) + "…"
        }
        result += title + "\n"

        result += ` ↳ https://lovergne.dev/archive/${note.slug}\n\n`
    })

    result += h2('Awesome collection and blogroll')
    others.forEach((note) => {
        let title = note.data.title
        if (title.length > titleSize) {
            title = title.slice(0, titleSize - 1) + "…"
        }
        result += title + "\n"

        result += ` ↳ https://lovergne.dev/archive/${note.slug}\n\n`
    })

    return result
}
