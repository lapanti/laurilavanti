import type { ContactInfoLink } from '../src/types/contentful'

export const mailLink: ContactInfoLink = {
    contentful_id: '4N9FJRjt9I5wHNGDWjp3Ox',
    icon: 'envelope',
    title: 'lauri.lavanti@kirkkonummi.fi',
    url: 'mailto:lauri.lavanti@kirkkonummi.fi',
}

export const facebookLink: ContactInfoLink = {
    contentful_id: '6ylApa8B8wgGibypB2UIB9',
    icon: 'facebook',
    title: 'Facebook',
    url: 'https://www.facebook.com/laurilavanti',
}

export const threadsLink: ContactInfoLink = {
    contentful_id: 'KQpgl5vI3xI6uN6dZd9Gy',
    icon: 'threads',
    title: 'Threads',
    url: 'https://www.threads.net/@laurilavanti',
}

export const instagramLink: ContactInfoLink = {
    contentful_id: 'o7sDXDUNJVK7NUQSQarQQ',
    icon: 'instagram',
    title: 'Instagram',
    url: 'https://www.instagram.com/laurilavanti/',
}

export const linkedInLink: ContactInfoLink = {
    contentful_id: 'vl12ZwQDYvDaOBWKlWU09',
    icon: 'linkedin',
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/lapanti',
}

export const mastodonLink: ContactInfoLink = {
    contentful_id: '2uZGyVH5uV3hzs4fjd685d',
    icon: 'mastodon',
    title: 'Mastodon',
    url: 'https://mastodontti.fi/@laurilavanti',
}

export const blueskyLink: ContactInfoLink = {
    contentful_id: 'izqXNmDJzl4RfQit84tZs',
    icon: 'bluesky',
    title: 'Bluesky',
    url: 'https://bsky.app/profile/laurilavanti.fi',
}

export const contactInfoLinks = [
    mailLink,
    facebookLink,
    threadsLink,
    instagramLink,
    linkedInLink,
    mastodonLink,
    blueskyLink,
]
