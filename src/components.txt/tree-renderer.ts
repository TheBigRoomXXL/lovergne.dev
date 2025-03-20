import {
    paragraph, bold, link, italic, center, image, TXT_WIDTH,
    listOrdered, listUnordered
} from "./formatter"
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

type Context = {
    width: number; // max length of a line
    footerNotes: string[]
}
type Renderer = (n: Parent | Literal, c: Context) => string

export function renderMarkdownToPlainTxt(markdown: string, context: Partial<Context> | undefined): string {
    const c: Context = {
        width: TXT_WIDTH,
        footerNotes: [],
        ...context
    }
    const masm = fromMarkdown(markdown) // Parse the mk into a tree

    let content = defaultNodeRenderer(masm as Parent, c)

    for (let i = 0; i < c.footerNotes.length; i++) {
        content += `[${i + 1}] ${c.footerNotes[i]}\n`
    }
    return content
}


/**
 * This is a type guard to go around typecript stupidity
 */
function isLiteral(node: Parent | Literal): node is Literal {
    return (node as Literal).value !== undefined;
}


function defaultNodeRenderer(node: Parent | Literal, c: Context): string {
    // Base case: we return the value
    if (isLiteral(node)) {
        return node.value
    }

    // Recursive case, get value from children
    let result = ""
    if (node.children === undefined) {
        return result
    }

    node.children.forEach((child) => {
        const renderer = renderers[child.type] || defaultNodeRenderer
        result += renderer(child, c)
    })
    return result

}

function paragraphRenderer(node: Parent | Literal, c: Context): string {
    if (isLiteral(node)) {
        throw new Error("paragraph must not be litteral");
    }

    // Recursive case, get value from children
    let result = ""
    let justify = true
    node.children.forEach((child) => {
        if (child.type == "image") justify = false
        const renderer = renderers[child.type] || defaultNodeRenderer
        result += renderer(child, c)
    })
    if (!justify) {
        return result
    }
    return paragraph(result, c.width)
}


function inlineCodeRenderer(node: Parent | Literal, c: Context): string {
    if (!isLiteral(node)) {
        throw new Error("inlineCode must be litteral.");
    }

    return "`" + node.value + "`"
}

// Disabled because it breack monospace fonts
function strongRenderer(node: Parent | Literal, c: Context): string {
    if (isLiteral(node)) {
        throw new Error("strong must NOT be litteral");
    }
    let result = ""
    node.children.forEach((child) => {
        const renderer = renderers[child.type] || defaultNodeRenderer
        result += renderer(child, c)
    })
    return bold(result)
    // return "*" + result + "*"
}

// Disabled because it breack monospace fonts
function emphasisRenderer(node: Parent | Literal, c: Context): string {
    if (isLiteral(node)) {
        throw new Error("emphasis must NOT be litteral");
    }

    let result = ""
    node.children.forEach((child) => {
        const renderer = renderers[child.type] || defaultNodeRenderer
        result += renderer(child, c)
    })
    return italic(result)
}

function imageRenderer(node: Parent | Literal, c: Context): string {
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
            return image(img_ascii, img.alt, c.width)
        }
    }

    // Not image match
    let result = center(`Image of "${img.alt}"`)
    result += center(`(source: ${img.url})`)
    return result + "\n"
}


function htmlRenderer(node: Parent | Literal, c: Context): string {
    return ""
}

function linkRenderer(node: Parent | Literal, c: Context): string {
    const linkNode = node as Link
    let text = ""
    linkNode.children.forEach((child) => {
        const renderer = renderers[child.type] || defaultNodeRenderer
        text += renderer(child, c)
    })
    return link(text, linkNode.url, c.footerNotes)
}

function listRenderer(node: Parent | Literal, c: Context): string {
    const list = node as List

    let items: string[] = []
    c.width -= 4
    list.children.forEach((child) => {
        const renderer = renderers[child.type] || defaultNodeRenderer
        items.push(renderer(child, c))
    })
    c.width += 4

    if (list.ordered === true) {
        return listOrdered(items, list.start)
    }
    return listUnordered(items)
}


const renderers: Record<string, Renderer> = {
    "paragraph": paragraphRenderer,
    "inlineCode": inlineCodeRenderer,
    "image": imageRenderer,
    "html": htmlRenderer,
    "link": linkRenderer,
    "list": listRenderer
}

