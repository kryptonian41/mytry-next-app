import { FETCH_CART, ADD_ITEM } from "../actions/types";

const initialState = {
  itemsCount: 0,
  cartTotal: 0.0,
  items: [],
};

const addNewProduct = (state, product) => {
  const items = state.items;
  items.push(product);
  return {
    ...state,
    itemsCount: state.itemsCount + product.qty,
    cartTotal: state.cartTotal + product.price,
    items: items,
  };
};

const updateProduct = (state, product, index) => {
  const items = state.items;
  items[index].qty += product.qty;
  items[index].totalPrice = items[index].qty * product.price;
  return {
    ...state,
    itemsCount: state.itemsCount + product.qty,
    cartTotal: state.cartTotal + product.price,
    items: items,
  };
};

const addItem = (state, product) => {
  if (state.items.length) {
    const filteredProducts = state.items.filter(
      (item) => item.id === product.id
    );
    if (filteredProducts.length) {
      return updateProduct(
        state,
        product,
        state.items.indexOf(filteredProducts[0])
      );
    } else return addNewProduct(state, product);
  } else return addNewProduct(state, product);
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CART:
      return {
        ...state,
        items: action.payload,
      };
    case ADD_ITEM:
      return addItem(state, action.payload);
    default:
      return state;
  }
}
