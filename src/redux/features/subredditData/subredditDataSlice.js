import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const subredditDataAdapter = createEntityAdapter();

const subredditDataSlice = createSlice({
    name: `subredditData`,
    initialState: subredditDataAdapter.getInitialState(),
    reducers: {
        addSubredditData: subredditDataAdapter.addOne,
        removeSubredditData: subredditDataAdapter.removeOne,
        updateSubredditData: subredditDataAdapter.updateOne,
    },
});

export const { selectAll: selectAllSubredditData } =
    subredditDataAdapter.getSelectors((state) => state.subredditData);

export const { addSubredditData, removeSubredditData, updateSubredditData } =
    subredditDataSlice.actions;

export default subredditDataSlice.reducer;
