import { randomUinqueIntegers, getGraphemeLength } from "src/components/utils"

export const TXT_WIDTH = 85

const PUNCTUATION = [".", ",", ":", ";", "?", "!", "‽", "<", ">", "-", "¡", "¿"]
const SPLITER = /\s+/

export function h1(text: string): string {
    let result = "═".repeat(TXT_WIDTH) + "\n"
    result += center(text)
    result += "═".repeat(TXT_WIDTH) + "\n\n"
    return result
}

export function h2(text: string): string {
    let result = "─".repeat(text.length + 2) + "\n"
    result += " " + text + " \n"
    result += "─".repeat(text.length + 2) + "\n\n"
    return result
}

export function h3(text: string): string {
    let result = "-".repeat(text.length + 2) + "\n"
    result += " " + text + " \n"
    result += "-".repeat(text.length + 2) + "\n\n"
    return result
}

export function bold(text: string): string {
    return text.replace(/[A-Za-z]/g, boldChar);
}

function boldChar(char: string) {
    let diff;
    if (/[A-Z]/.test(char)) { // @ts-ignore
        diff = "𝗔".codePointAt(0) - "A".codePointAt(0);
    }
    else { // @ts-ignore

        diff = "𝗮".codePointAt(0) - "a".codePointAt(0);
    } // @ts-ignore
    return String.fromCodePoint(char.codePointAt(0) + diff);
}

export function italic(text: string): string {
    return text.replace(/[A-Za-z]/g, italicChar);
}

function italicChar(char: string) {
    let diff
    if (/[A-Z]/.test(char)) { // @ts-ignore
        diff = "𝘈".codePointAt(0) - "A".codePointAt(0);
    }
    else { // @ts-ignore

        diff = "𝘢".codePointAt(0) - "a".codePointAt(0);
    } // @ts-ignore
    return String.fromCodePoint(char.codePointAt(0) + diff);
}


export function paragraph(text: string, width: number = TXT_WIDTH) {
    return justifify(text, width) + "\n"
}

export function listItem(prefix: string, content: string, width: number = TXT_WIDTH): string {
    const padding = " ".repeat(prefix.length)
    const contentWidth = width - prefix.length
    const text = justifify(content, contentWidth)

    const lines = text.split("\n")
    let result = prefix + lines[0] + "\n"
    for (let i = 1; i < lines.length; i++) {
        result += padding + lines[i] + "\n"
    }
    return result
}

export function link(text: string, url: string): string {
    return `[${text}]\u200B<${url}>`
}

export function image(img: string, alt: string, width: number = TXT_WIDTH) {
    // We assume the image is a rectangular maxtrice of char delimited with \n 

    // Sometime I forget \n at the end of file
    if (!img.endsWith("\n")) {
        img += "\n"
    }

    let result = ""
    const lines = img.split("\n")
    const imgWidth = lines[0].length
    const paddingLeft = Math.floor((width - imgWidth) / 2)
    for (let i = 0; i < lines.length; i++) {
        result += " ".repeat(paddingLeft) + lines[i] + "\n"
    }
    result += center(`"${alt}"`, width) + "\n"
    return result
}


export function center(text: string, width: number = TXT_WIDTH) {
    let result = ""
    // Split by whitespaces
    const words = text.split(SPLITER);

    let counter = 0
    let line: string[] = []

    for (let i = 0; i < words.length; i++) {
        let word = words[i]
        let wordlength = getGraphemeLength(word)

        // End of line not reached
        if (counter + wordlength <= width) {
            line.push(word + " ",)
            counter += wordlength + 1
            continue
        }

        // End of line overflow

        // 0. Check if word contain a zero width space.
        //    If so, we can try to split it and try insert the first word
        const splitedWord = word.split("\u200B")
        if (splitedWord.length > 1) {
            const firstWordLenght = getGraphemeLength(splitedWord[0])
            if (counter + firstWordLenght <= width) {
                // If it fit, insert it
                line.push(splitedWord[0] + " ")
                counter += firstWordLenght + 1

                // Then start a new line with the second word
                word = splitedWord[1]
                wordlength = getGraphemeLength(splitedWord[1])
            }
        }

        // 1. First remove the unwanted space at the end
        line[line.length - 1] = line[line.length - 1].slice(0, -1)
        counter--

        // 2. calculate and add padding (padding smaller on the left if odd )
        const paddingLeft = Math.floor((width - counter) / 2)
        result += " ".repeat(paddingLeft) + line.join("") + "\n"

        // 3. start next line
        line = [word + " "]
        counter = wordlength + 1
    }

    // Format the last line
    line[line.length - 1] = line[line.length - 1].slice(0, -1)
    counter--
    const paddingLeft = Math.floor((width - counter) / 2)
    result += " ".repeat(paddingLeft) + line.join("") + "\n"
    return result
}

/**
  * Justification algorithm adapted from:
  * https://www.rose-hulman.edu/class/csse/csse221/200910/Projects/Markov/justification.html
  */
function justifify(text: string, width: number = TXT_WIDTH): string {
    let result = ""

    // Split by whitespaces
    const words = text.split(SPLITER);

    let counter = 0
    let line: string[] = []

    // We accumulate the words and spaces until we have enough for a line
    // Then we justify, add to the result, reset the vars and start a new line
    for (let i = 0; i < words.length; i++) {
        let word = words[i]
        let wordlength = getGraphemeLength(word)

        // End of line not reached
        if (counter + wordlength <= width) {
            line.push(word + " ",)
            counter += wordlength + 1
            continue
        }

        // End of line overflow

        // 0. Check if word contain a zero width space.
        //    If so, we can try to split it and try insert the first word
        const splitedWord = word.split("\u200B")
        if (splitedWord.length > 1) {
            const firstWordLenght = getGraphemeLength(splitedWord[0])
            if (counter + firstWordLenght <= width) {
                // If it fit, insert it
                line.push(splitedWord[0] + " ")
                counter += firstWordLenght + 1

                // Then start a new line with the second word
                word = splitedWord[1]
                wordlength = getGraphemeLength(splitedWord[1])
            }
        }

        // 1. First remove the unwanted space at the end
        line[line.length - 1] = line[line.length - 1].slice(0, -1)
        counter--

        // 2. Calculate the needed padding
        let m = width - counter // how many we need

        // 3. Add double space after punctuation (except if it's end of line) 
        for (let j = 0; j < line.length - 1; j++) {
            // Don't do it too much
            if (m == 0) {
                break
            }

            if (PUNCTUATION.includes(line[j].slice(-1))) {
                line[j] += " "
                m--
            }
        }

        // 4. Add random spaces.
        const n = line.length - 1 //how many place available for spaces
        while (m > 0) {
            const indexs = randomUinqueIntegers(Math.min(n, m), 0, n - 1)
            indexs.forEach(i => {
                line[i] += " "
            });

            m -= Math.min(n, m)
        }

        // 5. start a new line
        result += line.join("") + "\n"
        line = [word + " "]
        counter = wordlength + 1
    }

    // Add the last line
    result += line.join("") + "\n"

    return result
}


export function fieldset(title: string, content: string, width: number = TXT_WIDTH): string {
    const titleWidth = Math.min(width - 7, getGraphemeLength(title))
    let result = `  ┌${"─".repeat(titleWidth + 2)}┐\n`

    if (titleWidth != getGraphemeLength(title)) {
        throw new Error("Not implemented fucker");
    }

    result += `┌─┤ ${title} ├${"─".repeat(width - titleWidth - 7)}┐\n`
    result += `│ └${"─".repeat(titleWidth + 2)}┘${" ".repeat(width - 7 - titleWidth)}│\n`

    const lines = content.split("\n")
    for (let i = 0; i < lines.length; i++) {
        const paddingRight = Math.max(0, width - 3 - getGraphemeLength(lines[i]))
        result += `│ ${lines[i]}${" ".repeat(paddingRight)}│\n`
    }

    result += `└${"─".repeat(width - 2)}┘\n\n`

    return result
}
