import { getByRole, queryAllByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import Byline from './Byline.astro'

describe('<Byline />', () => {
    describe('author byline', () => {
        it('renders nothing for a single author', async () => {
            const result = await renderAstroComponent(Byline, {
                props: { authors: ['lauri'], lang: 'fi' },
            })

            expect(result.querySelector('p')).toBeNull()
        })

        it('renders author byline for multiple authors', async () => {
            const result = await renderAstroComponent(Byline, {
                props: { authors: [{ name: 'Ronja Karkinen' }, 'lauri'], lang: 'fi' },
            })

            expect(result.querySelector('em')?.textContent).toContain('Ronja Karkinen')
        })
    })

    describe('externalPublications byline', () => {
        it('renders publication name and date', async () => {
            const result = await renderAstroComponent(Byline, {
                props: {
                    authors: ['lauri'],
                    externalPublications: [{ date: '2025-03-15', name: 'Kauppalehti' }],
                    lang: 'fi',
                },
            })

            expect(result.querySelector('em')?.textContent).toContain('Kauppalehti')
            expect(result.querySelector('em')?.textContent).toContain('15. maaliskuuta 2025')
        })

        it('renders Finnish prefix', async () => {
            const result = await renderAstroComponent(Byline, {
                props: {
                    authors: ['lauri'],
                    externalPublications: [{ date: '2025-03-15', name: 'Kauppalehti' }],
                    lang: 'fi',
                },
            })

            expect(result.querySelector('em')?.textContent).toContain('Julkaistu myös')
        })

        it('renders English prefix', async () => {
            const result = await renderAstroComponent(Byline, {
                props: {
                    authors: ['lauri'],
                    externalPublications: [{ date: '2025-03-15', name: 'Kauppalehti' }],
                    lang: 'en',
                },
            })

            expect(result.querySelector('em')?.textContent).toContain('Also published in')
        })

        it('renders Swedish prefix', async () => {
            const result = await renderAstroComponent(Byline, {
                props: {
                    authors: ['lauri'],
                    externalPublications: [{ date: '2025-03-15', name: 'Kauppalehti' }],
                    lang: 'sv',
                },
            })

            expect(result.querySelector('em')?.textContent).toContain('Publicerat även i')
        })

        it('renders a link when url is present', async () => {
            const url = 'https://www.kauppalehti.fi/article'
            const result = await renderAstroComponent(Byline, {
                props: {
                    authors: ['lauri'],
                    externalPublications: [{ date: '2025-03-15', name: 'Kauppalehti', url }],
                    lang: 'fi',
                },
            })

            expect(getByRole(result, 'link', { name: 'Kauppalehti' })).toHaveAttribute('href', url)
        })

        it('renders no space before the comma after the publication name', async () => {
            const result = await renderAstroComponent(Byline, {
                props: {
                    authors: ['lauri'],
                    externalPublications: [{ date: '2025-03-15', name: 'Verde', url: 'https://verdelehti.fi/' }],
                    lang: 'fi',
                },
            })

            expect(result.querySelector('em')?.textContent).toMatch(/Verde,/)
            expect(result.querySelector('em')?.textContent).not.toMatch(/Verde ,/)
        })

        it('renders no link when url is absent', async () => {
            const result = await renderAstroComponent(Byline, {
                props: {
                    authors: ['lauri'],
                    externalPublications: [{ date: '2025-03-15', name: 'Kauppalehti' }],
                    lang: 'fi',
                },
            })

            expect(queryAllByRole(result, 'link')).toHaveLength(0)
        })

        it('renders one paragraph per publication', async () => {
            const result = await renderAstroComponent(Byline, {
                props: {
                    authors: ['lauri'],
                    externalPublications: [
                        { date: '2025-03-15', name: 'Kauppalehti', url: 'https://kauppalehti.fi/a' },
                        { date: '2025-04-01', name: 'Verde', url: 'https://verdelehti.fi/a' },
                    ],
                    lang: 'fi',
                },
            })

            expect(result.querySelectorAll('p')).toHaveLength(2)
        })

        it('renders nothing when externalPublications is absent', async () => {
            const result = await renderAstroComponent(Byline, {
                props: { authors: ['lauri'], lang: 'fi' },
            })

            expect(result.querySelector('p')).toBeNull()
        })
    })
})
