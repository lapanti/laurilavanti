export const BLOGPOSTING = 'BlogPosting' as const
export const PERSON = 'Person' as const
export const WEBPAGE = 'WebPage' as const
export const WEBSITE = 'WebSite' as const

export const JSON_LD_TYPES = [BLOGPOSTING, PERSON, WEBPAGE, WEBSITE] as const

export type JsonLdType = typeof JSON_LD_TYPES[number]
