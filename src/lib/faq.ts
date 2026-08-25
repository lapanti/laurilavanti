import remarkParse from 'remark-parse'
import { unified } from 'unified'

export interface VisibleFaqEntry {
    answer: string
    question: string
}

interface MarkdownNode {
    alt?: string
    children?: MarkdownNode[]
    depth?: number
    type: string
    value?: string
}

const normalizeText = (value: string): string =>
    value
        .replace(/\s+/g, ' ')
        .replace(/\s+([,.;:!?])/g, '$1')
        .trim()

const visibleText = (node: MarkdownNode): string => {
    switch (node.type) {
        case 'code':
        case 'inlineCode':
        case 'text':
            return node.value ?? ''
        case 'image':
            return node.alt ?? ''
        case 'html':
        case 'imageReference':
        case 'thematicBreak':
            return ''
        default:
            return node.children?.map(visibleText).join(' ') ?? ''
    }
}

const isH2 = (node: MarkdownNode): boolean => node.type === 'heading' && node.depth === 2

export const extractVisibleFaq = (markdown: string): VisibleFaqEntry[] => {
    const tree = unified().use(remarkParse).parse(markdown) as MarkdownNode
    const nodes = tree.children ?? []
    const entries: VisibleFaqEntry[] = []

    for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index]
        if (!isH2(node)) continue

        const question = normalizeText(visibleText(node))
        if (!question.endsWith('?')) continue

        const answerNodes = []
        for (let answerIndex = index + 1; answerIndex < nodes.length && !isH2(nodes[answerIndex]); answerIndex++) {
            answerNodes.push(nodes[answerIndex])
        }
        const answer = normalizeText(answerNodes.map(visibleText).join(' '))
        if (answer) entries.push({ answer, question })
    }

    return entries
}
