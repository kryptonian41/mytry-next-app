import CartTile from "./CartTile";
import cartStyles from "./cart.module.scss";

const Items = ({ items }) => {
  return (
    <div className={cartStyles.itemsContainer}>
      <h1>Cart</h1>
      {items.map((item) => (
        <CartTile key={item.id} product={item} />
      ))}
    </div>
  );
};

export default Items;
