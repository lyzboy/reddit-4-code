import React from "react";

import styles from "./NavBar.module.scss";

import NavBarTile from "../../components/navBarTile/NavBarTile";

const NavBar = ({ className }) => {
    return (
        <nav className={` ${className} ${styles.NavBar}`}>
            <h2>Subreddits</h2>
            <NavBarTile />
            <NavBarTile />
            <NavBarTile />
            <NavBarTile />
            <NavBarTile />
            <NavBarTile />
        </nav>
    );
};

export default NavBar;
