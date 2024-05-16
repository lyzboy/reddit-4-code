import React from "react";

import Post from "../post/Post";

import styles from "./PostList.module.scss";
import { useSelector } from "react-redux";
import { selectPosts } from "../../redux/features/subredditData/subredditDataSlice";

const PostList = ({ parentClassName }) => {
    const posts = useSelector(selectPosts);
    return (
        <div className={`${parentClassName} ${styles.PostList}`}>
            {posts.map((post) => (
                <Post key={post.data.id} className={""} post={post} />
            ))}
        </div>
    );
};

export default PostList;
