import Layout from 'components/Layout'
import Cart from 'components/Cart'
import { NoSsr } from 'components/NoSsr'

const cart = () => (
  <Layout title="Cart">
    <NoSsr>
      <Cart />
    </NoSsr>
  </Layout>
)

export default cart
