import React, { useState, useEffect } from "react";

import SearchBar from "../searchBar/SearchBar";
import NavBar from "../../containers/navBar/NavBar";

import styles from "./Header.module.scss";

const Header = () => {
    const [showNav, setShowNav] = useState(false);

    const handleShowNav = () => {
        setShowNav(!showNav);
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        if (!mediaQuery.matches) {
            setShowNav(false);
        }

        const handleResize = () => {
            if (!mediaQuery.matches) {
                setShowNav(false);
            }
        };

        mediaQuery.addListener(handleResize);
        return () => mediaQuery.removeListener(handleResize);
    }, []);

    const redditIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="45"
            viewBox="0 0 50 50"
        >
            <g transform="translate(1.41 1.41) scale(.5)">
                <circle cx="45" cy="45" r="45" className={styles.icon} />
                <path
                    fill="#ffffff"
                    d="M75.011 45c-.134-3.624-3.177-6.454-6.812-6.331-1.611.056-3.143.716-4.306 1.823-5.123-3.49-11.141-5.403-17.327-5.537l2.919-14.038 9.631 2.025c.268 2.472 2.483 4.262 4.955 3.993 2.472-.268 4.262-2.483 3.993-4.955s-2.483-4.262-4.955-3.993c-1.421.145-2.696.973-3.4 2.204l-11.139-2.329c-.749-.168-1.499.302-1.667 1.063 0 .011 0 .011 0 .022l-3.322 15.615c-6.264.101-12.36 2.025-17.55 5.537-2.64-2.483-6.801-2.36-9.284.291-2.483 2.64-2.36 6.801.291 9.284.515.481 1.107.895 1.767 1.186-.045.66-.045 1.32 0 1.98 0 10.078 11.745 18.277 26.23 18.277s26.23-8.188 26.23-18.277c.045-.66.045-1.32 0-1.98.045-1.08-1.376-3.407-1.422-5.91zM30.011 49.508c0-2.483 2.025-4.508 4.508-4.508s4.508 2.025 4.508 4.508-2.025 4.508-4.508 4.508c-2.483 0-4.508-1.991-4.508-4.508zm26.141 12.55v-.179c-3.199 2.405-7.114 3.635-11.119 3.468-4.005.168-7.919-1.063-11.119-3.468-.425-.515-.347-1.286.168-1.711.447-.369 1.085-.369 1.544 0 2.707 1.98 6.007 2.987 9.362 2.83 3.356.179 6.667-.783 9.407-2.74.492-.481 1.297-.47 1.779.022.514.492.503 1.297.011 1.778zm-.615-7.718c-.078 0-.145 0-.224 0l.034-.168c-2.483 0-4.508-2.025-4.508-4.508s2.025-4.508 4.508-4.508 4.508 2.025 4.508 4.508-1.935 2.091-4.418 2.192z"
                />
            </g>
        </svg>
    );
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
                    className={`material-symbols-outlined ${styles.navbar}`}
                >
                    menu
                </span>
            ) : (
                <span
                    onClick={handleShowNav}
                    class={`material-symbols-outlined ${styles.navbar}`}
                >
                    close
                </span>
            )}
            <div className={styles.logoContainer}>
                {redditIcon}{" "}
                <h1 className={styles.logo}>
                    <span className={styles.colored}>Reddit</span>4Code
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
