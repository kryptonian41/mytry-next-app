import CartTile from "./CartTile";
import cartStyles from "./cart.module.scss";
import Link from "next/link";

const Items = ({ items }) => {
  return (
    <div className={cartStyles.itemsContainer}>
      <h1>Cart</h1>
      {items.length > 0 ? (
        items.map((item) => <CartTile key={item.id} product={item} />)
      ) : (
        <div className={cartStyles.emptyCartContainer}>
          <h3>Your cart is currently empty!</h3>
          <button>
            <Link href="/products">Shop Now</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Items;
