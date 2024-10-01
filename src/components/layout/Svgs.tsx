import React from 'react'

const Svgs = (): JSX.Element => (
    <svg
        aria-hidden="true"
        style={{
            position: 'absolute',
            width: 0,
            height: 0,
            overflow: 'hidden',
        }}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <defs>
            <svg height="0" width="0">
                <radialGradient cx="30%" cy="107%" id="instagram-gradient" r="150%">
                    <stop offset="0" stopColor="#fdf497" />
                    <stop offset="0.05" stopColor="#fdf497" />
                    <stop offset="0.45" stopColor="#fd5949" />
                    <stop offset="0.6" stopColor="#d6249f" />
                    <stop offset="0.9" stopColor="#285AEB" />
                </radialGradient>
            </svg>
            <symbol id="logo" viewBox="0 0 600 600">
                <g>
                    <title>Lauri lavanti</title>
                    <rect fill="#045a1c" height="600" id="svg_2" rx="50" width="600" x="0" y="0" />
                    <text
                        fill="#ffffff"
                        fontFamily="Times New Roman"
                        fontSize="24"
                        fontStyle="normal"
                        fontWeight="400"
                        id="svg_1"
                        stroke="#ffffff"
                        textAnchor="start"
                        transform="matrix(22.2798, 0, 0, 22.2798, -4774.17, -4448.06)"
                        x="217.25434"
                        xmlSpace="preserve"
                        y="221.21152"
                    >
                        L²
                    </text>
                </g>
            </symbol>
        </defs>
    </svg>
)

export default Svgs
