/**
 * Types the tail of the campaign slogan: each word is written out, held, erased,
 * and the last one is left standing.
 *
 * The element arrives with the final word already server-rendered and marked
 * `data-done`, so the slogan reads complete when this never runs — no JavaScript,
 * reduced motion, or an automated browser.
 */

export interface TypewriterTimings {
    /** Beat of empty, blinking caret before the first word appears. */
    startMs: number
    typeMs: number
    deleteMs: number
    /** How long a finished word stays up before it is erased. */
    holdMs: number
    /** Pause on the empty caret between words. */
    clearedMs: number
}

export const defaultTimings: TypewriterTimings = {
    clearedMs: 200,
    deleteMs: 40,
    holdMs: 1200,
    startMs: 900,
    typeMs: 70,
}

const defaultSleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

export async function typewriter(
    target: HTMLElement,
    words: string[],
    timings: TypewriterTimings = defaultTimings,
    sleep: (ms: number) => Promise<void> = defaultSleep
): Promise<void> {
    const write = async (word: string, ms: number) => {
        for (let i = 1; i <= word.length; i += 1) {
            target.textContent = word.slice(0, i)
            await sleep(ms)
        }
    }

    const erase = async () => {
        const word = target.textContent ?? ''
        for (let i = word.length - 1; i >= 0; i -= 1) {
            target.textContent = word.slice(0, i)
            await sleep(timings.deleteMs)
        }
    }

    delete target.dataset.done
    target.textContent = ''
    await sleep(timings.startMs)

    for (const word of words.slice(0, -1)) {
        await write(word, timings.typeMs)
        await sleep(timings.holdMs)
        await erase()
        await sleep(timings.clearedMs)
    }

    await write(words[words.length - 1], timings.typeMs)
    // Rest on the final word: no loop, no caret.
    target.dataset.done = ''
}

/** True when the visitor asked for less motion, or a headless browser is driving. */
export function shouldSkipAnimation(): boolean {
    return navigator.webdriver || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function startTypewriters(root: ParentNode = document): void {
    if (shouldSkipAnimation()) {
        return
    }

    for (const target of root.querySelectorAll<HTMLElement>('.typed')) {
        const words = JSON.parse(target.dataset.typedWords ?? '[]') as string[]

        if (words.length > 1) {
            void typewriter(target, words)
        }
    }
}
