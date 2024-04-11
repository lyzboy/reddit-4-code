import React from "react";

import SearchBar from "../searchBar/SearchBar";
import NavBar from "../navBar/NavBar";

import styles from "./Header.module.scss";

const Header = () => {
    return (
        <header className={styles.Header}>
            <h2 className={styles.subreddit}>
                Current Subreddit Name going to make it super long to see how it
                fits
            </h2>
            <SearchBar className={styles.search} />
            <span className={`material-symbols-outlined ${styles.navbar}`}>
                menu
            </span>
            {
                //<NavBar className={`${styles.navbar}`} />
            }
            <h1 className={styles.logo}>Reddit4Code</h1>
        </header>
    );
};

export default Header;
