import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOAD_USER,
  LOGOUT_USER,
} from "../actions/types";

const initialState = {
  token: null,
  isAuthenticated: null,
  user: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("user-jwt", action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      };

    case LOGIN_ERROR:
    case LOGOUT_USER:
      localStorage.removeItem("user-jwt");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };

    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
