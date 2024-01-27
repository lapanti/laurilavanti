import { hasNonNullableProperties } from './object'

describe('object lib', () => {
    describe('hasNonNullableProperties', () => {
        it('should return false for null as object', () => {
            expect(hasNonNullableProperties(null)).toBeFalsy()
        })

        it('should return false for undefined as object', () => {
            expect(hasNonNullableProperties(undefined)).toBeFalsy()
        })

        it('should return false when all given keys are null or undefined', () => {
            expect(hasNonNullableProperties({ key: null }, 'key')).toBeFalsy()
            expect(hasNonNullableProperties({ key: undefined }, 'key')).toBeFalsy()
            expect(hasNonNullableProperties({ key: null, yek: undefined }, 'key', 'yek')).toBeFalsy()
            expect(hasNonNullableProperties({ key: undefined, yek: null }, 'key', 'yek')).toBeFalsy()
        })

        it('should return false when at least one of given keys is null or undefined', () => {
            expect(hasNonNullableProperties({ key: true, yek: undefined }, 'key', 'yek')).toBeFalsy()
            expect(hasNonNullableProperties({ key: null, yek: 1 }, 'key', 'yek')).toBeFalsy()
        })

        it('should return true when all given keys are not null or undefined', () => {
            expect(
                hasNonNullableProperties(
                    { key: false, yek: true, eyk: 0, eky: 1, yke: '', ke: 'key' },
                    'key',
                    'yek',
                    'eyk',
                    'eky',
                    'yke',
                    'ke'
                )
            ).toBeTruthy()
        })

        it('should return true when given keys are not null or undefined, even if non-given keys are null or undefined', () => {
            expect(
                hasNonNullableProperties(
                    { key: false, yek: true, eyk: 0, eky: 1, yke: '', ke: 'key', kek: null, eke: undefined },
                    'key',
                    'yek',
                    'eyk',
                    'eky',
                    'yke',
                    'ke'
                )
            ).toBeTruthy()
        })
    })
})
