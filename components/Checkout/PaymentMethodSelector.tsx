import React, { useCallback, useState } from "react";
import { CheckoutType } from "utils/api-utils";
import styles from "./checkout.module.scss";

interface Props {
  onChange?: (paymentMode: string) => void;
  defaultPaymentMode?: string;
}

const PaymentMethodSelector = ({ onChange, defaultPaymentMode }: Props) => {
  const [paymentMode, setPaymentMode] = useState(
    defaultPaymentMode || CheckoutType.COD
  );

  const handleChange = useCallback((e) => {
    setPaymentMode(e.target.value);
    if (onChange) onChange(e.target.value);
  }, []);
  return (
    <>
      {Object.entries(CheckoutType).map(([label, value]) => {
        return (
          <label className={styles.radio} key={value}>
            <input
              name="radio"
              type="radio"
              value={value}
              checked={value === paymentMode}
              onChange={handleChange}
            />
            <span>
              {label.toLowerCase() === "razorpay"
                ? "Credit/Debit Cards, NetBanking, UPI, Wallets"
                : label}
            </span>
          </label>
        );
      })}
    </>
  );
};

export default PaymentMethodSelector;
