import { Order } from "types/commons";
import { createRazorpayInstance } from "utils";
import { CheckoutType, createOrder } from "utils/api-utils";

export const addRazorpayScriptToHead = () => {
  return new Promise((res) => {
    const script = document.createElement("script") as HTMLScriptElement;
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => res(null);
    document.head.appendChild(script);
  });
};

export const RazorPayCheckout = async (orderDetails: Order, onSuccess) => {
  await addRazorpayScriptToHead();
  const paymentDetails = await createOrder(orderDetails, CheckoutType.Razorpay);
  const {
    billing: { email, phone, first_name, last_name },
  } = orderDetails;
  const rzp = createRazorpayInstance({
    ...paymentDetails,
    userInfo: {
      name: `${first_name} ${last_name}`,
      email: email,
      contactNo: phone,
    },
    onSuccess,
  });
  rzp.open();
};
