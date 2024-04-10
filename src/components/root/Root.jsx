import React from "react";
import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <>
            <header>Header Content here</header>
            <Outlet />
            <footer>Footer Content here</footer>
        </>
    );
};

export default Root;
