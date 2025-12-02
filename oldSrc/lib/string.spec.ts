import { getValueOrDefault } from './string'

describe('string lib', () => {
    describe('getValueOrDefault', () => {
        const value = 'value'
        const defaultValue = 'defaultValue'

        it('should return value when it is defined', () => {
            expect(getValueOrDefault(value, defaultValue)).toEqual(value)
        })

        it('should return default value when value is empty string', () => {
            expect(getValueOrDefault('', defaultValue)).toEqual(defaultValue)
        })

        it('should return default value when value is undefined', () => {
            expect(getValueOrDefault(undefined, defaultValue)).toEqual(defaultValue)
        })

        it('should return default value when value is null', () => {
            expect(getValueOrDefault(null, defaultValue)).toEqual(defaultValue)
        })
    })
})
