import React, { useState, useEffect } from "react";

import Post from "../../containers/post/Post";
import NavBar from "../../containers/navBar/NavBar";

import styles from "./HomePage.module.scss";

const HomePage = () => {
    const [showNav, setShowNav] = useState(false);

    const handleShowNav = () => {
        setShowNav(!showNav);
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        const handleResize = () => {
            setShowNav(!mediaQuery.matches);
        };

        // Initial check and setting of setShowNav
        handleResize();

        mediaQuery.addEventListener("change", handleResize);

        // Cleanup function
        return () => {
            mediaQuery.removeEventListener("change", handleResize);
        };
    }, []);

    return (
        <div className={styles.HomePage}>
            <Post className={styles.postList} />

            <NavBar
                className={`${styles.nav} ${
                    showNav ? styles.visible : styles.disabled
                }`}
            />
        </div>
    );
};

export default HomePage;
