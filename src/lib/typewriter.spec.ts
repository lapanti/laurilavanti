import { Window } from 'happy-dom'
import { describe, expect, it } from 'vitest'

import { defaultTimings, typewriter } from './typewriter'

const timings = { clearedMs: 0, deleteMs: 0, holdMs: 0, startMs: 0, typeMs: 0 }

function createTarget(restingWord: string) {
    const window = new Window()
    const target = window.document.createElement('span') as unknown as HTMLElement
    target.textContent = restingWord
    target.dataset.done = ''

    return target
}

/** Records what the element read at every step, so we can assert the whole sequence. */
function recordingSleep(frames: string[], target: HTMLElement) {
    return () => {
        frames.push(target.textContent ?? '')

        return Promise.resolve()
    }
}

describe('typewriter', () => {
    it('should type each word in order and rest on the last', async () => {
        const target = createTarget('Suomea')
        const frames: string[] = []

        await typewriter(
            target,
            ['taloutta', 'sivistystä', 'vapautta', 'Suomea'],
            timings,
            recordingSleep(frames, target)
        )

        const completed = frames.filter((f, i) => f !== '' && f !== frames[i + 1]?.slice(0, f.length))
        expect(completed).toContain('taloutta')
        expect(completed).toContain('sivistystä')
        expect(completed).toContain('vapautta')
        expect(target.textContent).toBe('Suomea')
    })

    it('should type the first word one character at a time', async () => {
        const target = createTarget('Suomea')
        const frames: string[] = []

        await typewriter(target, ['abc', 'zz'], timings, recordingSleep(frames, target))

        expect(frames.slice(0, 5)).toEqual(['', 'a', 'ab', 'abc', 'abc'])
    })

    it('should clear the resting word before typing anything', async () => {
        const target = createTarget('Suomea')
        const frames: string[] = []

        /*
         * A resting word that is not also one of the typed words, so any sighting
         * of it can only be the server-rendered text surviving.
         */
        await typewriter(target, ['taloutta', 'vapautta'], timings, recordingSleep(frames, target))

        expect(frames[0]).toBe('')
        expect(frames).not.toContain('Suomea')
    })

    it('should erase each word back to empty between words', async () => {
        const target = createTarget('Suomea')
        const frames: string[] = []

        await typewriter(target, ['ab', 'cd'], timings, recordingSleep(frames, target))

        expect(frames).toEqual(['', 'a', 'ab', 'ab', 'a', '', '', 'c', 'cd'])
    })

    it('should drop the done marker while running and restore it at rest', async () => {
        const target = createTarget('Suomea')
        const seen: boolean[] = []
        const sleep = () => {
            seen.push(target.dataset.done !== undefined)

            return Promise.resolve()
        }

        await typewriter(target, ['ab', 'Suomea'], timings, sleep)

        expect(seen.every((done) => !done)).toBe(true)
        expect(target.dataset.done).toBe('')
    })

    it('should ship timings that put the first word on screen within two seconds', () => {
        const { startMs, typeMs } = defaultTimings

        expect(startMs + typeMs * 'taloutta'.length).toBeLessThan(2000)
    })
})
