import React from 'react'

const MAIN_NAV = [
    {
        title: 'Minusta',
        url: '/minusta',
    },
    {
        title: 'Blogi',
        url: '/blogi',
    },
    {
        title: 'Ota yhteyttä',
        url: '/ota-yhteytta',
    },
]

const Header = (): JSX.Element => (
    <header>
        <nav>
            <a href="/">
                <svg>
                    <use xlinkHref="#logo" />
                </svg>
                <span>Lauri Lavanti</span>
            </a>
            <ul>
                {MAIN_NAV.map((nav) => (
                    <li key={nav.url}>
                        <a href={nav.url}>{nav.title}</a>
                    </li>
                ))}
            </ul>
        </nav>
    </header>
)

export default Header
