import { useState } from "react";
import { connect } from "react-redux";
import cartStyles from "./cart.module.scss";

const CartTile = ({ product, removeItem, updateItemQty }) => {
  const { name, descQty, image, price, qty } = product;
  const [currentQty, setCurrentQty] = useState(qty);
  return (
    <>
      <div className={cartStyles.itemContainer}>
        <img src={image} alt={name} />
        <div className={cartStyles.productInfo}>
          <div className={cartStyles.heading}>
            <h3>{name}</h3>
            <button onClick={() => removeItem(product)}>X</button>
          </div>
          <p>{descQty}</p>
          <div className={cartStyles.quantityContainer}>
            <p>Quantity: </p>
            <div className={cartStyles.quantitySelector}>
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
            </div>
          </div>
          <p className={cartStyles.price}>INR {price}</p>
        </div>
      </div>
      <hr className={cartStyles.itemDivider} />
    </>
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
