import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const userDataAdapter = createEntityAdapter();

const userDataSlice = createSlice({
    name: `userData`,
    initialState: userDataAdapter.getInitialState(),
    reducers: {
        addUserData: userDataAdapter.addOne,
        removeUserData: userDataAdapter.removeOne,
        updateUserData: userDataAdapter.updateOne,
    },
});

export const { selectAll: selectAllUserData } = userDataAdapter.getSelectors(
    (state) => state.userData
);

export const { addUserData, removeUserData, updateUserData } =
    userDataSlice.actions;

export default userDataSlice.reducer;
