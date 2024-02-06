/**
 * Helper function, that returns value, if it is defined and not an empty string,
 * otherwise returns given default value
 */
export const getValueOrDefault = (value?: string | null, defaultValue?: string | null): string | undefined => {
    if (!value || value === '') {
        if (defaultValue === null) return undefined

        return defaultValue
    }

    return value
}
