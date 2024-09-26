import React, { useMemo } from 'react'
import { FaRegCalendarDays } from 'react-icons/fa6'
import styled from 'styled-components'

import { sizes } from '../lib/styles'
import InternalLink from './InternalLink'

const MetaContainer = styled.div({
    display: 'flex',
    flexDirection: 'row',
})

const Meta = styled.span({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: sizes[1],
    ':last-child': {
        marginRight: sizes[0],
    },
})

const CalendarIcon = styled(FaRegCalendarDays)({
    height: sizes[1.125],
    widht: sizes[1.125],
    display: 'inline-block',
    marginRight: sizes[0.5],
    flexShrink: 0,
})

const TagList = styled.ul({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: sizes[0.5],
})

const TagItem = styled.li({
    marginRight: sizes[1],
    ':last-child': {
        marginRight: sizes[0],
    },
})

export interface PostMetaProps {
    date: string
    tags: string[]
    ariaLabel: string
}

interface Props extends PostMetaProps {
    className?: string
}

const PostMetaComponent = ({ className, date, tags, ariaLabel }: Props): JSX.Element => {
    const dateAsDateTime = useMemo(() => {
        const [day, month, year] = date.split('.')
        return `${year}-${month}-${day}`
    }, [date])

    return (
        <aside className={className} aria-label={ariaLabel}>
            <MetaContainer>
                <Meta>
                    <CalendarIcon />
                    <time dateTime={dateAsDateTime}>{date}</time>
                </Meta>
            </MetaContainer>
            {tags.length > 0 && (
                <TagList>
                    {tags.map((tag) => (
                        <TagItem key={tag}>
                            <InternalLink to={`/kategoria/${tag}/`}>#{tag}</InternalLink>
                        </TagItem>
                    ))}
                </TagList>
            )}
        </aside>
    )
}

PostMetaComponent.displayName = 'PostMeta'

const PostMeta = styled(PostMetaComponent)({
    display: 'flex',
    flexDirection: 'column',
})

export default PostMeta
