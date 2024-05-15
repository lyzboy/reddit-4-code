import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    currentSubreddit: null,
    posts: [],
};

const subredditDataSlice = createSlice({
    name: `subredditData`,
    initialState,
    reducers: {
        updateCurrentSubreddit: (state, action) => {
            state.currentSubreddit = action.payload;
        },
        updatePosts: (state, action) => {
            state.posts = action.payload;
        },
    },
});

export const { updateCurrentSubreddit, updatePosts } =
    subredditDataSlice.actions;
export const selectCurrentSubreddit = (state) =>
    state.subredditData.currentSubreddit;
export const selectPosts = (state) => state.subredditData.posts;

export default subredditDataSlice.reducer;
