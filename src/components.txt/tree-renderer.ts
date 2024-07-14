import { paragraph, bold, link, italic, center, image, TXT_WIDTH, listItem } from "./formatter"
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

type Link = Parent & {
    url: string
}

type List = Parent & {
    ordered?: boolean
    start: number
}

type Renderer = (n: Parent | Literal) => string


export function renderMarkdownToPlainTxt(markdown: string): string {
    const masm = fromMarkdown(markdown) // Parse the mk into a tree
    // return JSON.stringify(masm, null, 2)
    return defaultNodeRenderer(masm as Parent)
}


/**
 * This is a type guard to go around typecript stupidity
 */
function isLiteral(node: Parent | Literal): node is Literal {
    return (node as Literal).value !== undefined;
}


function defaultNodeRenderer(node: Parent | Literal): string {
    // Base case: we return the value
    if (isLiteral(node)) {
        return node.value
    }

    // Recursive case, get value from children
    let result = ""
    node.children.forEach((child) => {
        const renderer = renderers[child.type] || defaultNodeRenderer
        result += renderer(child)
    })
    return result

}

function paragraphRenderer(node: Parent | Literal): string {
    if (isLiteral(node)) {
        throw new Error("paragraph must not be litteral");
    }

    // Recursive case, get value from children
    let result = ""
    let justify = true
    node.children.forEach((child) => {
        if (child.type == "image") justify = false
        const renderer = renderers[child.type] || defaultNodeRenderer
        result += renderer(child)
    })
    if (!justify) {
        return result
    }
    return paragraph(result)
}


function inlineCodeRenderer(node: Parent | Literal): string {
    if (!isLiteral(node)) {
        throw new Error("inlineCode must be litteral.");
    }

    return "`" + node.value + "`"
}

function strongRenderer(node: Parent | Literal): string {
    if (isLiteral(node)) {
        throw new Error("strong must NOT be litteral");
    }
    let result = ""
    node.children.forEach((child) => {
        const renderer = renderers[child.type] || defaultNodeRenderer
        result += renderer(child)
    })
    return bold(result)
    // return "*" + result + "*"
}

function emphasisRenderer(node: Parent | Literal): string {
    if (isLiteral(node)) {
        throw new Error("emphasis must NOT be litteral");
    }

    let result = ""
    node.children.forEach((child) => {
        const renderer = renderers[child.type] || defaultNodeRenderer
        result += renderer(child)
    })
    return italic(result)
}

function imageRenderer(node: Parent | Literal): string {
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
            return image(img_ascii, img.alt)
        }
    }

    // Not image match
    let result = center(`Image of "${img.alt}"`)
    result += center(`(source: ${img.url})`)
    return result + "\n"
}


function htmlRenderer(node: Parent | Literal): string {
    return ""
}

function linkRenderer(node: Parent | Literal): string {
    const linkNode = node as Link
    let text = ""
    linkNode.children.forEach((child) => {
        const renderer = renderers[child.type] || defaultNodeRenderer
        text += renderer(child)
    })
    return link(text, linkNode.url)
}

function listRenderer(node: Parent | Literal): string {
    const list = node as List
    if (list.ordered === true) {
        return orderedListRenderer(list)
    }

    const prefix = "  • "
    let result = ""
    list.children.forEach((child) => {
        const renderer = renderers[child.type] || defaultNodeRenderer
        const content = renderer(child)
        result += listItem(prefix, content)
    })
    return result + "\n"
}

function orderedListRenderer(list: List): string {
    let result = ""
    for (let i = list.start; i < list.start + list.children.length; i++) {
        const prefix = ` ${i}. `
        const child = list.children[i - list.start]
        const renderer = renderers[child.type] || defaultNodeRenderer
        const content = renderer(child)
        result += listItem(prefix, content)
    }
    return result
}

const renderers: Record<string, Renderer> = {
    "paragraph": paragraphRenderer,
    "inlineCode": inlineCodeRenderer,
    "strong": strongRenderer,
    "emphasis": emphasisRenderer,
    "image": imageRenderer,
    "html": htmlRenderer,
    "link": linkRenderer,
    "list": listRenderer
}

