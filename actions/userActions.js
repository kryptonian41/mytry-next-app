import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_ERROR } from "./types";

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
  } catch (err) {
    const message = err.response.data.data.message;
    window.alert(message);
  }
};
