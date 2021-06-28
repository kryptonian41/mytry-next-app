import Navbar from "components/Navbar";
import Items from "./Items";
import Summary from "./Summary";
import { useSelector } from "react-redux";
import cartStyles from "./cart.module.scss";

const index = () => {
  const cart = useSelector((state) => (state as any).cart);
  const { cartTotal, items } = cart;
  return (
    <div className={cartStyles.container} suppressHydrationWarning >
      <Navbar color="light" />
      <div className={cartStyles.cartContainer}>
        <Items items={items} />
        <Summary cartTotal={cartTotal} />
      </div>
    </div>
  );
};

export default index;
