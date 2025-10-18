import type { FooterNav } from '../src/types/contentful'

import { blueskyLink, facebookLink, instagramLink, linkedInLink, mastodonLink, threadsLink } from './contactInfo.mock'

export const footerNav: FooterNav = {
    links: [facebookLink, threadsLink, instagramLink, linkedInLink, mastodonLink, blueskyLink],
}
