import { TXT_WIDTH } from "./formatter"


export function Fieldset(title: string, content: string, width: number = TXT_WIDTH): string {
    const titleWidth = Math.min(width - 7, title.length)
    let result = `  ┌${"─".repeat(titleWidth + 2)}┐\n`

    if (titleWidth != title.length) {
        throw new Error("Not implemented fucker");
    }

    result += `┌─┤ ${title} ├${"─".repeat(width - titleWidth - 7)}┐\n`
    result += `│ └${"─".repeat(titleWidth + 2)}┘${" ".repeat(width - 7 - titleWidth)}│\n`

    const lines = content.split("\n")
    for (let i = 0; i < lines.length - 1; i++) {
        const paddingRight = Math.max(2, width - 4 - lines[i].length)
        result += `│  ${lines[i]}${" ".repeat(paddingRight)}│\n`
    }

    result += `└${"─".repeat(width - 2)}┘\n\n`

    return result
}
