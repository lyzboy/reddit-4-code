import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { updateCurrentSubreddit } from "../../redux/features/subredditData/subredditDataSlice";

import styles from "./NavBarTile.module.scss";

const NavBarTile = ({ pathName, handleClick }) => {
    const dispatch = useDispatch();

    const handleNav = () => {
        dispatch(updateCurrentSubreddit(pathName));
        handleClick();
    };
    return (
        //TODO: tell header.jsx to hide the nav bar when a tile is clicked
        <NavLink
            to={`/${pathName}`}
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
            }
            onClick={handleNav}
        >
            <div className={styles.NavBarTile}>
                <div className={styles.NavBarTile__icon}></div>
                <p className={styles.NavBarTile__text}>{`/r/${pathName}`}</p>
            </div>
        </NavLink>
    );
};

export default NavBarTile;
