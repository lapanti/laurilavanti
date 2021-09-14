import React from 'react'
import tw from 'twin.macro'

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
        <List>
            <Item>
                <a href="https://www.facebook.com/laurilavanti/" target="_blank" rel="noopener noreferrer">
                    <Facebook>
                        <use xlinkHref="#icon-facebook" />
                    </Facebook>
                </a>
            </Item>
            <Item>
                <a href="https://twitter.com/laurilavanti" target="_blank" rel="noopener noreferrer">
                    <Twitter>
                        <use xlinkHref="#icon-twitter" />
                    </Twitter>
                </a>
            </Item>
            <Item>
                <a href="https://www.linkedin.com/in/lapanti/" target="_blank" rel="noopener noreferrer">
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
