import { Link as GatsbyLink } from 'gatsby'
import tw from 'twin.macro'

const InternalLink = tw(GatsbyLink)`
    text-link no-underline text-base hover:underline active:underline focus:underline transition
`

export default InternalLink
