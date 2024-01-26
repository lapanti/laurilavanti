import type { FooterNav } from '../src/types/contentful'

import { facebookLink, instagramLink, linkedInLink, mastodonLink, threadsLink, twitterLink } from './contactInfo.mock'

export const footerNav: FooterNav = {
    links: [facebookLink, threadsLink, instagramLink, linkedInLink, mastodonLink, twitterLink],
}
