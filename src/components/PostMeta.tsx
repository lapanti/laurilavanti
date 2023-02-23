import React, { useMemo } from 'react'
import tw from 'twin.macro'

import InternalLink from './InternalLink'

const MetaContainer = tw.div`
    flex flex-row mb-2
`

const Meta = tw.span`
    flex flex-row items-center mr-4 last:mr-0
`

const Svg = tw.svg`
    h-4.5 w-4.5 inline-block mr-2 flex-shrink-0
`

const TagList = tw.ul`
    flex flex-row flex-wrap
`

const TagItem = tw.li`
    mr-4 last:mr-0
`

export interface PostMetaProps {
    date: string
    tags: string[]
}

interface Props extends PostMetaProps {
    className?: string
}

const PostMetaComponent = ({ className, date, tags }: Props): JSX.Element => {
    const dateAsDateTime = useMemo(() => {
        const [day, month, year] = date.split('.')
        return `${year}-${month}-${day}`
    }, [date])

    return (
        <aside className={className}>
            <MetaContainer>
                <Meta>
                    <Svg>
                        <use xlinkHref="#icon-calendar-alt" />
                    </Svg>
                    <time dateTime={dateAsDateTime}>{date}</time>
                </Meta>
            </MetaContainer>
            <TagList>
                {tags.map((tag) => (
                    <TagItem key={tag}>
                        <InternalLink to={`/kategoria/${tag}/`}>#{tag}</InternalLink>
                    </TagItem>
                ))}
            </TagList>
        </aside>
    )
}

PostMetaComponent.displayName = 'PostMeta'

const PostMeta = tw(PostMetaComponent)`
    flex flex-col
`

export default PostMeta
