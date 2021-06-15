import {
  FETCH_CART,
  ADD_ITEM,
  REMOVE_ITEM,
  INCREASE_ITEM_QTY,
  DECREASE_ITEM_QTY,
} from "../actions/types";

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

const getProductIndex = (items, product) => {
  const filteredProducts = items.filter((item) => item.id === product.id);
  return items.indexOf(filteredProducts[0]);
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
    const index = getProductIndex(state.items, product);
    if (index >= 0) {
      return updateProduct(state, product, index);
    } else return addNewProduct(state, product);
  } else return addNewProduct(state, product);
};

const removeItem = (state, product) => {
  const index = getProductIndex(state.items, product);
  if (index >= 0) {
    const items = state.items;
    items.splice(index, 1);
    return {
      ...state,
      itemsCount: state.itemsCount - product.qty,
      cartTotal: state.cartTotal - product.totalPrice,
      items: items,
    };
  } else return state;
};

const increaseItemQty = (state, product) => {
  const index = getProductIndex(state.items, product);
  if (index >= 0) {
    const items = state.items;
    items[index].qty = product.qty + 1;
    items[index].totalPrice = product.price * items[index].qty;
    return {
      ...state,
      itemsCount: state.itemsCount + 1,
      cartTotal: state.cartTotal + product.price,
      items: items,
    };
  } else return state;
};

const decreaseItemQty = (state, product) => {
  const index = getProductIndex(state.items, product);
  if (index >= 0) {
    const items = state.items;
    items[index].qty = product.qty - 1;
    items[index].totalPrice = product.price * items[index].qty;
    return {
      ...state,
      itemsCount: state.itemsCount - 1,
      cartTotal: state.cartTotal - product.price,
      items: items,
    };
  } else return state;
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
    case REMOVE_ITEM:
      return removeItem(state, action.payload);
    case INCREASE_ITEM_QTY:
      return increaseItemQty(state, action.payload);
    case DECREASE_ITEM_QTY:
      return decreaseItemQty(state, action.payload);
    default:
      return state;
  }
}
