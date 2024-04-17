import React from "react";

import styles from "./Post.module.scss";

import testImage from "../../assets/images/pexels-pixabay-259984.jpg";

const Post = ({ className }) => {
    return (
        <div className={`${className} ${styles.Post}`}>
            <h2
                className={`${styles.Post__name} ${styles.testBox} ${styles.small}`}
            >
                Post
            </h2>
            <div
                className={`${styles.Post__arrows} ${styles.testBox} ${styles.big}`}
            >
                <p>Arrows</p>
            </div>
            <div
                className={`${styles.Post__image} ${styles.testBox} ${styles.big}`}
            >
                <div className={styles.imageContainer}>
                    <img src={testImage} />
                </div>
                <p>This is the writing for the post</p>
            </div>
            <div
                className={`${styles.Post__date} ${styles.testBox} ${styles.small}`}
            >
                <p>Date</p>
            </div>
            <div
                className={`${styles.Post__author} ${styles.testBox} ${styles.small}`}
            >
                <p>Author</p>
            </div>
            <div
                className={`${styles.Post__comments} ${styles.testBox} ${styles.small}`}
            >
                <p>Comments</p>
            </div>
        </div>
    );
};

export default Post;
