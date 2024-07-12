import { randomUinqueIntegers } from "src/components/utils"

const TXT_WIDTH = 80
const PUNCTUATION = [".", ",", ":", ";", "?", "!", "‽", "<", ">", "-", "¡", "¿"]

const header = String.raw`  _____ _ 
 / ____| |           Sebastien LOVERGNE
| (___ | |
 \___ \| |           /awesome.txt
 ____) | |____       /blogroll.txt
|_____/|______|      /rss.xml


`

function h1(text: string): string {
    let result = "═".repeat(TXT_WIDTH) + "\n"

    const paddingLeft = Math.floor((TXT_WIDTH - text.length) / 2)
    result += " ".repeat(paddingLeft) + text + "\n"
    result += "═".repeat(TXT_WIDTH) + "\n\n"
    return result
}

/**
  * Justification algorithm adapted from:
  * https://www.rose-hulman.edu/class/csse/csse221/200910/Projects/Markov/justification.html
  */
function justifify(text: string, width: number = TXT_WIDTH): string {
    let result = ""
    const words = text.split(/\s+/);
    let counter = 0
    let line: string[] = []

    // We accumulate the words and spaces until we have enough for a line
    // Then we justify, add to the result, reset the vars and start a new line
    for (let i = 0; i < words.length; i++) {
        const word = words[i]

        // End of line not reached
        if (counter + word.length <= width) {
            line.push(word + " ",)
            counter += word.length + 1
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

        result += line.join("") + "\n"
        line = [word + " "]
        counter = word.length + 1
    }

    // Add the last line
    result += line.join("") + "\n"

    return result
}
export { header, h1, justifify }
