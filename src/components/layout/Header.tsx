import type { MainNav } from '../../types/contentful'

import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import { breakpoints, colors, sizes, zIndices } from '../../lib/styles'
import NavLink from './header/NavLink'

/** Half of header, only visible in desktop */
const Half = styled.div({
    display: 'none',
    [breakpoints[1200].min]: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: sizes[10],
    },
})

interface Props {
    className?: string
}

const HeaderComponent = ({ className }: Props): JSX.Element => {
    const data = useStaticQuery<{ contentfulMainNav: MainNav }>(graphql`
        {
            contentfulMainNav(titleToBeIgnored: { eq: "Main nav" }) {
                links {
                    contentful_id
                    title
                    slug
                }
            }
        }
    `)

    return (
        <header className={className}>
            <Half>
                <NavLink title="Lauri Lavanti" slug="index" isFrontPage />
            </Half>
            <Half>
                {data.contentfulMainNav.links.map((nav) => (
                    <NavLink {...nav} key={nav.slug} />
                ))}
            </Half>
        </header>
    )
}

HeaderComponent.displayName = 'Header'

const Header = styled(HeaderComponent)({
    backgroundColor: colors.evening,
    color: colors.peach,
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    height: sizes[15],
    width: '100%',
    position: 'fixed',
    zIndex: zIndices[50],
    userSelect: 'none',
})

export default Header
