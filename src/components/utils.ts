

function shortenLink(link: string): string {
    const url = new URL(link)
    let result = url.hostname.replace("www.", "").toLowerCase()
    if (result === "github.com") {
        result += "/" + url.pathname.split("/")[1].toLowerCase()

    }
    return result
}

function randomUinqueIntegers(n: number, min: number, max: number): number[] {
    const uniques = new Set<number>()
    while (uniques.size != n) {
        uniques.add(Math.floor(Math.random() * (max - min + 1) + min))
    }
    return Array.from(uniques)
}



export { shortenLink, randomUinqueIntegers }
