import type { ContactInfoLink } from '../src/types/contentful'

export const mailLink: ContactInfoLink = {
    contentful_id: '4N9FJRjt9I5wHNGDWjp3Ox',
    title: 'lauri.lavanti@kirkkonummi.fi',
    url: null,
    icon: 'envelope',
}

export const facebookLink: ContactInfoLink = {
    contentful_id: '6ylApa8B8wgGibypB2UIB9',
    title: 'Facebook',
    url: 'https://www.facebook.com/laurilavanti',
    icon: 'facebook',
}

export const twitterLink: ContactInfoLink = {
    contentful_id: 'izqXNmDJzl4RfQit84tZs',
    title: 'Twitter',
    url: 'https://twitter.com/laurilavanti',
    icon: 'twitter',
}

export const linkedInLink: ContactInfoLink = {
    contentful_id: 'vl12ZwQDYvDaOBWKlWU09',
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/lapanti',
    icon: 'linkedin',
}

export const contactInfoLinks = [mailLink, facebookLink, twitterLink, linkedInLink]
