import Navbar from "components/Navbar";
import CartTile from "./CartTile";
import Items from "./Items";
import Summary from "./Summary";
import { useSelector } from "react-redux";
import cartStyles from "./cart.module.scss";

const index = () => {
  const cart = useSelector((state) => state.cart);
  const { itemsCount, cartTotal, items } = cart;
  return (
    <div className={cartStyles.container}>
      <Navbar color="light" />
      <div className={cartStyles.cartContainer}>
        {/* <h1>Cart Page</h1>
          <h2>Total number of items: {itemsCount}</h2>
          <h2>Total price of items: {cartTotal}</h2>
          {items.map((item) => (
            <CartTile key={item.id} product={item} />
          ))} */}
        <Items />
        <Summary />
      </div>
    </div>
  );
};

export default index;
