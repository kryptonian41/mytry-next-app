import { Order, User } from "types/commons"
import { CheckoutType, createOrder } from "utils/api-utils"

type callback = (orderDetails, updatedUserDetails?: User) => void

export const CODCheckout =
  async (order: Order, onSuccess: callback) => {
    const { orderDetails, updatedUserData } = await createOrder(order, CheckoutType.COD)
    onSuccess(orderDetails, updatedUserData)
  }
