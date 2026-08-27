import type { Lang } from './nav'

interface VideoEmbedContent {
    playLabel: string
}

export const videoEmbedContent: Record<Lang, VideoEmbedContent> = {
    en: { playLabel: 'Play video' },
    fi: { playLabel: 'Toista video' },
    sv: { playLabel: 'Spela upp videon' },
}
