import React, { useState } from "react";

import styles from "./Post.module.scss";

import testImage from "../../assets/images/pexels-pixabay-259984.jpg";

import { FormatLocalDate } from "../../utils/utils";
import CommentList from "../../components/commentList/CommentList";

const Post = ({ className }) => {
    const postName =
        "A coder at work on their spaghetti code. Sometimes these titles can be waaaay longer than expected. If you're not careful, you might end up with a title that's too long for the card. And if I add more and more and more.";

    const postText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

    const votes = 100;

    const author = "ZzWingManzZ";

    const commentCount = 55;

    const [showComments, setShowComments] = useState(false);

    return (
        <div className={`${className} ${styles.Post}`}>
            <h2 className={`${styles.Post__name} ${styles.small}`}>
                {postName}
            </h2>
            <div className={`${styles.Post__arrows} ${styles.big}`}>
                <span
                    className={`material-symbols-outlined ${styles.Post__arrows__upvote}`}
                >
                    arrow_upward
                </span>
                <p>{votes}</p>
                <span
                    className={`material-symbols-outlined ${styles.Post__arrows__downvote}`}
                >
                    arrow_downward
                </span>
            </div>
            <div className={`${styles.Post__image} ${styles.big}`}>
                <div className={styles.imageContainer}>
                    <img src={testImage} />
                </div>
                <p>{postText}</p>
            </div>
            <div className={`${styles.Post__date} ${styles.small}`}>
                <p>{FormatLocalDate(new Date())}</p>
            </div>
            <div className={`${styles.Post__author} ${styles.small}`}>
                <p>{author}</p>
            </div>
            <div
                className={`${styles.Post__comments} ${styles.small}`}
                onClick={() => setShowComments(!showComments)}
            >
                <span className="material-symbols-outlined">chat_bubble</span>
                <p>{commentCount}</p>
            </div>
            <CommentList
                parentClassName={showComments ? styles.visible : styles.hidden}
            />
        </div>
    );
};

export default Post;
