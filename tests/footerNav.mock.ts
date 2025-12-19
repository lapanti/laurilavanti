import type { FooterNav } from '../src/types/contentfulCodegen'

import {
    blueskyLink,
    facebookLink,
    instagramLink,
    linkedInLink,
    mastodonLink,
    threadsLink,
    tiktokLink,
} from './contactInfo.mock'

export const footerNav: FooterNav = {
    links: [facebookLink, threadsLink, instagramLink, linkedInLink, mastodonLink, blueskyLink, tiktokLink],
}
