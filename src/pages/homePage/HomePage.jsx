import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import {
    redirectToRedditAuth,
    extractToken,
    verifyTokenExpirationValid,
} from "../../services/authService";
import { fetchNewPosts, fetchUserData } from "../../services/redditServices";

import { subredditList } from "../../utils/utils";

import PostList from "../../containers/postList/PostList";
import NavBar from "../../containers/navBar/NavBar";

import styles from "./HomePage.module.scss";
import { addUserData } from "../../redux/features/userData";
import {
    updateCurrentSubreddit,
    updatePosts,
    selectCurrentSubreddit,
    selectPosts,
} from "../../redux/features/subredditData/subredditDataSlice";

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    const [showNav, setShowNav] = useState(false);
    const [token, setToken] = useState(null);
    const currentSubreddit = useSelector(selectCurrentSubreddit);

    useEffect(() => {
        async function authenticate() {
            try {
                const accessToken = extractToken();
                if (!accessToken || !verifyTokenExpirationValid()) {
                    await redirectToRedditAuth();
                } else {
                    setToken(accessToken);
                    const userData = await fetchUserData(accessToken);
                    dispatch(addUserData(userData));
                    const subreddit = "programming"; // replace with the subreddit you want
                    dispatch(updateCurrentSubreddit(subreddit));
                    navigate(`/${subreddit}`);
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
                const newPosts = await fetchNewPosts(currentSubreddit, token);
                console.log(newPosts);
                dispatch(updatePosts(newPosts.data.children));
            } catch (error) {
                console.error(
                    `Failed to fetch new posts from ${currentSubreddit}:`,
                    error
                );
            }
        }

        fetchData();
    }, [currentSubreddit]);

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
                handleClick={() => {
                    window.scrollTo(0, 0);
                    console.log("Not mobile nav");
                }}
                subredditList={subredditList}
                className={`mainNavBar  ${styles.nav} ${
                    showNav ? styles.visible : styles.disabled
                }`}
            />
        </div>
    );
};

export default HomePage;
