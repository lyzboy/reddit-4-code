import React from "react";

import Comment from "../comment/Comment";

const CommentList = ({ parentClassName }) => {
    return (
        <div className={parentClassName}>
            <h3>Comments</h3>
            <Comment />
        </div>
    );
};

export default CommentList;
