import { describe, expect, it } from 'vitest'

import { extractVisibleFaq } from './faq'

describe('extractVisibleFaq', () => {
    it('extracts visible question sections until the next H2', () => {
        const markdown = `
## What is the first answer?

The first **answer** has a [visible link](https://example.com).

- First list item
- Second list item

### Supporting detail

Nested detail.

## What is the second answer?

> The second answer includes \`inline code\`.

## Closing section

This is not part of the second answer.
`

        expect(extractVisibleFaq(markdown)).toEqual([
            {
                answer: 'The first answer has a visible link. First list item Second list item Supporting detail Nested detail.',
                question: 'What is the first answer?',
            },
            {
                answer: 'The second answer includes inline code.',
                question: 'What is the second answer?',
            },
        ])
    })

    it('returns complete candidates even when fewer than two exist', () => {
        expect(extractVisibleFaq('## Only question?\n\nVisible answer.')).toEqual([
            { answer: 'Visible answer.', question: 'Only question?' },
        ])
    })

    it('ignores H3 questions, non-question H2 headings, and empty answers', () => {
        const markdown = `
### Nested question?

Nested answer.

## Statement heading

Statement body.

## Empty question?

## Final heading
`

        expect(extractVisibleFaq(markdown)).toEqual([])
    })

    it('includes image alt text and code block text but ignores raw HTML', () => {
        const markdown = `
## What is visible?

![Visible diagram](diagram.png)

\`\`\`
visible code
\`\`\`

<script>hidden script</script>
`

        expect(extractVisibleFaq(markdown)).toEqual([
            { answer: 'Visible diagram visible code', question: 'What is visible?' },
        ])
    })

    it('preserves punctuation between adjacent inline links', () => {
        const markdown = `
## What is the range?

The range is [50](https://example.com/50)–[70](https://example.com/70) euros.
`

        expect(extractVisibleFaq(markdown)).toEqual([
            { answer: 'The range is 50–70 euros.', question: 'What is the range?' },
        ])
    })

    it('ignores non-rendered MDX comments inside answer sections', () => {
        const markdown = `
## What is visible?

{/* reviewer note */}

Visible answer.

{/* [SCHEMA: BlogPosting required] */}
`

        expect(extractVisibleFaq(markdown)).toEqual([{ answer: 'Visible answer.', question: 'What is visible?' }])
    })
})
