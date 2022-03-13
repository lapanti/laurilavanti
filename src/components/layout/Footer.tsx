import React from 'react'
import tw from 'twin.macro'

import H2 from '../H2'

const StyledH2 = tw(H2)`
    mt-4
`

const List = tw.ul`
    flex flex-row items-center justify-center
`

const Item = tw.li`
    p-4.5
`

const Svg = tw.svg`
    fill-current text-lightGrey h-9 w-9 transition
`

const Facebook = tw(Svg)`
    hover:text-fb focus:text-fb
`

const Twitter = tw(Svg)`
    hover:text-twitter focus:text-twitter
`

const LinkedIn = tw(Svg)`
    hover:text-linkedin focus:text-linkedin
`

interface Props {
    className?: string
}

const FooterComponent = ({ className }: Props): JSX.Element => (
    <footer className={className}>
        {/*
            <a
                href="https://vaalit.vihreat.fi/api/share/5209?redirect_to=https%3A%2F%2Fwww.vihreat.fi%2Fehdokkaat%2F%3Fkieli%3Dfi%26vaali%3Daluevaalit-2022%26alue%3Dlnsi-uusimaa%26ehdokas%3Dlavanti-lauri-5209"
                target="_blank"
                rel="noopener noreferrer"
            >
                <StyledH2>Lahjoita!</StyledH2>
            </a>
            */}
        <List>
            <Item>
                <a
                    href="https://www.facebook.com/laurilavanti/"
                    title="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Facebook>
                        <use xlinkHref="#icon-facebook" />
                    </Facebook>
                </a>
            </Item>
            <Item>
                <a href="https://twitter.com/laurilavanti" target="_blank" title="Twitter" rel="noopener noreferrer">
                    <Twitter>
                        <use xlinkHref="#icon-twitter" />
                    </Twitter>
                </a>
            </Item>
            <Item>
                <a
                    href="https://www.linkedin.com/in/lapanti/"
                    target="_blank"
                    title="LinkedIn"
                    rel="noopener noreferrer"
                >
                    <LinkedIn>
                        <use xlinkHref="#icon-linkedin" />
                    </LinkedIn>
                </a>
            </Item>
        </List>
    </footer>
)

FooterComponent.displayName = 'Footer'

const Footer = tw(FooterComponent)`
    grid-in-footer bg-forestGreen text-white flex flex-col items-center justify-center h-full
`

export default Footer
