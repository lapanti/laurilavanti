import type { FooterNav } from '../../types/contentful'

import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaMastodon, FaXTwitter } from 'react-icons/fa6'
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

const Facebook = tw(FaFacebook)`
    fill-gray h-9 w-9 transition hover:fill-fb focus:fill-fb
`

const XTwitter = tw(FaXTwitter)`
    h-9 w-9 transition hover:fill-black focus:fill-black
`

const Instagram = tw(FaInstagram)`
    h-9 w-9 transition hover:fill-[url(#instagram-gradient)] focus:fill-[url(#instagram-gradient)]
`

const LinkedIn = tw(FaLinkedin)`
    h-9 w-9 transition hover:fill-linkedin focus:fill-linkedin
`

const Mastodon = tw(FaMastodon)`
    h-9 w-9 transition hover:fill-mastodon focus:fill-mastodon
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
                        <Link href={link.url} title={link.title} target="_blank" rel="me noopener noreferrer">
                            {link.icon === 'facebook' && <Facebook />}
                            {link.icon === 'twitter' && <XTwitter />}
                            {link.icon === 'instagram' && <Instagram />}
                            {link.icon === 'linkedin' && <LinkedIn />}
                            {link.icon === 'mastodon' && <Mastodon />}
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
