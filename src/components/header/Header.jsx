import React, { useState, useEffect, useRef } from "react";

import SearchBar from "../searchBar/SearchBar";
import NavBar from "../../containers/navBar/NavBar";

import styles from "./Header.module.scss";

import logo from "../../assets/images/readIt4Code_logo.jpg";

const Header = () => {
    const [showNav, setShowNav] = useState(false);

    const handleShowNav = () => {
        setShowNav(!showNav);
    };

    useEffect(() => {
        // close mobile nav bar if screen size is greater than 768px
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        const handleResize = () => {
            setShowNav(false);
        };

        handleResize();

        mediaQuery.addEventListener("change", handleResize);

        return () => {
            mediaQuery.removeEventListener("change", handleResize);
        };
    }, []);

    return (
        <header className={styles.Header}>
            <h2 className={styles.subreddit}>
                Current Subreddit Name going to make it super long to see how it
                fits
            </h2>
            <SearchBar className={styles.search} />
            {!showNav ? (
                <span
                    onClick={handleShowNav}
                    className={`material-symbols-outlined ${styles.navbarButton}`}
                >
                    menu
                </span>
            ) : (
                <span
                    onClick={handleShowNav}
                    className={`material-symbols-outlined ${styles.navbarButton}`}
                >
                    close
                </span>
            )}
            <div className={styles.logoContainer}>
                <div className={styles.imageContainer}>
                    <img src={logo} alt="read it 4 code icon" />
                </div>

                <h1 className={styles.logo}>
                    <span className={styles.colored}>ReadIt</span>4Code
                </h1>
            </div>
            <NavBar
                className={`${styles.navbarList} ${
                    showNav ? styles.visible : styles.disabled
                }`}
            />
        </header>
    );
};

export default Header;
