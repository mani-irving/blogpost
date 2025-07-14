import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    allPost: (state, action) => {
      const posts = action.payload;
      state.allPosts = posts;
    },
    removePost: (state, action) => {
      const postId = action.payload;
      state.allPosts = state.allPosts.filter((post) => post.$id !== postId);
    },
  },
});

export const { allPost, removePost } = postSlice.actions;
export default postSlice.reducer;
