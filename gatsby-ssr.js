import * as React from 'react'

export const onRenderBody = ({ setHeadComponents }) => {
    setHeadComponents([
        <link
            rel="preload"
            href="/fonts/Krana_Fat_B.otf"
            as="font"
            type="font/opentype"
            crossOrigin="anonymous"
            key="interFont"
        />,
    ])
}
