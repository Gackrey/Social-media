import { Navbar, Post, PostSkeleton } from "@writter/core";
import { getLoadStatus, getPosts, getSinglePost } from "@writter/redux/actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import "../Home/index.css";

export const SinglePost = () => {
  const posts = useSelector(getPosts);
  const params = useLocation();
  const l_status = useSelector(getLoadStatus);
  const searchQuery = new URLSearchParams(params.search).get("postId");
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      if (searchQuery) await dispatch(getSinglePost({ _id: searchQuery }));
    })();
  }, [searchQuery, dispatch]);

  return (
    <div className="bg-color">
      <Navbar />

      {l_status === "loading" ? (
        <div>
          <PostSkeleton />
        </div>
      ) : (
        <div className="home-body all-posts">
          {posts.length > 0 ? (
            posts.map(
              ({
                _id,
                description,
                picture,
                owner,
                liked_by,
                comments,
                createdAt,
              }) => (
                <Post
                  key={_id}
                  _id={_id}
                  description={description}
                  picture={picture}
                  owner={owner}
                  liked_by={liked_by}
                  comments={comments}
                  createdAt={createdAt}
                  postType="user"
                />
              )
            )
          ) : (
            <span className="no-posts-msg">
              Create Posts or follow users to see posts
            </span>
          )}
        </div>
      )}
    </div>
  );
};
