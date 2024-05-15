import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
    removeUserData,
    selectCurrentUser,
} from "../../redux/features/userData";

import { logout } from "../../services/authService";

import SearchBar from "../searchBar/SearchBar";
import NavBar from "../../containers/navBar/NavBar";

import styles from "./Header.module.scss";

import logo from "../../assets/images/readIt4Code_logo.jpg";
import { selectCurrentSubreddit } from "../../redux/features/subredditData/subredditDataSlice";

const Header = ({ subredditList }) => {
    const [showNav, setShowNav] = useState(false);
    const [userName, setUserName] = useState(null);
    const currentSubreddit = useSelector(selectCurrentSubreddit);

    const userData = useSelector(selectCurrentUser);

    const handleShowNav = () => {
        setShowNav(!showNav);
        window.scrollTo(0, 0);
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

    useEffect(() => {
        if (userData) {
            setUserName(userData.name);
        }
    }, [userData]);

    const handleLogout = () => {
        removeUserData();
        logout();
    };

    return (
        <header className={styles.Header}>
            <div className={styles.subreddit}>
                {userName !== null && (
                    <div className={styles.login}>
                        <p
                            className={styles.userName}
                        >{`Logged in as ${userName}`}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}

                <h2>{currentSubreddit && `/r/${currentSubreddit}`}</h2>
            </div>
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
                subredditList={subredditList}
                handleClick={() => handleShowNav()}
                className={`${styles.navbarList} ${
                    showNav ? styles.visible : styles.disabled
                }`}
            />
        </header>
    );
};

export default Header;
