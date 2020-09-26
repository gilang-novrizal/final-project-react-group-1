import { combineReducers } from "redux";

import carouselReducer from "./carouselReducer";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import warehouseReducer from "./warehouseReducer";
import profileReducer from "./profileReducer";
import userReducer from "./userReducer";
import orderReducer from "./orderReducer";
import addressReducer from "./addressReducer";
import favoriteReducer from "./favoriteReducer";
import productCategoryReducer from "./productCategoryReducer"

const allReducers = combineReducers({
  carouselReducer,
  categoryReducer,
  productReducer,
  profileReducer,
  cartReducer,
  warehouseReducer,
  userReducer,
  orderReducer,
  addressReducer,
  favoriteReducer,
  productCategoryReducer
});

export default allReducers;
