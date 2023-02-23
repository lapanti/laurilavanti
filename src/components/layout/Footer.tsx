import type { FooterNav } from '../../types/contentful'

import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import tw from 'twin.macro'

const List = tw.ul`
    flex flex-row items-center justify-center gap-6
`

const Item = tw.li`
    p-0
`

const Link = tw.a`
    flex items-center justify-center h-full
`

const Svg = tw.svg`
    text-gray h-9 w-9 transition
`

const Facebook = tw(Svg)`
   hover:fill-fb focus:fill-fb
`

const Twitter = tw(Svg)`
    hover:fill-twitter focus:fill-twitter
`

const LinkedIn = tw(Svg)`
    hover:fill-linkedin focus:fill-linkedin
`

interface Props {
    className?: string
}

const FooterComponent = ({ className }: Props): JSX.Element => {
    const data = useStaticQuery<{ contentfulFooterNav: FooterNav }>(graphql`
        {
            contentfulFooterNav(titleToBeIgnored: { eq: "Footer nav" }) {
                links {
                    contentful_id
                    title
                    url
                    icon
                }
            }
        }
    `)

    return (
        <footer className={className}>
            <List>
                {data.contentfulFooterNav.links.map((link) => (
                    <Item key={link.title}>
                        <Link href={link.url} title={link.title} target="_blank" rel="noopener noreferrer">
                            {link.icon === 'facebook' && (
                                <Facebook>
                                    <use xlinkHref="#icon-facebook" />
                                </Facebook>
                            )}
                            {link.icon === 'twitter' && (
                                <Twitter>
                                    <use xlinkHref="#icon-twitter" />
                                </Twitter>
                            )}
                            {link.icon === 'linkedin' && (
                                <LinkedIn>
                                    <use xlinkHref="#icon-linkedin" />
                                </LinkedIn>
                            )}
                        </Link>
                    </Item>
                ))}
            </List>
        </footer>
    )
}

FooterComponent.displayName = 'Footer'

const Footer = tw(FooterComponent)`
    grid-in-footer bg-greenDarkBackground text-white flex flex-col items-center justify-center h-full
`

export default Footer
