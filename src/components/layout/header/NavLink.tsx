import type { MainNavLink } from '../../../types/contentful'

import React from 'react'
import styled from 'styled-components'

import { colors, fontSizes } from '../../../lib/styles'
import InternalLink from '../../InternalLink'

interface Props extends MainNavLink {
    className?: string
}

const NavLinkComponent = ({ className, title, slug }: Props): JSX.Element => (
    <InternalLink
        className={className}
        partiallyActive={slug !== 'index'}
        activeStyle={{ textDecoration: 'underline', color: 'rgb(0, 104, 69)' }}
        to={slug === 'index' ? '/' : `/${slug}/`}
    >
        {title === 'Lauri Lavanti' ? 'Etusivu' : title}
    </InternalLink>
)

NavLinkComponent.displayName = 'NavLink'

const NavLink = styled(NavLinkComponent)({
    color: colors.black,
    ...fontSizes['3xl'],

    ':hover, :active': {
        color: colors.greenDarkText,
    },
})

export default NavLink
