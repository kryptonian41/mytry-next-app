import { isServer } from "utils";
import {
  FETCH_CART,
  ADD_ITEM,
  REMOVE_ITEM,
  INCREASE_ITEM_QTY,
  DECREASE_ITEM_QTY,
  SET_ADDRESSES,
  CLEAR_CART
} from "../actions/types";

export const CART_LOCALSTORAGE_KEY = "maitri_cart_cache"

const DEFAULT_STATE = {
  itemsCount: 0,
  items: [],
  cartTotal: 0
}

const getCartState = () => {
  if (typeof window === 'undefined') return DEFAULT_STATE
  return JSON.parse(window.localStorage.getItem(CART_LOCALSTORAGE_KEY)) || DEFAULT_STATE
}

const saveCartState = (newCartState) => {
  if (isServer()) return
  window.localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(newCartState))
}

const initialState = getCartState()

export default function cartReducer(state = initialState, action) {
  const newState = getNewState(state, action)
  saveCartState(newState)
  return newState
}


const getNewState = (state, action) => {
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
    case SET_ADDRESSES:
      return setAddress(state, action.payload)
    case CLEAR_CART:
      return DEFAULT_STATE
    default:
      return state;
  }
}

const setAddress = (state, payload) => {
  return state
}

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
    }
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

