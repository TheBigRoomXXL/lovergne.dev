import { center } from "./renderer"

export function Footer(): string {
    let result = "\n".repeat(13)

    result += center(
        "The bottom of every page is padded so readers can maintain a consistent eyeline\n"
    )
    result += center(
        `You can navigate to /awesome.txt, /blogroll.txt and /rss.xml`
    )

    return result + "\n"
}




