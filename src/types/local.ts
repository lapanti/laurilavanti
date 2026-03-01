export interface CvRow {
    company?: string
    degree?: string
    duty?: string
    endYear?: number
    location?: string
    organization?: string
    school?: string
    startYear: number
    title?: string
}

export interface TagItem {
    id: string
    name: string
}

export interface TagCollection {
    items: TagItem[]
    limit: number
    skip: number
    sys: { type: 'Array' }
    total: number
}
