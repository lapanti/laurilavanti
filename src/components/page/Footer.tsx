import React from 'react'

const Footer = (): JSX.Element => (
    <footer>
        <ul>
            <li>
                <a href="https://www.facebook.com/laurilavanti/" target="_blank" rel="noopener noreferrer">
                    <svg>
                        <use xlinkHref="#icon-facebook" />
                    </svg>
                </a>
            </li>
            <li>
                <a href="https://twitter.com/laurilavanti" target="_blank" rel="noopener noreferrer">
                    <svg>
                        <use xlinkHref="#icon-twitter" />
                    </svg>
                </a>
            </li>
            <li>
                <a href="https://www.linkedin.com/in/lapanti/" target="_blank" rel="noopener noreferrer">
                    <svg>
                        <use xlinkHref="#icon-linkedin" />
                    </svg>
                </a>
            </li>
        </ul>
    </footer>
)

export default Footer
