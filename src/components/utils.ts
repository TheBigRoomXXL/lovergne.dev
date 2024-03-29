

function shortenLink(link: string): string {
    const url = new URL(link)
    let result = url.hostname.replace("www.", "").toLowerCase()
    if (result === "github.com") {
        result += "/" + url.pathname.split("/")[1].toLowerCase()

    }
    return result
}


export { shortenLink }
