import type { ContentfulPostExcerpt } from '../types/contentful'

/** Helper function to check whether given value is an object */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObject = <T>(value: any): value is Record<string, T> =>
    !Array.isArray(value) && value === Object(value) && typeof value !== 'function'

/** Helper function to check whether given value is a @see ContentfulPostExcerpt */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isContentfulPostExcerpt = (possiblePostExcerpt: any): possiblePostExcerpt is ContentfulPostExcerpt =>
    possiblePostExcerpt &&
    isObject(possiblePostExcerpt) &&
    'slug' in possiblePostExcerpt &&
    possiblePostExcerpt.slug !== undefined &&
    'title' in possiblePostExcerpt &&
    possiblePostExcerpt.title !== 'undefined' &&
    'excerpt' in possiblePostExcerpt &&
    possiblePostExcerpt.excerpt !== 'undefined'
