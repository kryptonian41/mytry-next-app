import Navbar from "components/Navbar";
import Items from "./Items";
import Summary from "./Summary";
import { useSelector } from "react-redux";
import cartStyles from "./cart.module.scss";
import Link from "next/link";
import { useRouter } from 'next/router'

const index = () => {
  const cart = useSelector((state) => (state as any).cart);
  const { cartTotal, items } = cart;
  const router = useRouter()
  const { isAuthenticated } = useSelector((state) => (state as any).user)
  const handlePlaceOrderClick = () => {
    if (!isAuthenticated) {
      alert('Only authenticated users can place holder.Please Sign-up.')
      return router.push('/register')
    }
    return router.push('/cart/checkout')
  }

  return (
    <div className={cartStyles.container} suppressHydrationWarning >
      <Navbar color="light" />
      <div className={cartStyles.cartContainer}>
        <Items items={items} />
        <Summary cartTotal={cartTotal} buttonComponent={
          <button onClick={handlePlaceOrderClick} className={cartStyles.checkoutBtn}>Place Order</button>
        } />
      </div>
    </div>
  );
};

export default index;
