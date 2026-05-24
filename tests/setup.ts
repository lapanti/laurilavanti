import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

vi.mock('../src/lib/images', () => ({
    getImage: vi.fn((_slug: string, _variant: string) =>
        Promise.resolve({
            src: `/images/${_slug}/${_variant}.jpg`,
            width: 1680,
            height: 1680,
            format: 'jpg',
        }),
    ),
}))
