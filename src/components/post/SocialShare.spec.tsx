import { render, screen } from '@testing-library/react'

import SocialShare from './SocialShare'

describe('<SocialShare />', () => {
    const title = 'Title'
    const shareUrl = 'ShareUrl'
    const ariaLabel = 'AriaLabel'

    it('should render', () => {
        const { container } = render(<SocialShare ariaLabel={ariaLabel} shareUrl={shareUrl} title={title} />)

        expect(screen.getByRole('complementary', { name: ariaLabel })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /Jaa Facebookissa/i })).toHaveAttribute(
            'href',
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(shareUrl)}`
        )
        expect(screen.getByRole('link', { name: /Jaa Threadsissä/i })).toHaveAttribute(
            'href',
            `https://threads.net/intent/post?text=${encodeURI(title)}%20${encodeURI(shareUrl)}`
        )
        expect(screen.getByRole('link', { name: /Jaa Blueskyssa/i })).toHaveAttribute(
            'href',
            `https://bsky.app/intent/compose?text=${encodeURI(title)}%20${encodeURI(shareUrl)}`
        )
        expect(screen.getByRole('link', { name: /Jaa LinkedInissä/i })).toHaveAttribute(
            'href',
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURI(shareUrl)}`
        )

        expect(container.firstChild).toMatchSnapshot()
    })
})
