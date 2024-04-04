import type { MainNavLink } from '../../../types/contentful'

import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import { breakpoints, colors, sizes, zIndices } from '../../../lib/styles'
import H2 from '../../H2'
import NavLink from './NavLink'

const Heading = styled(Link)({
    marginRight: 'auto',
})

interface Props {
    className?: string
    links: MainNavLink[]
}

const DesktopNavigationComponent = ({ className, links }: Props): JSX.Element => {
    return (
        <header className={className}>
            <Heading to="/">
                <H2>Lauri Lavanti</H2>
            </Heading>
            {links.map((nav) => (
                <NavLink {...nav} key={nav.slug} />
            ))}
        </header>
    )
}

DesktopNavigationComponent.displayName = 'DesktopNavigation'

const DesktopNavigation = styled(DesktopNavigationComponent)({
    display: 'none',

    [breakpoints[750].min]: {
        display: 'flex',
        padding: sizes[4],
        backgroundColor: colors.white75,
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: sizes[6],
        boxSizing: 'border-box',
        width: '100%',
        position: 'fixed',
        zIndex: zIndices[50],
        userSelect: 'none',
    },
})

export default DesktopNavigation
