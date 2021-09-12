import React from 'react'

import Footer from './page/Footer'
import Header from './page/Header'

const Page = ({ children }: React.PropsWithChildren<void>): JSX.Element => (
    <html lang="fi">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>

        <body>
            <Header />

            <main>{children}</main>

            <Footer />

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
                    <symbol id="icon-rss" viewBox="0 0 28 32">
                        <path d="M8.005 25.997c0 2.211-1.792 4.003-4.003 4.003s-4.003-1.792-4.003-4.003 1.792-4.003 4.003-4.003 4.003 1.792 4.003 4.003zM18.984 28.951c-0.522-9.662-8.262-17.412-17.934-17.934-0.571-0.031-1.049 0.428-1.049 1v3.004c0 0.526 0.406 0.967 0.93 1.001 6.989 0.455 12.592 6.044 13.048 13.048 0.034 0.525 0.475 0.93 1.001 0.93h3.004c0.572 0 1.031-0.478 1-1.049zM27.999 28.969c-0.525-14.614-12.283-26.441-26.968-26.968-0.564-0.020-1.031 0.436-1.031 1v3.004c0 0.539 0.427 0.978 0.966 1 11.949 0.49 21.539 10.082 22.029 22.029 0.022 0.539 0.461 0.966 1 0.966h3.004c0.565-0 1.021-0.467 1-1.032z" />
                    </symbol>
                    <symbol id="icon-calendar-alt" viewBox="0 0 28 32">
                        <path d="M9.25 18h-2.5c-0.412 0-0.75-0.337-0.75-0.75v-2.5c0-0.412 0.338-0.75 0.75-0.75h2.5c0.412 0 0.75 0.338 0.75 0.75v2.5c0 0.413-0.338 0.75-0.75 0.75zM16 17.25v-2.5c0-0.412-0.338-0.75-0.75-0.75h-2.5c-0.412 0-0.75 0.338-0.75 0.75v2.5c0 0.413 0.338 0.75 0.75 0.75h2.5c0.412 0 0.75-0.337 0.75-0.75zM22 17.25v-2.5c0-0.412-0.337-0.75-0.75-0.75h-2.5c-0.413 0-0.75 0.338-0.75 0.75v2.5c0 0.413 0.337 0.75 0.75 0.75h2.5c0.413 0 0.75-0.337 0.75-0.75zM16 23.25v-2.5c0-0.413-0.338-0.75-0.75-0.75h-2.5c-0.412 0-0.75 0.337-0.75 0.75v2.5c0 0.413 0.338 0.75 0.75 0.75h2.5c0.412 0 0.75-0.337 0.75-0.75zM10 23.25v-2.5c0-0.413-0.338-0.75-0.75-0.75h-2.5c-0.412 0-0.75 0.337-0.75 0.75v2.5c0 0.413 0.338 0.75 0.75 0.75h2.5c0.412 0 0.75-0.337 0.75-0.75zM22 23.25v-2.5c0-0.413-0.337-0.75-0.75-0.75h-2.5c-0.413 0-0.75 0.337-0.75 0.75v2.5c0 0.413 0.337 0.75 0.75 0.75h2.5c0.413 0 0.75-0.337 0.75-0.75zM28 7v22c0 1.656-1.344 3-3 3h-22c-1.656 0-3-1.344-3-3v-22c0-1.656 1.344-3 3-3h3v-3.25c0-0.412 0.338-0.75 0.75-0.75h2.5c0.412 0 0.75 0.338 0.75 0.75v3.25h8v-3.25c0-0.412 0.337-0.75 0.75-0.75h2.5c0.413 0 0.75 0.338 0.75 0.75v3.25h3c1.656 0 3 1.344 3 3zM25 28.625v-18.625h-22v18.625c0 0.206 0.169 0.375 0.375 0.375h21.25c0.206 0 0.375-0.169 0.375-0.375z" />
                    </symbol>
                    <symbol id="icon-clock" viewBox="0 0 32 32">
                        <path d="M16 0.5c-8.563 0-15.5 6.938-15.5 15.5s6.938 15.5 15.5 15.5 15.5-6.938 15.5-15.5-6.938-15.5-15.5-15.5zM16 28.5c-6.906 0-12.5-5.594-12.5-12.5s5.594-12.5 12.5-12.5 12.5 5.594 12.5 12.5-5.594 12.5-12.5 12.5zM19.863 21.975l-5.306-3.856c-0.194-0.144-0.306-0.369-0.306-0.606v-10.262c0-0.412 0.338-0.75 0.75-0.75h2c0.413 0 0.75 0.338 0.75 0.75v8.856l4.175 3.038c0.337 0.244 0.406 0.712 0.163 1.050l-1.175 1.619c-0.244 0.331-0.712 0.406-1.050 0.163z" />
                    </symbol>
                    <symbol id="icon-facebook" viewBox="0 0 32 32">
                        <path d="M31.5 16c0-8.563-6.938-15.5-15.5-15.5s-15.5 6.938-15.5 15.5c0 7.736 5.668 14.149 13.078 15.313v-10.832h-3.938v-4.481h3.938v-3.415c0-3.884 2.313-6.030 5.854-6.030 1.696 0 3.47 0.303 3.47 0.303v3.813h-1.955c-1.925 0-2.526 1.195-2.526 2.421v2.909h4.299l-0.688 4.481h-3.611v10.832c7.41-1.164 13.078-7.576 13.078-15.313z" />
                    </symbol>
                    <symbol id="icon-linkedin" viewBox="0 0 28 32">
                        <path d="M26 2h-24.006c-1.1 0-1.994 0.906-1.994 2.019v23.962c0 1.113 0.894 2.019 1.994 2.019h24.006c1.1 0 2-0.906 2-2.019v-23.962c0-1.112-0.9-2.019-2-2.019zM8.463 26h-4.15v-13.363h4.156v13.363zM6.388 10.813c-1.331 0-2.406-1.081-2.406-2.406s1.075-2.406 2.406-2.406c1.325 0 2.406 1.081 2.406 2.406 0 1.331-1.075 2.406-2.406 2.406zM24.019 26h-4.15v-6.5c0-1.55-0.031-3.544-2.156-3.544-2.162 0-2.494 1.688-2.494 3.431v6.613h-4.15v-13.363h3.981v1.825h0.056c0.556-1.050 1.912-2.156 3.931-2.156 4.2 0 4.981 2.769 4.981 6.369v7.325z" />
                    </symbol>
                    <symbol id="icon-twitter" viewBox="0 0 32 32">
                        <path d="M28.711 9.482c0.020 0.284 0.020 0.569 0.020 0.853 0 8.67-6.599 18.66-18.66 18.66-3.716 0-7.168-1.076-10.071-2.944 0.528 0.061 1.036 0.081 1.584 0.081 3.066 0 5.888-1.035 8.142-2.802-2.883-0.061-5.3-1.949-6.132-4.548 0.406 0.061 0.812 0.102 1.239 0.102 0.589 0 1.178-0.081 1.726-0.223-3.005-0.609-5.259-3.249-5.259-6.437v-0.081c0.873 0.487 1.888 0.792 2.964 0.832-1.766-1.178-2.924-3.188-2.924-5.462 0-1.218 0.325-2.335 0.893-3.31 3.228 3.98 8.081 6.579 13.523 6.863-0.101-0.487-0.162-0.995-0.162-1.502 0-3.614 2.924-6.558 6.558-6.558 1.888 0 3.594 0.792 4.792 2.071 1.482-0.284 2.904-0.832 4.162-1.584-0.487 1.523-1.523 2.802-2.883 3.614 1.32-0.142 2.599-0.508 3.777-1.015-0.893 1.299-2.010 2.457-3.289 3.391z" />
                    </symbol>
                    <symbol id="logo" viewBox="0 0 600 600">
                        <g>
                            <title>Lauri lavanti</title>
                            <rect rx="50" id="svg_2" height="600" width="600" y="0" x="0" fill="#045a1c" />
                            <text
                                font-weight="normal"
                                font-style="normal"
                                transform="matrix(22.2798, 0, 0, 22.2798, -4774.17, -4448.06)"
                                xmlSpace="preserve"
                                text-anchor="start"
                                font-family="serif"
                                font-size="24"
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
        </body>
    </html>
)

export default Page
