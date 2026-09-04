import { describe, expect, it } from 'vitest'

import { renderOgCard } from './render'

const PNG_MAGIC = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]

const readUint32 = (bytes: Uint8Array, offset: number): number =>
    ((bytes[offset] << 24) | (bytes[offset + 1] << 16) | (bytes[offset + 2] << 8) | bytes[offset + 3]) >>> 0

describe('renderOgCard', () => {
    it('renders a 1200×630 PNG for a card with an emphasised word', async () => {
        const png = await renderOgCard({ emphasis: 'eduskuntaan', id: 'fi__about', lang: 'fi', title: 'Osaamista' })

        expect([...png.slice(0, 8)]).toEqual(PNG_MAGIC)
        // IHDR width/height live at byte offsets 16 and 20.
        expect(readUint32(png, 16)).toBe(1200)
        expect(readUint32(png, 20)).toBe(630)
    })

    it('renders a card without an emphasis word (e.g. a category page)', async () => {
        const png = await renderOgCard({ id: 'fi__category__economy', lang: 'fi', title: 'Talous' })

        expect([...png.slice(0, 8)]).toEqual(PNG_MAGIC)
        expect(readUint32(png, 16)).toBe(1200)
    })

    it('renders a card with a per-page portrait photo', async () => {
        const png = await renderOgCard({
            id: 'fi__contact',
            lang: 'fi',
            photo: 'portrait-katse-kameraan.jpg',
            title: 'Ota yhteyttä',
        })

        expect([...png.slice(0, 8)]).toEqual(PNG_MAGIC)
        expect(readUint32(png, 16)).toBe(1200)
        expect(readUint32(png, 20)).toBe(630)
    })
})
