import React, { useRef } from 'react'
import Layout from "components/Layout";
import Navbar from 'components/Navbar';
import Summary from 'components/Cart/Summary';
import { useDispatch, useSelector } from 'react-redux';
import cartStyles from 'components/Cart/cart.module.scss'
import { useTheme } from 'utils/color-map';
import * as Yup from "yup";
import { ContactShippingForm } from 'components/Cart/checkout/ShippingForm';
import { CheckoutButton } from 'components/Cart/checkout/CheckoutButton';
import { createRazorpayInstance } from 'utils';
import { createOrder } from 'utils/api-utils';
import { useRouter } from 'next/router';
import { ContactShippingData, LineItem, Order } from 'types/commons';
import { FormikHelpers } from 'formik';
import { CLEAR_CART } from 'redux-utils/actions/types';
// import { getOrderDetails } from 'pages/api/order/create';

interface Props {

}


export const getOrderDetails = (cartItems: any[], values: ContactShippingData) => {
  const products: LineItem[] = cartItems.map(item => ({ product_id: item.id, quantity: item.qty }))
  debugger
  return {
    payment_method: 'Razorpay',
    payment_method_title: 'Razorpay',
    billing: {
      address_1: values.flatAddress,
      address_2: values.streetAddress,
      city: values.city,
      state: values.state,
      country: 'India',
      first_name: values.firstName,
      last_name: values.lastName,
      postcode: values.pincode.toString(),
      email: values.email,
      phone: values.contactNo.toString()
    },
    shipping: {
      address_1: values.flatAddress,
      address_2: values.streetAddress,
      city: values.city,
      state: values.state,
      country: 'India',
      first_name: values.firstName,
      last_name: values.lastName,
      postcode: values.pincode.toString(),
    },
    line_items: products
  } as Order
}

export const Checkout = (props: Props) => {
  const cart = useSelector((state) => (state as any).cart);
  const { cartTotal, items } = cart;
  const theme = useTheme()
  const router = useRouter()
  const shippingFormSubmitRef = useRef(null)
  const dispatch = useDispatch()
  const checkout: ((values: ContactShippingData, formikHelpers: FormikHelpers<ContactShippingData>) => void | Promise<any>) = async (values) => {
    const order = getOrderDetails(items, values)
    const paymentDetails = await createOrder(order)
    const rzp = createRazorpayInstance(paymentDetails, (rzpResponse) => {
      dispatch({
        type: CLEAR_CART
      })
      router.push({
        pathname: '/order/success',
        query: {
          orderId: rzpResponse.razorpay_order_id
        }
      })
    })
    rzp.open()
  }
  return (
    <Layout title="Place Order" description={null} keywords={null}>
      <div className={cartStyles.container} style={{
        background: '#F7FAEE'
      }}>
        <Navbar />
        <div className={cartStyles.cartContainer}>
          <div style={{
            gridColumn: '2/13'
          }}>
            <h1 className="text-5xl" style={{
              color: theme.orange
            }}>
              Shipping
            </h1>
            <div className="mt-8">
              <ContactShippingForm submitBtnRef={shippingFormSubmitRef} onSubmit={checkout} />
            </div>
          </div>
          <Summary cartTotal={cartTotal} dark buttonComponent={<CheckoutButton shippingFormBtnRef={shippingFormSubmitRef} />} />
        </div>
      </div>
    </Layout>
  )
}

export default Checkout