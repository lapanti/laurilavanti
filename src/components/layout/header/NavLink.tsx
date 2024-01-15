import type { MainNav } from '../../../types/contentful'

import React from 'react'
import styled from 'styled-components'

import { colors, fontSizes, sizes } from '../../../lib/styles'
import InternalLink from '../../InternalLink'

type Link = MainNav['links'][number]

interface Props extends Link {
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
    width: '100%',
    paddingLeft: sizes[8],
    marginTop: sizes[6],
    color: colors.black,
    ...fontSizes['3xl'],

    ':first-of-type': {
        marginTop: sizes[0],
    },

    ':hover, :active': {
        color: colors.greenDarkText,
    },
})

export default NavLink
