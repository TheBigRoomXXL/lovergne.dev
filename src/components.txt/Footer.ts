import { center, TXT_WIDTH } from "./formatter"

export function Footer(before: string = ""): string {
    let result = "\n".repeat(20)

    result += before

    result += "─".repeat(TXT_WIDTH) + "\n"
    result += center(
        "The bottom of every page is padded so readers can maintain a consistent eyeline\n"
    )
    result += center(
        `You can navigate to /awesome.txt, /blogroll.txt and /rss.xml`
    )

    return result + "\n"
}




