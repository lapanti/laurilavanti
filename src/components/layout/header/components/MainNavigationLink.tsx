import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { colors, fontFamilies, fontSizes } from '../../../../lib/styles'
import InternalLink from '../../../InternalLink'

interface Props {
    className?: string
    hideIfCurrent?: boolean
    isFrontPage?: boolean
}

const MainNavigationLinkComponent = ({ className, hideIfCurrent }: Props): JSX.Element => {
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
        <InternalLink
            $color={colors.peach}
            activeStyle={hideIfCurrent ? { visibility: 'hidden' } : undefined}
            className={className}
            title={title}
            to="/"
        >
            {title}
        </InternalLink>
    )
}

MainNavigationLinkComponent.displayName = 'MainNavigationLink'

const MainNavigationLink = styled(MainNavigationLinkComponent)(
    {
        ...fontSizes[1.75],
        fontFamily: fontFamilies.heading,
    },
    ({ isFrontPage }) => (isFrontPage ? { ...fontSizes[3] } : {})
)

export default MainNavigationLink
