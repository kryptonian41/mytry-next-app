import cartStyles from "./cart.module.scss";
import clsx from "clsx";
import { useSelector } from "react-redux";

const Summary = ({ cartTotal, dark = false, buttonComponent = null }) => {
  return (
    <div className={clsx(cartStyles.summaryContainer, { [cartStyles.dark]: dark })}>
      <div className={cartStyles.amountSummary}>
        <h2>Summary</h2>
        <div className={cartStyles.amountRowsContainer}>
          <div>
            <div className={cartStyles.amountRow}>
              <p>Subtotal</p>
              <p>INR {cartTotal}</p>
            </div>
          </div>
          <div>
            <div className={cartStyles.amountRow}>
              <p>Shipping</p>
              <p>INR 50</p>
            </div>

            <hr />
            <div className={cartStyles.amountRow}>
              <h3>Total</h3>
              <h3>INR {cartTotal + 50}</h3>
            </div>
          </div>
        </div>
      </div>
      {buttonComponent && <div className="mt-5">
        {buttonComponent}
      </div>}
    </div>
  );
};

export default Summary;
