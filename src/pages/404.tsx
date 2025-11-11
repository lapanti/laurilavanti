import ExcerptList from '../components/ExcerptList'
import Layout from '../components/Layout'

const FourZeroFour = (): JSX.Element => (
    <Layout title="Etsimääsi sivua ei valitettavasti löytynyt, olisiko se joku seuraavista?">
        <ExcerptList limit={8} />
    </Layout>
)

export default FourZeroFour
