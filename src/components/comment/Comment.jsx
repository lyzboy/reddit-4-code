import React from "react";
import styles from "./Comment.module.scss";

const Comment = ({ userName, comment }) => {
    return (
        <div className={styles.Comment}>
            <h4 className={styles.userName}>{userName}</h4>
            <p className={styles.text}>{comment}</p>
        </div>
    );
};

export default Comment;
