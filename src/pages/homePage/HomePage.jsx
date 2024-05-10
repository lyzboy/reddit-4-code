import React, { useState, useEffect } from "react";
import {
    redirectToRedditAuth,
    extractToken,
    verifyTokenExpirationValid,
} from "../../services/authService";
import { fetchNewPosts } from "../../services/redditServices";

import PostList from "../../containers/postList/PostList";
import NavBar from "../../containers/navBar/NavBar";

import styles from "./HomePage.module.scss";

const HomePage = () => {
    const [showNav, setShowNav] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        async function authenticate() {
            try {
                const accessToken = extractToken();
                if (!accessToken || !verifyTokenExpirationValid()) {
                    await redirectToRedditAuth();
                } else {
                    setToken(accessToken);
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        }
        authenticate();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const newPosts = await fetchNewPosts("code", token);
                console.log(newPosts);
            } catch (error) {
                console.error("Failed to fetch new posts:", error);
            }
        }

        fetchData();
    }, [token]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        /**
         * Handles the resize event and adjusts the layout based on the media query match.
         */
        const handleResize = () => {
            // Set the value of showNav based on the media query match
            setShowNav(!mediaQuery.matches);
            adjustPostListMargin(mediaQuery.matches);
        };

        /**
         * Adjusts the margin-top of the postList based on the media query match due to the fixed header position.
         */
        const adjustPostListMargin = (matches) => {
            // Get the postList and header elements
            const postListElement = document.querySelector(".postList");
            const headerElement = document.querySelector("header");

            // Adjust the margin-top of the postList based on the media query match
            if (matches) {
                // Check if headerElement and postListElement are not null before accessing clientHeight
                if (headerElement && postListElement) {
                    const navBarHeight = headerElement.clientHeight;
                    postListElement.style.marginTop = `${navBarHeight}px`;
                }
            } else {
                if (postListElement) {
                    postListElement.style.marginTop = "0";
                }
            }
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
            <PostList parentClassName="postList" />

            <NavBar
                className={`mainNavBar  ${styles.nav} ${
                    showNav ? styles.visible : styles.disabled
                }`}
            />
        </div>
    );
};

export default HomePage;
