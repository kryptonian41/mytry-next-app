import clsx from 'clsx';
import React from 'react'
import { Order } from 'types/commons';
import { createRazorpayInstance } from 'utils';
import { createOrder } from 'utils/api-utils';
import { useTheme } from 'utils/color-map';

interface Props {

}

export const getOrderDetails = (cartState) => {
  return {} as Order
}

export const CheckoutButton = (props: Props) => {
  const theme = useTheme()
  const handleCheckoutClick = async () => {
    const order = getOrderDetails({})
    const paymentDetails = await createOrder(order)
    const rzp = createRazorpayInstance(paymentDetails)
    rzp.open()
  }
  return (
    <button className={clsx("w-full p-4 text-xl")} style={{
      background: theme.orange,
      color: theme.yellow,
      borderRadius: '100px'
    }} onClick={handleCheckoutClick}>Continue to Payment</button>
  )
}
