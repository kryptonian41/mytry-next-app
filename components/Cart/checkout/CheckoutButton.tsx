import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useTheme } from 'utils/color-map';
import styles from './checkout.module.scss'

interface Props {
  shippingFormBtnRef: React.MutableRefObject<HTMLButtonElement>,
  loading: boolean
}

export const CheckoutButton = ({ shippingFormBtnRef, loading }: Props) => {
  const theme = useTheme()
  const handleCheckoutClick = useCallback(() => {
    shippingFormBtnRef.current.click()
  }, [])

  return (
    <button className={clsx("w-full p-4 text-xl no-outline", {
      [styles.loading]: loading
    })} style={{
      background: theme.orange,
      color: theme.yellow,
      borderRadius: '100px'
    }} onClick={handleCheckoutClick}>{!loading && "Place Order"}</button>
  )
}
