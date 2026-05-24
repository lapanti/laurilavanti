import { describe, expect, it } from 'vitest'

import { personJobTitle, personName } from '../content/person'
import { buildBylineText } from './byline'

describe('buildBylineText', () => {
    describe('solo author', () => {
        it('returns empty string for single lauri sentinel', () => {
            expect(buildBylineText(['lauri'], 'en')).toBe('')
        })

        it('returns empty string for single co-author object', () => {
            expect(buildBylineText([{ name: 'Miisa Jeremejew' }], 'en')).toBe('')
        })
    })

    describe('two authors — no roles', () => {
        it('renders name-only byline in English', () => {
            expect(buildBylineText([{ name: 'Ronja Karkinen' }, 'lauri'], 'en')).toBe(
                `Authors: Ronja Karkinen and ${personName}.`
            )
        })

        it('renders name-only byline in Finnish', () => {
            expect(buildBylineText([{ name: 'Ronja Karkinen' }, 'lauri'], 'fi')).toBe(
                `Tekijät: Ronja Karkinen ja ${personName}.`
            )
        })

        it('renders name-only byline in Swedish', () => {
            expect(buildBylineText([{ name: 'Ronja Karkinen' }, 'lauri'], 'sv')).toBe(
                `Författare: Ronja Karkinen och ${personName}.`
            )
        })
    })

    describe('two authors — co-author has role', () => {
        it('injects personJobTitle for lauri sentinel when co-author has role (en)', () => {
            expect(buildBylineText([{ name: 'Atte Harjanne', role: 'member of parliament' }, 'lauri'], 'en')).toBe(
                `Authors: Atte Harjanne (member of parliament) and ${personName} (${personJobTitle['en']}).`
            )
        })

        it('injects personJobTitle for lauri sentinel when co-author has role (fi)', () => {
            expect(buildBylineText([{ name: 'Atte Harjanne', role: 'kansanedustaja' }, 'lauri'], 'fi')).toBe(
                `Tekijät: Atte Harjanne (kansanedustaja) ja ${personName} (${personJobTitle['fi']}).`
            )
        })

        it('injects personJobTitle for lauri sentinel when co-author has role (sv)', () => {
            expect(buildBylineText([{ name: 'Atte Harjanne', role: 'riksdagsledamot' }, 'lauri'], 'sv')).toBe(
                `Författare: Atte Harjanne (riksdagsledamot) och ${personName} (${personJobTitle['sv']}).`
            )
        })

        it('renders co-author role in parentheses next to name', () => {
            expect(buildBylineText([{ name: 'Miisa Jeremejew', role: 'municipal councillor' }, 'lauri'], 'en')).toBe(
                `Authors: Miisa Jeremejew (municipal councillor) and ${personName} (${personJobTitle['en']}).`
            )
        })
    })

    describe('three authors — no roles', () => {
        it('uses Oxford comma', () => {
            expect(buildBylineText([{ name: 'Johanna Fleming' }, 'lauri', { name: 'Paula Oittinen' }], 'en')).toBe(
                `Authors: Johanna Fleming, ${personName}, and Paula Oittinen.`
            )
        })

        it('uses correct conjunction in Finnish', () => {
            expect(buildBylineText([{ name: 'Johanna Fleming' }, 'lauri', { name: 'Paula Oittinen' }], 'fi')).toBe(
                `Tekijät: Johanna Fleming, ${personName}, ja Paula Oittinen.`
            )
        })

        it('uses correct conjunction in Swedish', () => {
            expect(buildBylineText([{ name: 'Johanna Fleming' }, 'lauri', { name: 'Paula Oittinen' }], 'sv')).toBe(
                `Författare: Johanna Fleming, ${personName}, och Paula Oittinen.`
            )
        })
    })

    describe('author ordering', () => {
        it('preserves frontmatter array order', () => {
            const result = buildBylineText([{ name: 'Miisa Jeremejew' }, 'lauri'], 'en')
            expect(result.indexOf('Miisa')).toBeLessThan(result.indexOf(personName))
        })

        it('lauri first when sentinel is first entry', () => {
            const result = buildBylineText(['lauri', { name: 'Miisa Jeremejew' }], 'en')
            expect(result.indexOf(personName)).toBeLessThan(result.indexOf('Miisa'))
        })
    })

    describe('co-author without role when another co-author has role', () => {
        it('shows name only for the role-less co-author, role for the one with role', () => {
            expect(
                buildBylineText(
                    [{ name: 'Johanna Fleming' }, 'lauri', { name: 'Paula Oittinen', role: 'teacher' }],
                    'en'
                )
            ).toBe(`Authors: Johanna Fleming, ${personName} (${personJobTitle['en']}), and Paula Oittinen (teacher).`)
        })
    })
})
