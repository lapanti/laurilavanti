import type { FooterNav } from '../../types/contentful'

import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { breakpoints, colors, CONTENT_PADDING, CONTENT_SIZE, gridAreas, sizes } from '../../lib/styles'
import FooterLink from './footer/FooterLink'

const ImageContainer = styled.div({})

const List = styled.ul({
    gap: sizes[1.5],
    justifyContent: 'center',
})

const ContentContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: sizes[1.5],

    [`> ${ImageContainer}, > ${List}`]: {
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    [breakpoints[1200].min]: {
        flexDirection: 'row',
        paddingLeft: CONTENT_PADDING,
        paddingRight: CONTENT_PADDING,
        width: CONTENT_SIZE,
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
                        objectFit="contain"
                        src="../../../static/images/Vihreat_Logo_HOR_NEG_FIN_SWE_ENG.png"
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
    alignItems: 'center',
    backgroundColor: colors.evening,
    color: colors.white,
    display: 'flex',
    gridArea: gridAreas.footer,
    justifyContent: 'center',
})

export default Footer
