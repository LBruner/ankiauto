import {configureStore} from "@reduxjs/toolkit";
import uiSlice from "./UISlice";

const store = configureStore({reducer: {ui: uiSlice}})
export default store;