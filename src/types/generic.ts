export type WithNonNullableProperties<T, K extends keyof T> = T & {
    [X in K]-?: NonNullable<T[X]>
}
