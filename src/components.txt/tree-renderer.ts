import { paragraph, bold, italic, center, image, TXT_WIDTH } from "./formatter"
import { fromMarkdown } from 'mdast-util-from-markdown'

// Fuck you typescript
// I couldn't get mdast type definition to work properly so I roll my own
// It's not 100% correct, Some exeption exist like image. In that case I
// just override the type with the `as` in a safe context.

type Node = {
    type: string,
}
type Parent = Node & {
    children: Array<Parent | Literal>
}
type Literal = Node & {
    value: string
}

type Image = {
    type: "image";
    url: string;
    alt: string
}

type Renderer = (n: Parent | Literal, width: number) => string


export function renderMarkdownToPlainTxt(markdown: string): string {
    const masm = fromMarkdown(markdown) // Parse the mk into a tree
    return defaultNodeRenderer(masm as Parent, TXT_WIDTH)
}


/**
 * This is a type guard to go around typecript stupidity
 */
function isLiteral(node: Parent | Literal): node is Literal {
    return (node as Literal).value !== undefined;
}


function defaultNodeRenderer(node: Parent | Literal, width: number): string {
    // Base case: we return the value
    if (isLiteral(node)) {
        return node.value
    }

    // Recursive case, get value from children
    let result = ""
    node.children.forEach((child) => {
        const renderer = renderers[child.type] || defaultNodeRenderer
        result += renderer(child, width)
    })
    return result

}

function paragraphRenderer(node: Parent | Literal, width: number): string {
    if (isLiteral(node)) {
        throw new Error("paragraph must not be litteral");
    }

    // Recursive case, get value from children
    let result = ""
    let justify = true
    node.children.forEach((child) => {
        if (child.type == "image") justify = false
        const renderer = renderers[child.type] || defaultNodeRenderer
        result += renderer(child, width)
    })
    if (!justify) {
        return result
    }
    return paragraph(result, width)
}


function inlineCodeRenderer(node: Parent | Literal, width: number): string {
    if (!isLiteral(node)) {
        throw new Error("inlineCode must be litteral.");
    }

    return "`" + node.value + "`"
}

function strongRenderer(node: Parent | Literal, width: number): string {
    if (isLiteral(node)) {
        throw new Error("strong must NOT be litteral");
    }
    let result = ""
    node.children.forEach((child) => {
        const renderer = renderers[child.type] || defaultNodeRenderer
        result += renderer(child, width)
    })
    return bold(result)
    // return "*" + result + "*"
}

function emphasisRenderer(node: Parent | Literal, width: number): string {
    if (isLiteral(node)) {
        throw new Error("emphasis must NOT be litteral");
    }

    let result = ""
    node.children.forEach((child) => {
        const renderer = renderers[child.type] || defaultNodeRenderer
        result += renderer(child, width)
    })
    return italic(result)
}

function imageRenderer(node: Parent | Literal, width: number): string {
    const img = node as unknown as Image
    const imgs_ascii = import.meta.glob(
        "/public/images_ascii/*.txt", { query: '?raw', eager: true }
    )
    for (const img_path in imgs_ascii) {
        if (img_path.includes(img.url)) {
            let img_ascii = imgs_ascii[img_path].default as string
            if (!img_ascii.endsWith("\n")) {
                img_ascii += "\n"
            }
            return image(img_ascii, img.alt, width)
        }
    }

    // Not image match
    let result = center(`Image of "${img.alt}"`)
    result += center(`(source: ${img.url})`)
    return result + "\n"
}


function htmlRenderer(node: Parent | Literal, width: number): string {
    return ""
}

function linkRenderer(node: Parent | Literal, width: number): string {
    return ""
}

const renderers: Record<string, Renderer> = {
    "paragraph": paragraphRenderer,
    "inlineCode": inlineCodeRenderer,
    "strong": strongRenderer,
    "emphasis": emphasisRenderer,
    "image": imageRenderer,
    "html": htmlRenderer,
}

