import { combineReducers } from "redux";
import { User } from "../constants/models";

const setUserReducer = (user = null, action: any): User | null => {
  if (action.type === "SET_USER") {
    return action.payload;
  }
  return user;
};

export default combineReducers({
  user: setUserReducer,
});
