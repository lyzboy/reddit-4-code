import React, { useState, useEffect } from "react";

import PostList from "../../containers/postList/PostList";
import NavBar from "../../containers/navBar/NavBar";

import styles from "./HomePage.module.scss";

const HomePage = () => {
    const [showNav, setShowNav] = useState(false);

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
            <PostList />

            <NavBar
                className={`${styles.nav} ${
                    showNav ? styles.visible : styles.disabled
                }`}
            />
        </div>
    );
};

export default HomePage;
