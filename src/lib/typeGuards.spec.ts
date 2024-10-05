import { excerptList } from '../../tests/posts.mock'
import { isContentfulPostExcerpt, isObject } from './typeGuards'

describe('typeGuards lib', () => {
    describe('isObject', () => {
        it('should return true for objects', () => {
            expect(isObject({})).toBeTruthy()
            expect(isObject({ key: 'value' })).toBeTruthy()
        })

        it('should return false for arrays and other values', () => {
            expect(isObject([])).toBeFalsy()
            expect(isObject(['key', 'value'])).toBeFalsy()
            expect(isObject('')).toBeFalsy()
            expect(isObject(123)).toBeFalsy()
            expect(isObject(true)).toBeFalsy()
            expect(isObject(null)).toBeFalsy()
            expect(isObject(() => ({ object: 'key' }))).toBeFalsy()
        })
    })

    describe('isContentfulPostExcerpt', () => {
        it('should return false for things that are not ContentfulPostExcerpt', () => {
            expect(isContentfulPostExcerpt(undefined)).toBeFalsy()
            expect(isContentfulPostExcerpt(null)).toBeFalsy()
            expect(isContentfulPostExcerpt('slug')).toBeFalsy()
            expect(isContentfulPostExcerpt(true)).toBeFalsy()
            expect(isContentfulPostExcerpt(1245)).toBeFalsy()
            expect(isContentfulPostExcerpt([1, false, 'string'])).toBeFalsy()
            expect(isContentfulPostExcerpt({ slug: 'slug' })).toBeFalsy()
            expect(isContentfulPostExcerpt({ title: 'title' })).toBeFalsy()
            expect(isContentfulPostExcerpt({ excerpt: 'excerpt' })).toBeFalsy()
            expect(isContentfulPostExcerpt({ excerpt: 'excerpt', title: 'title' })).toBeFalsy()
            expect(isContentfulPostExcerpt({ excerpt: 'excerpt', slug: 'slug' })).toBeFalsy()
            expect(isContentfulPostExcerpt({ slug: 'slug', title: 'title' })).toBeFalsy()
        })

        it('should return true for things that are ContentfulPostExcerpt', () => {
            excerptList.forEach((excerpt) => expect(isContentfulPostExcerpt(excerpt)).toBeTruthy())
        })
    })
})
