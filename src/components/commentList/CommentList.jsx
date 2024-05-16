import React from "react";
import Comment from "../comment/Comment";
import styles from "./CommentList.module.scss";

const CommentList = ({ parentClassName, comments }) => {
    return (
        <div className={`${parentClassName} ${styles.CommentList}`}>
            <h3 className={styles.title}>Comments</h3>
            {comments && comments.length > 0 ? (
                comments.map((comment) => (
                    <Comment
                        key={comment.data.id}
                        userName={comment.data.author}
                        comment={comment.data.body}
                    />
                ))
            ) : (
                <p>No comments available</p>
            )}
        </div>
    );
};

export default CommentList;
