import Navbar from 'components/Navbar'
import { useAppSelector } from 'redux-state/hooks'
import { CartItemsList } from './CartItemsList'
import { CartOrderSummary } from './CartOrderSummary'
import cartStyles from './cart.module.scss'

const index = () => {
  const cartItems = useAppSelector((state) => state.cart.items)

  return (
    <div className={cartStyles.container} suppressHydrationWarning>
      <Navbar color="light" />
      <div className={cartStyles.cartContainer}>
        <CartItemsList items={cartItems} />
        <CartOrderSummary />
      </div>
    </div>
  )
}

export default index
