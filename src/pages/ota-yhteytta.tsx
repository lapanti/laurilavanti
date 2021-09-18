import React from 'react'
import tw from 'twin.macro'

import ExternalLink from '../components/ExternalLink'
import Page from '../components/Page'

const List = tw.ul`
    col-start-3 mt-4
`

const Item = tw.li`
    flex flex-row items-center
`

const Svg = tw.svg`
    w-4 h-4 mr-2 fill-current
`

const RowExternalLink = tw(ExternalLink)`
    flex flex-row items-center
`

const Facebook = tw(Svg)`
    text-fb
`

const Twitter = tw(Svg)`
    text-twitter
`

const Contact = (): JSX.Element => (
    <Page title="Ota yhteyttä">
        <List>
            <Item>
                <Svg>
                    <use xlinkHref="#icon-envelope" />
                </Svg>
                <span>lauri.lavanti@kirkkonummi.fi</span>
            </Item>
            <li>
                <RowExternalLink href="https://www.facebook.com/laurilavanti">
                    <Facebook>
                        <use xlinkHref="#icon-facebook" />
                    </Facebook>
                    <span>Facebook</span>
                </RowExternalLink>
            </li>
            <li>
                <RowExternalLink href="https://twitter.com/laurilavanti">
                    <Twitter>
                        <use xlinkHref="#icon-twitter" />
                    </Twitter>
                    Twitter
                </RowExternalLink>
            </li>
        </List>
    </Page>
)

export default Contact
