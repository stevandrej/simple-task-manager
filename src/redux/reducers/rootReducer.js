import { combineReducers } from "redux";
import cardReducer from "./cardReducer";
import authReducer from './authReducer';

export default combineReducers({ cardReducer, authReducer });
