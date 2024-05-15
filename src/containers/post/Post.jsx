import React, { useState } from "react";

import styles from "./Post.module.scss";

import testImage from "../../assets/images/pexels-pixabay-259984.jpg";

import { FormatLocalDate } from "../../utils/utils";
import CommentList from "../../components/commentList/CommentList";

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

const Post = ({ className, post }) => {
    const postName = decodeHtml(post.data.title);
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
                <p>
                    {post.data.downs > 1
                        ? `-${post.data.downs}`
                        : post.data.ups}
                </p>
                <span
                    className={`material-symbols-outlined ${styles.Post__arrows__downvote}`}
                >
                    arrow_downward
                </span>
            </div>
            <div className={`${styles.Post__image} ${styles.big}`}>
                {post.data.media !== null && (
                    // <div className={styles.imageContainer}>
                    //     {decodeURIComponent(post.data.media.oembed.html)}
                    //     {console.log(post.data.media)}
                    // </div>
                    <div
                        className={styles.imageContainer}
                        dangerouslySetInnerHTML={{
                            __html: decodeHtml(
                                decodeURIComponent(post.data.media.oembed.html)
                            ),
                        }}
                    />
                )}

                <a href={post.data.url}>{post.data.url}</a>
                <p>{post.data.selftext}</p>
            </div>
            <div className={`${styles.Post__date} ${styles.small}`}>
                <p>{FormatLocalDate(post.data.created)}</p>
            </div>
            <div className={`${styles.Post__author} ${styles.small}`}>
                <p>{post.data.author}</p>
            </div>
            <div
                className={`${styles.Post__comments} ${styles.small}`}
                onClick={() => setShowComments(!showComments)}
            >
                <span className="material-symbols-outlined">chat_bubble</span>
                <p>{commentCount}</p>
            </div>
            <CommentList
                parentClassName={`${
                    showComments ? styles.visible : styles.hidden
                } ${styles.commentList}`}
            />
        </div>
    );
};

export default Post;
