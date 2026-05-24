import type { ImageMetadata } from 'astro'

const images = import.meta.glob<{ default: ImageMetadata }>('/src/images/processed/**/*.jpg')

export async function getImage(slug: string, variant: string): Promise<ImageMetadata> {
    const key = `/src/images/processed/${slug}/${variant}.jpg`
    const loader = images[key]
    if (!loader) throw new Error(`Processed image not found: ${key}`)
    return (await loader()).default
}
