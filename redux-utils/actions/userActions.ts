import axios from "axios";
import { user } from "utils/api-utils/request-body/register-user";
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOAD_USER,
  INIT_APP,
  FINISH_INIT_APP,
  FETCH_CART,
} from "./types";
import Router from "next/router";
import { getProducts } from "utils/api-utils";
import { createCartState } from "utils/cart";

export const loadUser = (jwt, onSuccess) => async (dispatch) => {
  const config = {
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  };

  try {
    const res = await axios.get("/api/users/me", config);
    dispatch({ type: LOGIN_SUCCESS, payload: jwt });
    dispatch({ type: LOAD_USER, payload: res.data });
    if (onSuccess) onSuccess();
  } catch (err) {
    window.alert("Error logging in. Please try again.");
    dispatch({ type: LOGIN_ERROR });
    if (!window.location.pathname.includes("/login")) Router.push("/login");
  }
};

export const logIn =
  (email, password, onSuccess = () => { }) =>
    async (dispatch) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ email, password });

      try {
        const res = await axios.post("/api/users/authenticate", body, config);
        dispatch(loadUser(res.data.data.jwt, onSuccess));
      } catch (err) {
        const message = err.response.data.data.message;
        window.alert(message);
        dispatch({ type: LOGIN_ERROR });
        if (!window.location.pathname.includes("/login"))
          window.location.replace(`${window.location.host}/login`);
      }
    };

export const registerUser =
  (firstName, lastName, email, password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(user(email, firstName, lastName, password));

    try {
      const res = await axios.post("/api/users/register", body, config);
      if (res.status === 201) dispatch(logIn(email, password));
    } catch (err) {
      if (err.response.data.code === "registration-error-email-exists") {
        window.alert("Account already exists. Please try logging in.");
        window.location.replace(`${window.location.host}/login`);
      } else window.alert("Error creating user. Please try again.");
    }
  };

export const initializeApp = () => async (dispatch, getState) => {
  dispatch({ type: INIT_APP });
  try {
    await Promise.all([
      resolveAuthState(dispatch),
      updateUserCartState(dispatch, getState)
    ])
    dispatch({ type: FINISH_INIT_APP })
  } catch (error) {
    console.log("🚀 ~ file: userActions.ts ~ line 99 ~ initializeApp ~ error", error)
    dispatch({ type: FINISH_INIT_APP })
  }
};


const updateUserCartState = async (dispatch, getState) => {
  const { cart: { items } } = getState() as { cart: { items: import("utils/cart").CartProduct[] } }
  if (items.length === 0) return
  const itemIds = items.map(item => item.id)
  const itemQuantityMap = new Map<number, number>()
  items.forEach(product => itemQuantityMap.set(product.id, product.qty))
  const productsInfo = await getProducts({
    params: {
      include: itemIds.join(',')
    }
  })
  const newCartState = createCartState(productsInfo, itemQuantityMap)
  dispatch({
    type: FETCH_CART,
    payload: newCartState
  })
}

const resolveAuthState = dispatch => {
  return new Promise(async (res, rej) => {
    try {
      const JWT = localStorage.getItem("user-jwt");
      if (!JWT) {
        res(null);
      } else {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = JSON.stringify({ JWT });
        const response = await axios.post("/api/users/refresh", body, config);
        if (response.status === 201) {
          dispatch(
            loadUser(response.data.data.jwt, () => res(null)
            )
          );
        } else {
          throw new Error("Could not refresh token.");
        }
      }
    }
    catch (err) {
      dispatch({ type: LOGIN_ERROR });
      res(err);
    }
  })
}