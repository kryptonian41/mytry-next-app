import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import categoryReducer from "./categoryReducer";
import userReducer from "./userReducer";
import productReducer from "./productReducer";

export default combineReducers({
  cart: cartReducer,
  category: categoryReducer,
  user: userReducer,
  product: productReducer,
});
