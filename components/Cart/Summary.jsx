import cartStyles from "./cart.module.scss";

const Summary = () => {
  return (
    <div className={cartStyles.summaryContainer}>
      <div className={cartStyles.amountSummary}>
        <h2>Summary</h2>
      </div>
      <button className={cartStyles.checkoutBtn}>Checkout</button>
    </div>
  );
};

export default Summary;
