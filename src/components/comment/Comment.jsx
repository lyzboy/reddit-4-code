import React from "react";

import styles from "./Comment.module.scss";

const Comment = () => {
    return (
        <div className={styles.Comment}>
            <h4 className={styles.userName}>User Name</h4>
            <p className={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </div>
    );
};

export default Comment;
