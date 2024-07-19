import { center } from "./formatter"

export function Footer(): string {
    let result = "\n".repeat(20)

    result += center(
        "The bottom of every page is padded so readers can maintain a consistent eyeline\n"
    )
    result += center(
        `You can navigate to /awesome.txt, /blogroll.txt and /rss.xml`
    )

    return result + "\n"
}




