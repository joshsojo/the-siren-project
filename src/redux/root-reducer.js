import { combineReducers } from "redux";
import categoryReducer from "./category/category.reducer";
import headlineReducer from "./headline/headline.reducer";

export default combineReducers({
  category: categoryReducer,
  headline: headlineReducer
});
