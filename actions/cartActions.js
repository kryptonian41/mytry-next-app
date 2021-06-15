import { FETCH_CART } from "./types";

export const fetchCart = () => async (dispatch) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  dispatch({
    type: FETCH_CART,
    payload: data,
  });
};
