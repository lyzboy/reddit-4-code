import React from "react";

import Comment from "../comment/Comment";

import styles from "./CommentList.module.scss";

const CommentList = ({ parentClassName }) => {
    return (
        <div className={`${parentClassName} ${styles.CommentList}`}>
            <h3 className={`${styles.title}`}>Comments</h3>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
        </div>
    );
};

export default CommentList;
