import type { Lang } from './nav'

interface VideoEmbedContent {
    playLabel: string
    /** Names the platform the video comes from, and when it starts talking to it. */
    sourceNote: string
}

export const videoEmbedContent: Record<Lang, VideoEmbedContent> = {
    en: {
        playLabel: 'Play video',
        sourceNote: 'The video plays from YouTube. Nothing is loaded from YouTube until you press play.',
    },
    fi: {
        playLabel: 'Toista video',
        sourceNote: 'Video toistetaan YouTubesta. Mitään ei ladata YouTubelta ennen kuin painat toistoa.',
    },
    sv: {
        playLabel: 'Spela upp videon',
        sourceNote: 'Videon spelas upp från YouTube. Ingenting laddas från YouTube förrän du trycker på play.',
    },
}
