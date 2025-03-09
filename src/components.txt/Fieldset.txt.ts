import { TXT_WIDTH, justifify } from "./formatter"

export function Fieldset(title: string, content: string, width: number = TXT_WIDTH): string {
    const titleWidth = Math.min(width - 8, title.length)
    let result = `  ┌${"─".repeat(titleWidth + 2)}┐\n`

    if (title.length <= titleWidth) {
        result += `┌─┤ ${title} ├${"─".repeat(width - titleWidth - 7)}┐\n`
    } else {
        const lines = justifify(title, titleWidth).trim().split("\n")
        for (let i = 0; i < lines.length - 1; i++) {
            const l = lines[i]
            console.log(l)
            result += `  │ ${l}${" ".repeat(titleWidth - l.length)} │\n`
        }
        const l = lines[lines.length - 1]
        console.log(l)
        result += `┌─┤ ${l}${" ".repeat(titleWidth - l.length)} ├─┐\n`
    }

    result += `│ └${"─".repeat(titleWidth + 2)}┘${" ".repeat(width - 7 - titleWidth)}│\n`

    const lines = content.split("\n")
    for (let i = 0; i < lines.length - 1; i++) {
        const paddingRight = Math.max(2, width - 4 - lines[i].length)
        result += `│  ${lines[i]}${" ".repeat(paddingRight)}│\n`

        if (i == lines.length - 2 && lines[i] != "") {
            result += `│${" ".repeat(width - 2)}│\n`
        }
    }


    result += `└${"─".repeat(width - 2)}┘\n\n`

    return result
}
