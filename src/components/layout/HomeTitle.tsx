import React from 'react'
import tw from 'twin.macro'

const List = tw.dl` flex flex-col items-end my-6`

const Term = tw.dt` self-start`

interface Props {
    className?: string
}

const HomeTitleComponent = ({ className }: Props) => (
    <div className={className}>
        <List>
            <Term aria-label="Lauri Lavanti">
                <h1>Lauri Lavanti</h1>
            </Term>
            <dd aria-label="Isä">Isä</dd>
            <dd aria-label="Kirkkonummelainen">Kirkkonummelainen</dd>
            <dd aria-label="Ohjelmistokehittäjä">Ohjelmistokehittäjä</dd>
            <dd aria-label="Diplomi-insinööri">Diplomi-insinööri</dd>
        </List>
    </div>
)

HomeTitleComponent.displayName = 'HomeTitle'

const HomeTitle = tw(HomeTitleComponent)`
    text-3xl text-accent font-bold col-start-3
`

export default HomeTitle
