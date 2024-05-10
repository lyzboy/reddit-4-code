import { configureStore } from "@reduxjs/toolkit";

import userDataReducer from "./features/userData/userDataSlice";
import subredditDataReducer from "./features/subredditData/subredditDataSlice";

export default configureStore({
    reducer: {
        userData: userDataReducer,
        subredditData: subredditDataReducer,
    },
});
