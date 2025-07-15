import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allConnections: [],
};

const connectionsSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    addConnection: (state, action) => {
      state.allConnections.push(action.payload);
    },

    removeConnection: (state, action) => {
      const connectionObj = action.payload;
      state.allConnections = state.allConnections.filter(
        (connection) => connection.following !== connectionObj.following
      );
    },

    setAllConnections: (state, action) => {
      state.allConnections = action.payload;
    },
    resetConnections: (state) => {
      state.allConnections = [];
    },
  },
});

export const {
  addConnection,
  removeConnection,
  setAllConnections,
  resetConnections,
} = connectionsSlice.actions;
export default connectionsSlice.reducer;
