import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./NavBarTile.module.scss";

const NavBarTile = ({ pathName, handleClick }) => {
    return (
        //TODO: tell header.jsx to hide the nav bar when a tile is clicked
        <NavLink
            to={`/${pathName}`}
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
            }
            onClick={handleClick}
        >
            <div className={styles.NavBarTile}>
                <div className={styles.NavBarTile__icon}></div>
                <p className={styles.NavBarTile__text}>{`/r/${pathName}`}</p>
            </div>
        </NavLink>
    );
};

export default NavBarTile;
