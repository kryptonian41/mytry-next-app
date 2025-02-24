import cartStyles from './cart.module.scss'
import clsx from 'clsx'
import { useCallback, useMemo } from 'react'
import { useAppSelector } from 'redux-state/hooks'
import { useRouter } from 'next/router'
import { OrderAmountSummary } from '../Cart/OrderAmountSummary'
import { CheckoutButton } from './CheckoutButton'
import PaymentMethodSelector from './PaymentMethodSelector'
import CouponForm from './CouponForm'
import { useTheme } from 'utils/hooks/useTheme'

interface CheckOrderSummaryProps {}

export const CheckOutOrderSummary: React.FunctionComponent<
  CheckOrderSummaryProps
> = () => {
  const theme = useTheme()
  const router = useRouter()

  const cartItems = useAppSelector((state) => state.cart.items)
  const cartHasAtleastOneItem = useMemo(
    () => cartItems.length !== 0,
    [cartItems]
  )

  const { isAuthenticated } = useAppSelector((state) => state.auth)

  const handlePlaceOrderClick = useCallback(() => {
    if (!isAuthenticated) {
      alert('Only authenticated users can place order. Please Log-in.')
      return router.push('/login')
    }
    return router.push('/cart/checkout')
  }, [])

  return (
    <div className={cartStyles.summaryContainer}>
      <OrderAmountSummary />

      {cartHasAtleastOneItem && (
        <>
          <CouponForm
            theme={theme}
            setCouponState={setCouponState}
            isCouponApplied={isCouponApplied}
          />
          <div
            className="bg-white p-6 rounded-xl"
            style={{
              border: `1px solid ${theme.green}`,
            }}
          >
            <h1
              className="text-2xl mb-4"
              style={{
                color: theme.green,
              }}
            >
              Payment Mode
            </h1>
            <div>
              <PaymentMethodSelector
                onChange={(paymentMode: string) =>
                  setPaymentMethod(paymentMode as CheckoutType)
                }
                defaultPaymentMode={paymentMethod}
              />
            </div>
            <div className="w-full mt-4">
              <CheckoutButton
                shippingFormBtnRef={shippingFormSubmitRef}
                loading={placingOrder}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
