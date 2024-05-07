import React from "react";

import Post from "../post/Post";

import styles from "./PostList.module.scss";

const PostList = () => {
    return (
        <div className={`${styles.PostList}`}>
            <Post className={""} />
            <Post className={""} />
            <Post className={""} />
            <Post className={""} />
        </div>
    );
};

export default PostList;
