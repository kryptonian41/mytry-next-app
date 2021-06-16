import { LOGIN_SUCCESS } from "../actions/types";

const initialState = {
  token: null,
  isAuthenticated: null,
  user: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("user-jwt", action.payload);
      window.alert('login successful!')
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      };
    default:
      return state;
  }
}
