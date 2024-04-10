import React from "react";

import SearchBar from "../../components/searchBar/SearchBar";

const Header = () => {
    return (
        <header>
            <h2>Current Subreddit Name</h2>
            <SearchBar />
            <h1>Reddit4Code</h1>
        </header>
    );
};

export default Header;
