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
            <svg width="0" height="0">
                <radialGradient id="instagram-gradient" r="150%" cx="30%" cy="107%">
                    <stop stopColor="#fdf497" offset="0" />
                    <stop stopColor="#fdf497" offset="0.05" />
                    <stop stopColor="#fd5949" offset="0.45" />
                    <stop stopColor="#d6249f" offset="0.6" />
                    <stop stopColor="#285AEB" offset="0.9" />
                </radialGradient>
            </svg>
            <symbol id="logo" viewBox="0 0 600 600">
                <g>
                    <title>Lauri lavanti</title>
                    <rect rx="50" id="svg_2" height="600" width="600" y="0" x="0" fill="#045a1c" />
                    <text
                        fontWeight="400"
                        fontStyle="normal"
                        transform="matrix(22.2798, 0, 0, 22.2798, -4774.17, -4448.06)"
                        xmlSpace="preserve"
                        textAnchor="start"
                        fontFamily="Times New Roman"
                        fontSize="24"
                        id="svg_1"
                        y="221.21152"
                        x="217.25434"
                        stroke="#ffffff"
                        fill="#ffffff"
                    >
                        L²
                    </text>
                </g>
            </symbol>
        </defs>
    </svg>
)

export default Svgs
