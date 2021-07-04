import { Order } from "types/commons"
import { CheckoutType, createOrder } from "utils/api-utils"

export const CODCheckout =
  async (orderDetails: Order, onSuccess) => {
    const order = await createOrder(orderDetails, CheckoutType.COD)
    onSuccess(order)
  }
