import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectAllUserData } from "../../redux/features/userData";

import SearchBar from "../searchBar/SearchBar";
import NavBar from "../../containers/navBar/NavBar";

import styles from "./Header.module.scss";

import logo from "../../assets/images/readIt4Code_logo.jpg";

const Header = ({ subredditList }) => {
    const [showNav, setShowNav] = useState(false);
    const [userName, setUserName] = useState(null);

    const userData = useSelector(selectAllUserData);

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
        if (userData.length > 0) {
            setUserName(userData[0].name);
        }

        return () => {
            mediaQuery.removeEventListener("change", handleResize);
        };
    }, []);

    return (
        <header className={styles.Header}>
            {
                // TODO: use store.state to set the current subreddit name
            }
            <div className={styles.subreddit}>
                {userName !== null && (
                    <div className={styles.login}>
                        <p
                            className={styles.userName}
                        >{`Logged in as ${userName}`}</p>
                        <button>Logout</button>
                    </div>
                )}

                <h2>
                    Current Subreddit Name going to make it super long to see
                    how it fits
                </h2>
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
