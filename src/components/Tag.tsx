import React from 'react'

import { WEBPAGE } from '../types/jsonld'
import ExcerptList from './ExcerptList'
import HR from './HR'
import Layout from './Layout'

interface Props {
    pageContext: {
        tag: string
    }
}

const Tag = ({ pageContext: { tag } }: Props): JSX.Element => (
    <Layout title={tag.replace(/^\w/, (c) => c.toUpperCase())} pathname={`/blogi/${tag}`} type={WEBPAGE}>
        <HR />
        <ExcerptList tag={tag} />
    </Layout>
)

export default Tag
