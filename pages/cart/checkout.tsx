import cartStyles from 'components/Cart/cart.module.scss'
import { CheckOutOrderSummary } from 'components/Checkout/CheckoutOrderSummary'
import { OrderShippingForm } from 'components/Checkout/ShippingForm'
import Layout from 'components/Layout'
import Navbar from 'components/Navbar'
import { FormikConfig } from 'formik'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from 'utils'
import { CheckoutType } from 'utils/api-utils'
import { CODCheckout } from 'utils/checkout'
import { OrderShippingAddressData } from 'utils/data-validators/orderShippingAddress'
import { useTheme } from 'utils/hooks/useTheme'
interface Props {}

export const Checkout = (props: Props) => {
  const cart = useSelector((state) => (state as any).cart)
  const { user } = useSelector((state) => (state as any).user)
  const { items } = cart
  const theme = useTheme()
  const router = useRouter()
  const shippingFormSubmitRef = useRef(null)
  const dispatch = useDispatch()
  const [couponData, setCouponData] = useState(null)

  useEffect(() => {
    if (!user) router.push('/cart')
  }, [user])

  const checkout = useCallback<
    FormikConfig<OrderShippingAddressData>['onSubmit']
  >(
    async (values: OrderShippingAddressData) => {
      setPlacingOrder(true)
      switch (paymentMethod) {
        case CheckoutType.COD: {
          const order = getOrderDetails(
            user.id,
            items,
            values,
            CheckoutType.COD,
            couponData
          )
          await CODCheckout(order, (order) => {
            dispatch({
              type: CLEAR_CART,
            })
            router.push({
              pathname: '/order/success',
              query: {
                orderId: order.id,
              },
            })
            setPlacingOrder(false)
          })
          break
        }
        // case CheckoutType.Razorpay: {
        //   const order = getOrderDetails(
        //     user.id,
        //     items,
        //     values,
        //     CheckoutType.Razorpay,
        //     couponData
        //   );
        //   await RazorPayCheckout(order, (rzpResponse) => {
        //     dispatch({
        //       type: CLEAR_CART,
        //     });
        //     router.push({
        //       pathname: "/order/success",
        //       query: {
        //         orderId: rzpResponse.razorpay_order_id,
        //       },
        //     });
        //   });
        //   setPlacingOrder(false);
        //   break;
        // }
        default: {
          alert('Invalid checkout type selected')
          break
        }
      }
    },
    [paymentMethod, couponData, user]
  )

  const setCouponState = (couponApplied, coupon) => {
    setCouponApplied(couponApplied)
    setCouponData(coupon)
  }

  return (
    <Layout title="Place Order">
      <div
        className={cartStyles.container}
        style={{
          background: '#F7FAEE',
        }}
      >
        <Navbar />
        <div className={cartStyles.cartContainer}>
          <div
            style={{
              gridColumn: '2/13',
            }}
          >
            <h1
              className="text-5xl"
              style={{
                color: theme.orange,
              }}
            >
              Shipping
            </h1>
            <div className="mt-8">
              <OrderShippingForm
                submitBtnRef={shippingFormSubmitRef}
                onSubmit={checkout}
              />
            </div>
          </div>
          <CheckOutOrderSummary />
        </div>
      </div>
    </Layout>
  )
}

export default Checkout
