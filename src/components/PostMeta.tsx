import { useMemo } from 'react'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { sizes } from '../lib/styles'
import InternalLink from './InternalLink'

const TagList = styled.ul({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: sizes[0.5],
})

const TagItem = styled.li({
    ':last-child': {
        marginRight: sizes[0],
    },

    marginRight: sizes[1],
})

interface PostMetaProps {
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
        <aside aria-label={ariaLabel} className={className}>
            <time dateTime={dateAsDateTime}>{date}</time>
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
