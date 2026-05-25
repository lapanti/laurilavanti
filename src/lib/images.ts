const BASE = 'https://laurilavanti.fi/images'

interface CFImageResult {
    height: number
    src: string
    width: number
}

interface VariantDef {
    fit: string
    gravity: string
    h: number
    w: number
}

const VARIANTS: Record<string, VariantDef> = {
    '1x1': { fit: 'scale-crop', gravity: '0.5x0.15', h: 1680, w: 1680 },
    '191x100': { fit: 'scale-crop', gravity: 'auto', h: 881, w: 1680 },
    background: { fit: 'scale-crop', gravity: 'auto', h: 660, w: 1920 },
    body: { fit: 'scale-crop', gravity: 'auto', h: 1800, w: 2400 },
    og: { fit: 'scale-crop', gravity: 'face', h: 630, w: 1200 },
}

export function getImage(slug: string, variant: string): CFImageResult {
    const v = VARIANTS[variant]
    if (!v) throw new Error(`Unknown image variant: ${variant}`)
    return {
        height: v.h,
        src: `${BASE}/${encodeURIComponent(slug)}/w=${v.w},h=${v.h},fit=${v.fit},gravity=${v.gravity}`,
        width: v.w,
    }
}

export function getImageSrcset(
    slug: string,
    variant: string,
    widths: number[]
): { height: number; src: string; srcset: string; width: number } {
    const v = VARIANTS[variant]
    if (!v) throw new Error(`Unknown image variant: ${variant}`)
    const ratio = v.h / v.w
    const entries = widths.map((w) => {
        const h = Math.round(w * ratio)

        return `${BASE}/${encodeURIComponent(slug)}/w=${w},h=${h},fit=${v.fit},gravity=${v.gravity} ${w}w`
    })

    return {
        height: Math.round(widths[widths.length - 1] * ratio),
        src: entries[entries.length - 1].split(' ')[0],
        srcset: entries.join(', '),
        width: widths[widths.length - 1],
    }
}
