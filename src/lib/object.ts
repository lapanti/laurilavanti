import type { WithNonNullableProperties } from '../types/generic'

export const hasNonNullableProperties = <T, K extends keyof T>(
    obj: T | null,
    ...keys: readonly K[]
): obj is WithNonNullableProperties<T, K> =>
    obj !== null && obj !== undefined && keys.every((key) => obj[key] !== null && obj[key] !== undefined)
