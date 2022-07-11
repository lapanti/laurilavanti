import React from 'react'
import tw from 'twin.macro'

const Svg = tw.svg`
    h-8 w-8
`

interface Props {
    className?: string
}

const HeaderComponent = ({ className }: Props): JSX.Element => {
    return (
        <header className={className}>
            <Svg>
                <use xlinkHref="#icon-bars" />
            </Svg>
        </header>
    )
}

HeaderComponent.displayName = 'Header'

const Header = tw(HeaderComponent)`
  flex items-center justify-center box-border h-14 w-14 ml-auto bg-opacity-75 rounded-sm bg-white fixed mt-2 mr-2 top-2 right-2 z-50
`

export default Header
