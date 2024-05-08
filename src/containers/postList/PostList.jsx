import React from "react";

import Post from "../post/Post";

import styles from "./PostList.module.scss";

const PostList = ({ parentClassName }) => {
    return (
        <div className={`${parentClassName} ${styles.PostList}`}>
            <Post className={""} />
            <Post className={""} />
            <Post className={""} />
            <Post className={""} />
        </div>
    );
};

export default PostList;
