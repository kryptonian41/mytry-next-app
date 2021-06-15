import { useState } from "react";
import { connect } from "react-redux";

const CartTile = ({ product, removeItem, updateItemQty }) => {
  const { id, name, price, qty } = product;
  const [currentQty, setCurrentQty] = useState(qty);
  return (
    <div
      style={{
        width: "30%",
        border: "1px solid black",
        margin: "10px",
        padding: "5px",
      }}
    >
      <h3>Name: {name}</h3>
      <p>Product Id: {id}</p>
      <p>Price: {price}</p>
      <p>
        <button
          onClick={() => {
            if (currentQty > 1) {
              updateItemQty(product, false);
              setCurrentQty(currentQty - 1);
            }
          }}
        >
          -
        </button>{" "}
        {currentQty}{" "}
        <button
          onClick={() => {
            updateItemQty(product, true);
            setCurrentQty(currentQty + 1);
          }}
        >
          +
        </button>
      </p>
      <p>Toal Price: {currentQty * price}</p>
      <button
        onClick={() => removeItem(product)}
        style={{ border: "1px solid black", padding: "5px" }}
      >
        Remove from cart
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (product) => {
    dispatch({ type: "REMOVE_ITEM", payload: product });
  },
  updateItemQty: (product, increase) => {
    if (increase) dispatch({ type: "INCREASE_ITEM_QTY", payload: product });
    else dispatch({ type: "DECREASE_ITEM_QTY", payload: product });
  },
});

export default connect(null, mapDispatchToProps)(CartTile);
