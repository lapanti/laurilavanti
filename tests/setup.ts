import '@testing-library/jest-dom/vitest'

import { vi } from 'vitest'

vi.mock('../src/lib/images', () => ({
    getImage: vi.fn((_slug: string) => ({
        height: 1680,
        src: `https://laurilavanti.fi/images/${_slug}/w=1680,h=1680,fit=crop,gravity=face`,
        width: 1680,
    })),
    getImageSrcset: vi.fn((_slug: string, _variant: string, _widths: number[]) => ({
        height: 1680,
        src: `https://laurilavanti.fi/images/${_slug}/w=1680,h=1680,fit=crop,gravity=face`,
        srcset: _widths
            .map((w) => `https://laurilavanti.fi/images/${_slug}/w=${w},h=${w},fit=crop,gravity=face ${w}w`)
            .join(', '),
        width: 1680,
    })),
}))
