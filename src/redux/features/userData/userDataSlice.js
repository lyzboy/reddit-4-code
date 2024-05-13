import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        addUserData: (state, action) => {
            state.user = action.payload;
        },
        removeUserData: (state) => {
            state.user = null;
        },
    },
});

export const { addUserData, removeUserData } = userDataSlice.actions;

export const selectCurrentUser = (state) => state.userData.user;

export default userDataSlice.reducer;
