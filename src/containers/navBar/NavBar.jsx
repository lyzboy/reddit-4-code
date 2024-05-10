import React from "react";

import styles from "./NavBar.module.scss";

import NavBarTile from "../../components/navBarTile/NavBarTile";

const NavBar = ({ className, subredditList, handleClick }) => {
    return (
        <nav className={` ${className} ${styles.NavBar}`}>
            <h2>Subreddits</h2>
            {subredditList.map((subreddit) => (
                <NavBarTile
                    handleClick={() => handleClick()}
                    pathName={subreddit}
                />
            ))}
        </nav>
    );
};

export default NavBar;
