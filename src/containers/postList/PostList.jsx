import React from "react";

import Post from "../post/Post";

import styles from "./PostList.module.scss";

const PostList = ({ className }) => {
    return (
        <div className={`${className} ${styles.PostList}`}>
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    );
};

export default PostList;
