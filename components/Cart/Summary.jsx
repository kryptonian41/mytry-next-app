import cartStyles from "./cart.module.scss";

const Summary = ({ cartTotal }) => {
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
      <button className={cartStyles.checkoutBtn}>Checkout</button>
    </div>
  );
};

export default Summary;
