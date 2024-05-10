import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../header/Header";

import { subredditList } from "../../utils/utils";

const Root = () => {
    return (
        <>
            <Header subredditList={subredditList} />
            <Outlet />
            <footer>Footer Content here</footer>
        </>
    );
};

export default Root;
