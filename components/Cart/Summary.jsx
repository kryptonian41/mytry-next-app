import cartStyles from "./cart.module.scss";
import { createOrder } from '../../utils/api-utils'
export const getOrderDetails = (cartState) => {

}

const createRazorpayInstance = ({
  currency, id, amount
}) => {
  const options = {
    "key": process.env.NEXT_PUBLIC_RAZORPAY_API_KEY_ID,
    amount,
    currency,
    "name": "MyTry",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": id,
    "handler": function (response) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature)
    },
    "prefill": {
      "name": "Gaurav Kumar",
      "email": "gaurav.kumar@example.com",
      "contact": "9999999999"
    },
    "notes": {
      "address": "Razorpay Corporate Office"
    },
    "theme": {
      "color": "#3399cc"
    }
  };
  debugger
  return new window.Razorpay(options)
}

const Summary = ({ cartTotal }) => {

  const handleCheckoutClick = async () => {
    const order = getOrderDetails()
    const paymentDetails = await createOrder(order)
    debugger
    const rzp = createRazorpayInstance(paymentDetails)
    rzp.open()
  }

  return (
    <div className={cartStyles.summaryContainer}>
      <div className={cartStyles.amountSummary}>
        <h2>Summary</h2>
        <div className={cartStyles.amountRowsContainer}>
          <div>
            <div className={cartStyles.amountRow}>
              <p>Subtotal</p>
              <p>INR 0</p>
            </div>
          </div>
          <div>
            <div className={cartStyles.amountRow}>
              <p>Shipping</p>
              <p>INR 0</p>
            </div>
            <div className={cartStyles.amountRow}>
              <p>Taxes</p>
              <p>INR 0</p>
            </div>
            <hr />
            <div className={cartStyles.amountRow}>
              <h3>Total</h3>
              <h3>INR {cartTotal}</h3>
            </div>
          </div>
        </div>
      </div>
      <button className={cartStyles.checkoutBtn} onClick={handleCheckoutClick}>Checkout</button>
    </div>
  );
};

export default Summary;
