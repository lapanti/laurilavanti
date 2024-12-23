import type { MainNav } from '../../../types/contentful'

import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { colors, fontFamilies, fontSizes } from '../../../lib/styles'
import InternalLink from '../../InternalLink'

type Link = Omit<MainNav['links'][number], 'contentful_id'>

interface Props extends Link {
    className?: string
    mainLink?: boolean
    hideIfCurrent?: boolean
}

const NavLinkComponent = ({ className, title, navigationTitle, slug, mainLink, hideIfCurrent }: Props): JSX.Element => (
    <InternalLink
        $color={colors.peach}
        activeStyle={hideIfCurrent ? { visibility: 'hidden' } : mainLink ? undefined : { textDecoration: 'underline' }}
        className={className}
        partiallyActive={slug !== 'index'}
        title={title}
        to={slug === 'index' ? '/' : `/${slug}/`}
    >
        {navigationTitle || title}
    </InternalLink>
)

NavLinkComponent.displayName = 'NavLink'

const NavLink = styled(NavLinkComponent)(({ mainLink }) => ({
    ...(mainLink ? fontSizes[1.75] : fontSizes[1.5]),
    fontFamily: mainLink ? fontFamilies.heading : fontFamilies.sans,
}))

export default NavLink
