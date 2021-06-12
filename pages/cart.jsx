import Navbar from "components/Navbar";
import CartTile from "components/CartTile";
import { connect } from "react-redux";

const Cart = ({ cart: { itemsCount, cartTotal, items } }) => {
  return (
    <div>
      <Navbar />
      <h1>Cart Page</h1>
      <h2>Total number of items: {itemsCount}</h2>
      <h2>Total price of items: {cartTotal}</h2>
      {items.map((item) => (
        <CartTile key={item.id} product={item} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Cart);
