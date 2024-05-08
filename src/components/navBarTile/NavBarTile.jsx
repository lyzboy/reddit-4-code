import React from "react";

import styles from "./NavBarTile.module.scss";

const NavBarTile = () => {
    return (
        <div className={styles.NavBarTile}>
            <div className={styles.NavBarTile__icon}></div>
            <p className={styles.NavBarTile__text}>Subbreddit Name</p>
        </div>
    );
};

export default NavBarTile;
