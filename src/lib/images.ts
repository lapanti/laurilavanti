const BASE = 'https://laurilavanti.fi/images'

interface CFImageResult {
    src: string
    width: number
    height: number
}

interface VariantDef {
    w: number
    h: number
    fit: string
    gravity: string
}

const VARIANTS: Record<string, VariantDef> = {
    '1x1':       { w: 1680, h: 1680, fit: 'scale-crop', gravity: 'face' },
    '191x100':   { w: 1680, h:  881, fit: 'scale-crop', gravity: 'auto' },
    background:  { w: 1920, h:  660, fit: 'scale-crop', gravity: 'auto' },
    og:          { w: 1200, h:  630, fit: 'scale-crop', gravity: 'face' },
    body:        { w: 2400, h: 1800, fit: 'scale-crop', gravity: 'auto' },
}

export function getImage(slug: string, variant: string): CFImageResult {
    const v = VARIANTS[variant]
    if (!v) throw new Error(`Unknown image variant: ${variant}`)
    return {
        src: `${BASE}/${encodeURIComponent(slug)}/w=${v.w},h=${v.h},fit=${v.fit},gravity=${v.gravity}`,
        width: v.w,
        height: v.h,
    }
}

export function getImageSrcset(
    slug: string,
    variant: string,
    widths: number[],
): { srcset: string; src: string; width: number; height: number } {
    const v = VARIANTS[variant]
    if (!v) throw new Error(`Unknown image variant: ${variant}`)
    const ratio = v.h / v.w
    const entries = widths.map(w => {
        const h = Math.round(w * ratio)
        return `${BASE}/${encodeURIComponent(slug)}/w=${w},h=${h},fit=${v.fit},gravity=${v.gravity} ${w}w`
    })
    return {
        srcset: entries.join(', '),
        src: entries[entries.length - 1].split(' ')[0],
        width: widths[widths.length - 1],
        height: Math.round(widths[widths.length - 1] * ratio),
    }
}
