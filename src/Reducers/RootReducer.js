import { combineReducers } from "redux";
import ContactListReducer from "./ContactListReducer";
import SearchReducer from "./SearchReducer";


export default combineReducers({
    ContactListReducer,
    SearchReducer
});