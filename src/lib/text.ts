/** U+00AD SOFT HYPHEN — a rendering hint for where long words may break. */
const SOFT_HYPHEN = /­/g

/**
 * Removes soft hyphens from a string.
 *
 * Titles and tag names carry soft hyphens so long compounds break at sensible
 * points in display type. They are invisible in a browser, but in machine-read
 * output (llms.txt, RSS) they are literal characters that break string matching
 * for anything quoting the text. Strip them at those serialization boundaries.
 */
export const stripSoftHyphens = (value: string): string => value.replace(SOFT_HYPHEN, '')
