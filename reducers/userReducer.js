import { LOGIN_SUCCESS, LOAD_USER } from "../actions/types";

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

    case LOAD_USER:
      console.log(action.payload);
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
