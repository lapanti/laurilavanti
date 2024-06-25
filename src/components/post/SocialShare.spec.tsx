import { render, screen } from '@testing-library/react'
import React from 'react'

import SocialShare from './SocialShare'

describe('<SocialShare />', () => {
    const title = 'Title'
    const siteUrl = 'SiteUrl'
    const ariaLabel = 'AriaLabel'

    it('should render', () => {
        const { container } = render(<SocialShare title={title} siteUrl={siteUrl} ariaLabel={ariaLabel} />)

        expect(screen.getByRole('complementary', { name: ariaLabel })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /Jaa Facebookissa/i })).toHaveAttribute(
            'href',
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(siteUrl)}`
        )
        expect(screen.getByRole('link', { name: /Jaa Threadsissä/i })).toHaveAttribute(
            'href',
            `https://threads.net/intent/post?text=${encodeURI(title)}%20${encodeURI(siteUrl)}`
        )
        expect(screen.getByRole('link', { name: /Jaa Blueskyssa/i })).toHaveAttribute(
            'href',
            `https://bsky.app/intent/compose?text=${encodeURI(title)}%20${encodeURI(siteUrl)}`
        )
        expect(screen.getByRole('link', { name: /Jaa LinkedInissä/i })).toHaveAttribute(
            'href',
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURI(siteUrl)}`
        )

        expect(container.firstChild).toMatchSnapshot()
    })
})
