/**
 * Helper function, that returns value, if it is defined and not an empty string,
 * otherwise returns given default value
 */
export const getValueOrDefault = (value?: string, defaultValue?: string): string | undefined => {
    if (!value || value === '') return defaultValue

    return value
}
