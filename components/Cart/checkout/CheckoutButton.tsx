import clsx from 'clsx';
import React from 'react';
import { useTheme } from 'utils/color-map';

interface Props {
  shippingFormBtnRef: React.MutableRefObject<HTMLButtonElement>
}


export const CheckoutButton = ({ shippingFormBtnRef }: Props) => {
  const theme = useTheme()
  const handleCheckoutClick = async () => {
    shippingFormBtnRef.current.click()
  }
  return (
    <button className={clsx("w-full p-4 text-xl no-outline")} style={{
      background: theme.orange,
      color: theme.yellow,
      borderRadius: '100px'
    }} onClick={handleCheckoutClick}>Continue to Payment</button>
  )
}
