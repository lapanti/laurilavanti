import type { ImageDataLike } from 'gatsby-plugin-image'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import tw from 'twin.macro'

interface Props {
    className?: string
    link: string
    imageData: ImageDataLike
    imageAlt: string
    title: string
    date: string
    readingTime: string
    categories: string[]
    shortDescription: string
}

const ExcerptComponent = ({
    className,
    link,
    imageData,
    imageAlt,
    title,
    date,
    readingTime,
    categories,
    shortDescription,
}: Props): JSX.Element => {
    const image = getImage(imageData)
    return (
        <article className={className} itemScope="" itemType="https://schema.org/CreativeWork">
            <a href={link} rel="permalink">
                {image && <GatsbyImage image={image} alt={imageAlt} />}
                <h2 itemProp="headline">{title}</h2>
            </a>
            <aside>
                <div>
                    <span>
                        <svg>
                            <use xlinkHref="#icon-calendar-alt" />
                        </svg>
                        <time dateTime={date}>{date}</time>
                    </span>
                    <span>
                        <svg>
                            <use xlinkHref="#icon-clock" />
                        </svg>
                        <span>{readingTime}</span>
                    </span>
                </div>
                <ul>
                    {categories.map((category) => (
                        <li key={category}>#{category}</li>
                    ))}
                </ul>
            </aside>
            <p itemProp="description">{shortDescription}</p>
        </article>
    )
}

ExcerptComponent.displayName = 'Excerpt'

const Excerpt = tw(ExcerptComponent)``

export default Excerpt
