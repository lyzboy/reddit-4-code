import React from "react";

import styles from "./SearchBar.module.scss";

const SearchBar = ({ className }) => {
    return (
        <div className={`${className} ${styles.SearchBar}`}>
            <input
                className={styles.input}
                type="text"
                placeholder="Search..."
            />
        </div>
    );
};

export default SearchBar;
