const Svgs = (): JSX.Element => (
    <svg
        aria-hidden="true"
        style={{
            height: 0,
            overflow: 'hidden',
            position: 'absolute',
            width: 0,
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
        </defs>
    </svg>
)

export default Svgs
