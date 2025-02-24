import cartStyles from './cart.module.scss'
import { useMemo } from 'react'
import { useAppSelector } from 'redux-state/hooks'

export const OrderAmountSummary = () => {
  const cart = useAppSelector((state) => state.cart)
  const { cartTotal, coupon, items } = cart
  const cartHasAtleastOneItem = useMemo(() => items.length !== 0, [items])

  return (
    <div className={cartStyles.amountSummary}>
      <h2>Summary</h2>
      <div className={cartStyles.amountRowsContainer}>
        <div>
          <div className={cartStyles.amountRow}>
            <p>Subtotal</p>
            <p>INR {cartTotal}</p>
          </div>
        </div>
        <div>
          {coupon?.applied && (
            <div className={cartStyles.amountRow}>
              <p>{coupon.code}</p>
              <p>{`- INR ${coupon.discount}`}</p>
            </div>
          )}
          {cartHasAtleastOneItem && (
            <div className={cartStyles.amountRow}>
              <p>Shipping</p>
              <p>INR 50</p>
            </div>
          )}

          <hr />
          <div className={cartStyles.amountRow}>
            <h3>Total</h3>
            <h3>INR {cartTotal}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
