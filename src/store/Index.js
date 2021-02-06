import { createStore, combineReducers } from "redux";
// Reducer
import configReducer from "./reducer/Config";
import departmentReducer from "./reducer/Department";

const allReducer = {
  config: configReducer,
  department: departmentReducer,
};

const rootReducer = combineReducers(allReducer);
// 创建store实例
const stroe = createStore(rootReducer);

export default stroe;
