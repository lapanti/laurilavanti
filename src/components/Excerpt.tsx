import type { ImageDataLike } from 'gatsby-plugin-image'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useMemo } from 'react'
import tw from 'twin.macro'

import Link from './Link'

const MINUTE_IN_MS = 60000 // 60 seconds * 1000 ms

const TitleLink = tw.a`
    hover:underline
`

const Image = tw(GatsbyImage)`
    w-full flex h-24 object-cover
`

const H2 = tw.h2`
    font-bold text-accent text-xl
`

const Aside = tw.aside`
    flex flex-col
`

const MetaContainer = tw.div`
    flex flex-row mb-2
`

const Meta = tw.span`
    flex flex-row items-center mr-4 last:mr-0
`

const Svg = tw.svg`
    h-4.5 w-4.5 inline-block fill-current mr-2 flex-shrink-0
`

const CategoryList = tw.ul`
    flex flex-row
`

const CategoryItem = tw.li`
    mr-4 last:mr-0
`

const Paragraph = tw.p`
    text-base my-4
`

interface Props {
    className?: string
    title: string
    date: string
    excerpt: string
    categories: string[]
    image: ImageDataLike
    readingTime: number
    slug: string
}

const ExcerptComponent = ({
    className,
    title,
    date,
    excerpt,
    categories,
    image: imageData,
    readingTime,
    slug,
}: Props): JSX.Element => {
    const image = getImage(imageData)

    const readTimeString = useMemo(() => {
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
        <article className={className} itemScope itemType="https://schema.org/CreativeWork">
            <TitleLink href={slug} rel="permalink">
                {image && <Image image={image} alt={title} />}
                <H2 itemProp="headline">{title}</H2>
            </TitleLink>
            <Aside>
                <MetaContainer>
                    <Meta>
                        <Svg>
                            <use xlinkHref="#icon-calendar-alt" />
                        </Svg>
                        <time dateTime={dateAsDateTime}>{date}</time>
                    </Meta>
                    <Meta>
                        <Svg>
                            <use xlinkHref="#icon-clock" />
                        </Svg>
                        <span>{readTimeString}</span>
                    </Meta>
                </MetaContainer>
                <CategoryList>
                    {categories.map((category) => (
                        <CategoryItem key={category}>
                            <Link href={`/blogi/${category}`}>#{category}</Link>
                        </CategoryItem>
                    ))}
                </CategoryList>
            </Aside>
            <Paragraph itemProp="description">{excerpt}</Paragraph>
        </article>
    )
}

ExcerptComponent.displayName = 'Excerpt'

const Excerpt = tw(ExcerptComponent)``

export default Excerpt
