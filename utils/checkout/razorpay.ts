import { Order, User } from "types/commons"
import { createRazorpayInstance } from "utils"
import { CheckoutType, createOrder } from "utils/api-utils"

export const RazorPayCheckout = async (orderDetails: Order, onSuccess) => {
  // TODO: Add razorpay script to head
  const paymentDetails = await createOrder(orderDetails, CheckoutType.Razorpay)
  const { billing: { email, phone, first_name, last_name } } = orderDetails
  const rzp = createRazorpayInstance({
    ...paymentDetails,
    userInfo: {
      name: `${first_name} ${last_name}`,
      email: email,
      contactNo: phone
    },
    onSuccess
  })
  rzp.open()
}
