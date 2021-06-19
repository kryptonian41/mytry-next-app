import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_ERROR, LOAD_USER } from "./types";

export const loadUser =
  (jwt = null) =>
  async (dispatch) => {
    jwt = jwt ? jwt : localStorage.getItem("user-jwt");

    const config = {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    };

    try {
      const res = await axios.get("api/users/me", config);
      dispatch({ type: LOAD_USER, payload: res.data });
    } catch (err) {
      const message = err.response.data.message;
      window.alert(message);
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
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.data.jwt });
    dispatch(loadUser(res.data.data.jwt));
  } catch (err) {
    const message = err.response.data.data.message;
    window.alert(message);
  }
};

export const registerUser =
  (firstName, lastName, email, password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ firstName, lastName, email, password });

    try {
      const res = await axios.post("/api/users/register", body, config);
      if (res.status === 201) dispatch(logIn(email, password));
    } catch (err) {
      const message = err.response.data.data.message;
      window.alert(message);
    }
  };
