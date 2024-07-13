import { paragraph, bold } from "./formatter"

// Fuck you typescript
type Node = {
    type: string,
}
type Parent = Node & {
    children: Array<Parent | Literal>
}
type Literal = Node & {
    value: string
}

type Renderer = (n: Parent | Literal, width: number) => string

/**
 * This is a type guard to go around typecript stupidity
 */
function isLiteral(node: Parent | Literal): node is Literal {
    return (node as Literal).value !== undefined;
}


export function defaultNodeRenderer(node: Parent | Literal, width: number): string {
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
    node.children.forEach((child) => {
        const renderer = renderers[child.type] || defaultNodeRenderer
        result += renderer(child, width)
    })
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

const renderers: Record<string, Renderer> = {
    "paragraph": paragraphRenderer,
    "inlineCode": inlineCodeRenderer,
    "strong": strongRenderer,
}

