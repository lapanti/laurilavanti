import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { colors, fontSizes, typographics } from '../../../../lib/styles'
import InternalLink from '../../../InternalLink'

interface Props {
    className?: string
}

const MainNavigationLinkComponent = ({ className }: Props): JSX.Element => {
    const {
        site: {
            siteMetadata: { title },
        },
    } = useStaticQuery<{ site: { siteMetadata: { title: string } } }>(graphql`
        {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    return (
        <InternalLink $color={colors.peach} className={className} title={title} to="/">
            {title}
        </InternalLink>
    )
}

MainNavigationLinkComponent.displayName = 'MainNavigationLink'

const MainNavigationLink = styled(MainNavigationLinkComponent)({
    ...typographics.h1,
    ...fontSizes[1.75],
})

export default MainNavigationLink
