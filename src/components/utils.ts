

export function shortenLink(link: string): string {
    const url = new URL(link)
    let result = url.hostname.replace("www.", "").toLowerCase()
    if (result === "github.com") {
        result += "/" + url.pathname.split("/")[1].toLowerCase()

    }
    return result
}

export function randomUinqueIntegers(n: number, min: number, max: number): number[] {
    const uniques = new Set<number>()
    while (uniques.size != n) {
        uniques.add(Math.floor(Math.random() * (max - min + 1) + min))
    }
    return Array.from(uniques)
}

export function formatDate(date: Date) {
    return date.toLocaleDateString("default", {
        day: "2-digit",
    }) + " " + date.toLocaleDateString("default", {
        month: "short",
    }) + " " + date.getFullYear()
}

/** The supidest amd least optimized function  I have ever written */
export function getGraphemeLength(text: string) {
    // Despite it's name this function does not count grapheme
    // Inded mathematical characters are not monospace so we are fuck 

    // We need to normalized the weird character we use for formating
    // Regular expression to the Unicode mathematical characters
    const regex = /[\u{1D400}-\u{1D7FF}]/gu;

    text = text.replace(regex, "a")
    text = text.replace("\u200B", " ")

    return text.length
}
