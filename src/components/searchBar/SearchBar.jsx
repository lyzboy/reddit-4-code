import React from "react";

const SearchBar = ({ className }) => {
    return (
        <div className={className}>
            <input type="text" placeholder="Search..." />
        </div>
    );
};

export default SearchBar;
