import axios from "axios";
import { user } from "api-utils/request-body/register-user";
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOAD_USER,
  INIT_APP,
  FINISH_INIT_APP,
} from "./types";

export const loadUser = (jwt) => async (dispatch) => {
  const config = {
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  };

  try {
    const res = await axios.get("api/users/me", config);
    dispatch({ type: LOGIN_SUCCESS, payload: jwt });
    dispatch({ type: LOAD_USER, payload: res.data });
  } catch (err) {
    window.alert("Error logging in. Please try again.");
    dispatch({ type: LOGIN_ERROR });
    window.location.replace(`${window.location.href}login`);
  }
};

export const logIn = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/users/authenticate", body, config);
    dispatch(loadUser(res.data.data.jwt));
  } catch (err) {
    const message = err.response.data.data.message;
    window.alert(message);
    dispatch({ type: LOGIN_ERROR });
    if (!window.location.pathname.includes("/login"))
      window.location.replace(`${window.location.href}login`);
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
        window.location.replace(`${window.location.href}login`);
      } else window.alert("Error creating user. Please try again.");
    }
  };

export const initializeApp = () => async (dispatch) => {
  dispatch({ type: INIT_APP });
  const JWT = localStorage.getItem("user-jwt");
  if (!JWT) {
    dispatch({ type: FINISH_INIT_APP });
    return;
  } else {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ JWT });

      const response = await axios.post("/api/users/refresh", body, config);
      if (response.status === 201) {
        dispatch(loadUser(response.data.data.jwt));
      } else throw new Error("Could not refresh token.");
      dispatch({ type: FINISH_INIT_APP });
    } catch (err) {
      dispatch({ type: LOGIN_ERROR });
    }
  }
};
