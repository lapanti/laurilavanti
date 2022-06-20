import React, { useMemo } from 'react'
import tw from 'twin.macro'

import InternalLink from './InternalLink'

const MINUTE_IN_MS = 60000 // 60 seconds * 1000 ms

const MetaContainer = tw.div`
    flex flex-row mb-2
`

const Meta = tw.span`
    flex flex-row items-center mr-4 last:mr-0
`

const Svg = tw.svg`
    h-4.5 w-4.5 inline-block fill-current mr-2 flex-shrink-0
`

const TagList = tw.ul`
    flex flex-row
`

const TagItem = tw.li`
    mr-4 last:mr-0
`

export interface PostMetaProps {
    date: string
    readingTime?: number
    tags: string[]
}

interface Props extends PostMetaProps {
    className?: string
}

const PostMetaComponent = ({ className, date, readingTime, tags }: Props): JSX.Element => {
    const readTimeString = useMemo(() => {
        if (!readingTime) return ''

        const readTimeMinutes = Math.floor(readingTime / MINUTE_IN_MS)
        return `${readingTime % MINUTE_IN_MS === 0 ? '' : readTimeMinutes < 1 ? 'alle' : 'noin '}${
            readTimeMinutes < 1 ? '' : readTimeMinutes
        } minuutti${readTimeMinutes <= 1 ? '' : 'a'}`
    }, [readingTime])

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
                {readTimeString && (
                    <Meta>
                        <Svg>
                            <use xlinkHref="#icon-clock" />
                        </Svg>
                        <span>{readTimeString}</span>
                    </Meta>
                )}
            </MetaContainer>
            <TagList>
                {tags.map((tag) => (
                    <TagItem key={tag}>
                        <InternalLink to={`/blogi/${tag}`}>#{tag}</InternalLink>
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
