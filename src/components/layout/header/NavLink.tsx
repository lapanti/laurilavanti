import type { MainNav } from '../../../types/contentful'

import React from 'react'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { colors, fontFamilies, fontSizes } from '../../../lib/styles'
import InternalLink from '../../InternalLink'

type Link = Omit<MainNav['links'][number], 'contentful_id'>

interface Props extends Link {
    className?: string
    isFrontPage?: boolean
}

const NavLinkComponent = ({ className, title, slug, isFrontPage }: Props): JSX.Element => (
    <InternalLink
        $color={colors.peach}
        activeStyle={isFrontPage ? undefined : { textDecoration: 'underline' }}
        className={className}
        partiallyActive={slug !== 'index'}
        to={slug === 'index' ? '/' : `/${slug}/`}
    >
        {title}
    </InternalLink>
)

NavLinkComponent.displayName = 'NavLink'

const NavLink = styled(NavLinkComponent)(({ isFrontPage }) => ({
    ...(isFrontPage ? fontSizes[1.75] : fontSizes[1.5]),
    fontFamily: isFrontPage ? fontFamilies.heading : fontFamilies.sans,
}))

export default NavLink
