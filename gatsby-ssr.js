import * as React from 'react'

export const onRenderBody = ({ setHeadComponents }) => {
    setHeadComponents([
        <link
            key="interFont"
            as="font"
            crossOrigin="anonymous"
            href="/fonts/Krana_Fat_B.otf"
            rel="preload"
            type="font/opentype"
        />,
    ])
}
