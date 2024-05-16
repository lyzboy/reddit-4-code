import React, { useState } from "react";
import styles from "./Post.module.scss";
import { FormatLocalDate } from "../../utils/utils";
import CommentList from "../../components/commentList/CommentList";
import { fetchComments } from "../../services/redditServices";

function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

const Post = ({ className, post }) => {
    const postName = decodeHtml(post.data.title);
    const postText = post.data.selftext;
    const postMedia = post.data.media?.oembed?.html;
    const postUrl = post.data.url;
    const postDowns = post.data.downs;
    const postUps = post.data.ups;
    const postAuthor = post.data.author;
    const postCreated = post.data.created;
    const postCommentCount = post.data.num_comments;
    const postSubreddit = post.data.subreddit;
    const postId = post.data.id;

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const token = localStorage.getItem("accessToken");
    const handleToggleComments = async () => {
        if (!showComments) {
            try {
                console.log("Token before fetching comments:", token); // Debugging
                const fetchedComments = await fetchComments(
                    postSubreddit,
                    postId,
                    token
                );
                console.log(
                    "Fetched comments:",
                    fetchedComments[1].data.children
                );
                setComments(fetchedComments[1].data.children);
            } catch (error) {
                console.error("Failed to fetch comments:", error);
            }
        }
        setShowComments(!showComments);
    };

    return (
        <div className={`${className} ${styles.Post}`}>
            <h2 className={styles.Post__name}>{postName}</h2>
            <div className={styles.Post__arrows}>
                <span
                    className={`material-symbols-outlined ${styles.Post__arrows__upvote}`}
                >
                    arrow_upward
                </span>
                <p>{postDowns > 1 ? `-${postDowns}` : postUps}</p>
                <span
                    className={`material-symbols-outlined ${styles.Post__arrows__downvote}`}
                >
                    arrow_downward
                </span>
            </div>
            <div className={styles.Post__content}>
                {postMedia && (
                    <div
                        className={styles.Post__media}
                        dangerouslySetInnerHTML={{
                            __html: decodeHtml(decodeURIComponent(postMedia)),
                        }}
                    />
                )}
                {postUrl && (
                    <a className={styles.wrapText} href={postUrl}>
                        {postUrl}
                    </a>
                )}
                {postText && <p className={styles.wrapText}>{postText}</p>}
            </div>
            <div className={`${styles.Post__date} ${styles.small}`}>
                <p>{FormatLocalDate(postCreated)}</p>
            </div>
            <div className={`${styles.Post__author} ${styles.small}`}>
                <p>{postAuthor}</p>
            </div>
            <div
                className={`${styles.Post__comments} ${styles.small}`}
                onClick={handleToggleComments}
            >
                <span className="material-symbols-outlined">chat_bubble</span>
                <p>{postCommentCount}</p>
            </div>
            {showComments && (
                <CommentList
                    parentClassName={`${styles.visible} ${styles.commentList}`}
                    comments={comments}
                />
            )}
        </div>
    );
};

export default Post;
