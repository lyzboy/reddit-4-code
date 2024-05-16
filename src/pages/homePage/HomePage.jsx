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
} from "../../redux/features/subredditData/subredditDataSlice";

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    const [showNav, setShowNav] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("accessToken"));
    const currentSubreddit = useSelector(selectCurrentSubreddit);

    useEffect(() => {
        const initializeUserAndNavigate = async (accessToken) => {
            setToken(accessToken);
            const userData = await fetchUserData(accessToken);
            dispatch(addUserData(userData));
            const subreddit = currentSubreddit
                ? currentSubreddit
                : "programming"; // replace with the subreddit you want
            dispatch(updateCurrentSubreddit(subreddit));
            navigate(`/${subreddit}`);
        };

        const authenticate = async () => {
            try {
                const accessToken = extractToken();
                if (!accessToken || !verifyTokenExpirationValid()) {
                    await redirectToRedditAuth();
                } else {
                    initializeUserAndNavigate(accessToken);
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        if (!token) {
            authenticate();
        } else if (!verifyTokenExpirationValid()) {
            authenticate();
        } else {
            initializeUserAndNavigate(token);
        }
    }, [token, dispatch, navigate]);

    useEffect(() => {
        if (currentSubreddit && token) {
            const fetchData = async () => {
                try {
                    const newPosts = await fetchNewPosts(
                        currentSubreddit,
                        token
                    );
                    dispatch(updatePosts(newPosts.data.children));
                } catch (error) {
                    console.error(
                        `Failed to fetch new posts from ${currentSubreddit}:`,
                        error
                    );
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("expirationTime");
                    navigate("/");
                }
            };

            fetchData();
        }
    }, [currentSubreddit, token, dispatch, navigate]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        const handleResize = () => {
            setShowNav(!mediaQuery.matches);
            adjustPostListMargin(mediaQuery.matches);
        };

        const adjustPostListMargin = (matches) => {
            const postListElement = document.querySelector(".postList");
            const headerElement = document.querySelector("header");

            if (matches) {
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

        handleResize();

        mediaQuery.addEventListener("change", handleResize);

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
