import axios from "axios";
import { user } from "utils/api-utils/request-body/register-user";
import Router from "next/router";
import { getProducts } from "utils/api-utils";
import { createCartState } from "utils/cart";
import type { AppDispatch, AppStoreGetState } from "redux-state/store";
import { authSliceActions } from "redux-state/slices/authSlice";
import { appBootstrapSliceActions } from "redux-state/slices/appBootstrap";

type VoidReturnFunctionWithAnyArgs<T extends Array<any> = any[]> = (
  ...args: T
) => void;

export const loadUser =
  (jwt: string, onSuccess?: VoidReturnFunctionWithAnyArgs) =>
  async (dispatch: AppDispatch) => {
    const config = {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    };

    try {
      const res = await axios.get("/api/users/me", config);
      dispatch(authSliceActions.loginSuccess({ token: jwt }));
      dispatch(authSliceActions.setUserData({ user: res.data }));
      onSuccess?.();
    } catch (err) {
      window.alert("Error logging in. Please try again.");
      dispatch(authSliceActions.logout());
      if (!window.location.pathname.includes("/login")) Router.push("/login");
    }
  };

export const logIn =
  (
    email: string,
    password: string,
    onSuccess?: VoidReturnFunctionWithAnyArgs
  ) =>
  async (dispatch: AppDispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("/api/users/authenticate", body, config);
      dispatch(loadUser(res.data.data.jwt, onSuccess));
    } catch (err: any) {
      const message = err.response.data.data.message;
      window.alert(message);
      dispatch(authSliceActions.logout());
      if (!window.location.pathname.includes("/login"))
        window.location.replace(`${window.location.host}/login`);
    }
  };

interface RegisterUserArgs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export const registerUser =
  ({ firstname, lastname, email, password }: RegisterUserArgs) =>
  async (dispatch: AppDispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(user(email, firstname, lastname, password));

    try {
      const res = await axios.post("/api/users/register", body, config);
      if (res.status === 201) dispatch(logIn(email, password));
    } catch (err: any) {
      if (err.response.data.code === "registration-error-email-exists") {
        window.alert("Account already exists. Please try logging in.");
        window.location.replace(`${window.location.host}/login`);
      } else window.alert("Error creating user. Please try again.");
    }
  };

export const initializeApp =
  () => async (dispatch: AppDispatch, getState: AppStoreGetState) => {
    dispatch(appBootstrapSliceActions.startInitialization());
    try {
      await Promise.all([
        dispatch(resolveAuthState()),
        dispatch(updateUserCartState()),
      ]);
      dispatch(appBootstrapSliceActions.completeInitialization());
    } catch (error) {
      console.log(
        "🚀 ~ file: userActions.ts ~ line 99 ~ initializeApp ~ error",
        error
      );
      dispatch(appBootstrapSliceActions.completeInitialization());
    }
  };

const updateUserCartState =
  () => async (dispatch: AppDispatch, getState: AppStoreGetState) => {
    const {
      cart: { items },
    } = getState();

    if (items.length === 0) return;

    const itemIds = items.map((item) => item.id);
    const itemQuantityMap = new Map<number, number>();
    items.forEach((product) => itemQuantityMap.set(product.id, product.qty));

    const productsInfo = await getProducts({
      params: {
        include: itemIds.join(","),
      },
    });

    const newCartState = createCartState(productsInfo, itemQuantityMap);

    dispatch({
      type: "FETCH_CART",
      payload: newCartState,
    });
  };

const resolveAuthState = () => (dispatch: AppDispatch) => {
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
          dispatch(loadUser(response.data.data.jwt, () => res(null)));
        } else {
          throw new Error("Could not refresh token.");
        }
      }
    } catch (err) {
      dispatch(authSliceActions.logout());
      res(err);
    }
  });
};
