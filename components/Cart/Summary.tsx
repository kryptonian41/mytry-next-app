import cartStyles from "./cart.module.scss";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const Summary = ({
  cartTotal,
  dark = false,
  buttonComponent = null,
  isCouponApplied = null,
  couponData = null,
}) => {
  const { items } = useSelector((state) => (state as any).cart);
  const cartFilled = useMemo(() => items.length !== 0, [items]);
  return (
    <div
      className={clsx(cartStyles.summaryContainer, { [cartStyles.dark]: dark })}
    >
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
            {isCouponApplied && couponData && (
              <div className={cartStyles.amountRow}>
                <p>{couponData.code}</p>
                <p>{`- INR ${couponData.discount}`}</p>
              </div>
            )}
            {cartFilled && (
              <div className={cartStyles.amountRow}>
                <p>Shipping</p>
                <p>INR 50</p>
              </div>
            )}

            <hr style={dark ? { borderColor: "currentColor" } : {}} />
            <div className={cartStyles.amountRow}>
              <h3>Total</h3>
              <h3>
                INR{" "}
                {cartTotal +
                  (cartFilled ? 50 : 0) - (isCouponApplied && couponData ? couponData.discount : 0)}
              </h3>
            </div>
          </div>
        </div>
      </div>
      {cartFilled && buttonComponent && (
        <div className="mt-5">{buttonComponent}</div>
      )}
    </div>
  );
};

export default Summary;
