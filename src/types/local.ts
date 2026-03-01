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

export interface TagLink {
    id: string
    linkType: 'Tag'
    type: 'Link'
}

export interface TagItem {
    name: string
    sys: {
        createdAt: string
        id: string
        type: 'Tag'
        updatedAt: string
        version: number
        visibility: 'public'
    }
}

export interface TagCollection {
    items: TagItem[]
    limit: number
    skip: number
    sys: { type: 'Array' }
    total: number
}
