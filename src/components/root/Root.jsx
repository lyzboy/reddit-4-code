import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../../containers/header/Header";

const Root = () => {
    return (
        <>
            <Header />
            <Outlet />
            <footer>Footer Content here</footer>
        </>
    );
};

export default Root;
