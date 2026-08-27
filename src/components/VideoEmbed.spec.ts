import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { videoEmbedContent } from '../../src/content/videoEmbed'
import { sizes } from '../../src/lib/styles'
import { renderAstroComponent } from '../../tests/helpers'
import VideoEmbed from './VideoEmbed.astro'

describe('<VideoEmbed />', () => {
    const props = {
        lang: 'fi',
        title: 'Miksi olen ehdolla?',
        videoId: 'fiLEp7wLK3I',
    } as const
    const langs = ['en', 'fi', 'sv'] as const

    it('should render', async () => {
        const result = await renderAstroComponent(VideoEmbed, { props })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should not ship an iframe or a third-party image in the initial markup', async () => {
        const result = await renderAstroComponent(VideoEmbed, { props })

        expect(result.querySelectorAll('iframe')).toHaveLength(0)
        expect(result.querySelectorAll('img')).toHaveLength(0)
        expect(result.innerHTML).not.toContain('ytimg')
    })

    it('should build a cookieless autoplaying embed url in the click handler', async () => {
        const result = await renderAstroComponent(VideoEmbed, { props })
        const script = result.querySelector('script')?.textContent ?? ''

        expect(script).toContain('https://www.youtube-nocookie.com/embed/fiLEp7wLK3I?autoplay=1')
        expect(script).toContain('strict-origin-when-cross-origin')
        expect(script).not.toContain('https://www.youtube.com/')
    })

    it('should append caller params before autoplay', async () => {
        const result = await renderAstroComponent(VideoEmbed, { props: { ...props, params: 'start=30' } })
        const script = result.querySelector('script')?.textContent ?? ''

        expect(script).toContain('https://www.youtube-nocookie.com/embed/fiLEp7wLK3I?start=30&autoplay=1')
    })

    it.each(langs)('should render a play button for %s', async (lang) => {
        const result = await renderAstroComponent(VideoEmbed, { props: { ...props, lang } })
        const button = getByRole(result, 'button', {
            name: `${videoEmbedContent[lang].playLabel}: ${props.title}`,
        })

        expect(button).toHaveAttribute('type', 'button')
        expect(button).toHaveTextContent(videoEmbedContent[lang].playLabel)
    })

    it('should cap the embed at the text measure', async () => {
        const result = await renderAstroComponent(VideoEmbed, { props })

        expect(result.querySelector('.video-embed')?.getAttribute('style')).toContain(`--sizes45: ${sizes[45]};`)
    })

    it('should reject a malformed video id', async () => {
        await expect(renderAstroComponent(VideoEmbed, { props: { ...props, videoId: 'nope!' } })).rejects.toThrow()
    })
})
