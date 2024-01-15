import type { FooterNav } from '../../types/contentful'

import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import { colors, gridAreas, sizes } from '../../lib/styles'
import FooterLink from './footer/FooterLink'

const List = styled.ul({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizes[6],
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
            <List>
                {data.contentfulFooterNav.links.map((link) => (
                    <FooterLink key={link.title} link={link} />
                ))}
            </List>
        </footer>
    )
}

FooterComponent.displayName = 'Footer'

const Footer = styled(FooterComponent)({
    gridArea: gridAreas.footer,
    backgroundColor: colors.greenDarkBackground,
    color: colors.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
})

export default Footer
