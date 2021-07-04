import { isServer } from "utils";
import {
  FETCH_CART,
  ADD_ITEM,
  REMOVE_ITEM,
  INCREASE_ITEM_QTY,
  DECREASE_ITEM_QTY,
  SET_ADDRESSES,
  CLEAR_CART,
} from "../actions/types";
import { produce } from "immer";
export const CART_LOCALSTORAGE_KEY = "maitri_cart_cache";

const DEFAULT_STATE = {
  itemsCount: 0,
  items: [],
  cartTotal: 0,
};

const getCartState = () => {
  if (typeof window === "undefined") return DEFAULT_STATE;
  return (
    JSON.parse(window.localStorage.getItem(CART_LOCALSTORAGE_KEY)) ||
    DEFAULT_STATE
  );
};

const saveCartState = (newCartState) => {
  if (isServer()) return;
  window.localStorage.setItem(
    CART_LOCALSTORAGE_KEY,
    JSON.stringify(newCartState)
  );
};

const initialState = getCartState();
export default function cartReducer(state = initialState, action) {
  const newState = getNewState(state, action);
  saveCartState(newState);
  return newState;
}

const getNewState = (state, action) => {
  switch (action.type) {
    case FETCH_CART:
      return {
        ...state,
        ...action.payload,
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
      return setAddress(state, action.payload);
    case CLEAR_CART:
      return {
        itemsCount: 0,
        items: [],
        cartTotal: 0,
      };
    default:
      return state;
  }
};

const setAddress = (state, payload) => {
  return state;
};

const addNewProduct = (state, product) => {
  return produce(state, (draftState) => {
    draftState.items.push(product);
    draftState.itemsCount += product.qty;
    draftState.cartTotal = parseFloat(
      (draftState.cartTotal + product.price).toFixed(2)
    );
  });
};

const getProductIndex = (items, product) => {
  const filteredProducts = items.filter((item) => item.id === product.id);
  return items.indexOf(filteredProducts[0]);
};

const updateProduct = (state, product, index) => {
  return produce(state, (draftState) => {
    const items = draftState.items;
    items[index].qty += product.qty;
    draftState.items[index].totalPrice = parseFloat(
      (items[index].qty * product.price).toFixed(2)
    );
    draftState.itemsCount += product.qty;
    draftState.cartTotal = parseFloat(
      (draftState.cartTotal + product.price).toFixed(2)
    );
  });
};

const addItem = (state, product) => {
  if (state.items.length) {
    const index = getProductIndex(state.items, product);
    if (index >= 0) {
      return updateProduct(state, product, index);
    }
    return addNewProduct(state, product);
  } else return addNewProduct(state, product);
};

const removeItem = (state, product) => {
  const index = getProductIndex(state.items, product);
  if (index >= 0) {
    if (state.items.length === 1)
      return {
        itemsCount: 0,
        items: [],
        cartTotal: 0,
      };
    return produce(state, (draftState) => {
      const items = draftState.items;
      const deletedItem = items.splice(index, 1)[0];
      draftState.itemsCount -= deletedItem.qty;
      draftState.cartTotal = parseFloat(
        (draftState.cartTotal - product.totalPrice).toFixed()
      );
    });
  } else return state;
};

const increaseItemQty = (state, product) => {
  const index = getProductIndex(state.items, product);
  if (index >= 0) {
    return produce(state, (draftState) => {
      const items = draftState.items;
      const item = items[index];
      item.qty += 1;
      item.totalPrice = parseFloat((item.qty * product.price).toFixed(2));
      draftState.itemsCount += 1;
      draftState.cartTotal = parseFloat(
        (draftState.cartTotal + product.price).toFixed(2)
      );
    });
  } else return state;
};

const decreaseItemQty = (state, product) => {
  const index = getProductIndex(state.items, product);
  if (index >= 0) {
    return produce(state, (draftState) => {
      const items = draftState.items;
      const index = getProductIndex(items, product);
      const item = items[index];
      item.qty -= 1;
      item.totalPrice = parseFloat((item.qty * product.price).toFixed(2));
      draftState.itemsCount -= 1;
      draftState.cartTotal = parseFloat(
        (draftState.cartTotal - product.price).toFixed(2)
      );
    });
  } else return state;
};
