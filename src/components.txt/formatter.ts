import { randomUinqueIntegers, getGraphemeLength } from "src/components/utils"

export const TXT_WIDTH = 90
export const PUNCTUATION = [".", ",", ":", ";", "?", "!", "‽", "<", ">", "-", "¡", "¿"]



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



export function paragraph(text: string, width: number = TXT_WIDTH) {
    return justifify(text, width) + "\n"
}


export function center(text: string, width: number = TXT_WIDTH) {
    let result = ""
    // Split by whitespaces except for non-breaking space
    const words = text.split(/\s(?!\u00A0)+/);

    let counter = 0
    let line: string[] = []

    for (let i = 0; i < words.length; i++) {
        const word = words[i]
        const wordlength = getGraphemeLength(word)

        // End of line not reached
        if (counter + wordlength <= width) {
            line.push(word + " ",)
            counter += wordlength + 1
            continue
        }

        // End of line overflow

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

    // Split by whitespaces except for non-breaking space
    const words = text.split(/\s+(?!\u00A0)/);

    let counter = 0
    let line: string[] = []

    // We accumulate the words and spaces until we have enough for a line
    // Then we justify, add to the result, reset the vars and start a new line
    for (let i = 0; i < words.length; i++) {
        const word = words[i]
        const wordlength = getGraphemeLength(word)

        // End of line not reached
        if (counter + wordlength <= width) {
            line.push(word + " ",)
            counter += wordlength + 1
            continue
        }

        // End of line overflow

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
