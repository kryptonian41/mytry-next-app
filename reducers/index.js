import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import categoryReducer from "./categoryReducer";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import initializeReducer from "./initializeReducer";

export default combineReducers({
  initApp: initializeReducer,
  cart: cartReducer,
  category: categoryReducer,
  user: userReducer,
  product: productReducer,
});
