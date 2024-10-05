import type { FooterNav } from '../../types/contentful'

import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'

import { breakpoints, colors, CONTENT_PADDING, CONTENT_SIZE, gridAreas, sizes } from '../../lib/styles'
import FooterLink from './footer/FooterLink'

const ImageContainer = styled.div({})

const List = styled.ul({
    justifyContent: 'center',
    gap: sizes[1.5],
})

const ContentContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: sizes[1.5],

    [`> ${ImageContainer}, > ${List}`]: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    [breakpoints[1200].min]: {
        width: CONTENT_SIZE,
        paddingLeft: CONTENT_PADDING,
        paddingRight: CONTENT_PADDING,
        flexDirection: 'row',
        [`> ${ImageContainer}`]: {
            justifyContent: 'flex-start',
        },
        [`> ${List}`]: {
            justifyContent: 'flex-end',
        },
    },
})

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
            <ContentContainer>
                <ImageContainer>
                    <StaticImage
                        alt='Vihreiden logo ja teksti "Vihreät De Gröna"'
                        backgroundColor="transparent"
                        src="../../../static/images/Vihreat_Logo_HOR_NEG_FIN_SWE.png"
                        transformOptions={{ fit: 'contain' }}
                        width={200}
                    />
                </ImageContainer>
                <List>
                    {data.contentfulFooterNav.links.map((link) => (
                        <FooterLink key={link.title} link={link} />
                    ))}
                </List>
            </ContentContainer>
        </footer>
    )
}

FooterComponent.displayName = 'Footer'

const Footer = styled(FooterComponent)({
    gridArea: gridAreas.footer,
    backgroundColor: colors.evening,
    color: colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

export default Footer
