import React from 'react'

import ExcerptList from './ExcerptList'
import HR from './HR'
import Page from './Page'

interface Props {
    pageContext: {
        tag: string
    }
}

const Tag = ({ pageContext: { tag } }: Props): JSX.Element => {
    return (
        <Page title={tag.replace(/^\w/, (c) => c.toUpperCase())}>
            <HR />
            <ExcerptList tag={tag} />
        </Page>
    )
}

export default Tag
