import { Order } from 'types'
import { CheckoutType, createOrder } from 'utils/api-utils'

export const CODCheckout = async (orderDetails: Order) => {
  const order = await createOrder(orderDetails, CheckoutType.COD)
}
