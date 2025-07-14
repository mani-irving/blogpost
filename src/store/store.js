import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import postReducer from "./postSlice";
import connectionReducer from "./connectionsSlice";

const store = configureStore({
  reducer: {
    post: postReducer,
    auth: authReducer,
    connection: connectionReducer,
  },
});

export default store;
