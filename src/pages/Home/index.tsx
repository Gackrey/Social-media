import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  Navbar,
  AddPost,
  Post,
  PostSkeleton,
  ConnectToPeople,
} from "@writter/core";
import {
  getLoadStatus,
  getPosts,
  getAllPost,
  getUsers,
} from "@writter/redux/actions";
import { getID, getStatus, getUserData } from "@writter/redux/actions";
import { postState } from "@writter/redux/models";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();
  const posts = useSelector(getPosts);
  const loadStatus = useSelector(getLoadStatus);
  const userStatus = useSelector(getStatus);
  const dispatch = useDispatch();
  const userID = useSelector(getID);
  const [allPosts, setPosts] = useState<Array<postState>>([]);
  const [userLoadingStatus, setPostLoadStatus] = useState("");
  const [postLoadingStatus, setUserLoadStatus] = useState("");
  const localData = localStorage?.getItem("Authorbook");
  const isUserLogin = useRef(false);

  if (localData) {
    const loginStatus = JSON.parse(localData);
    isUserLogin.current = loginStatus?.isUserLoggedIn;
  }

  useEffect(() => {
    if (userID) {
      (async function () {
        await dispatch(getUserData({ _id: userID }));
      })();
    } else if (!isUserLogin.current) {
      navigate("/login");
    }
  }, [navigate, dispatch, userID]);

  useEffect(() => {
    (async function () {
      await dispatch(getUsers());
      await dispatch(getAllPost());
    })();
  }, [dispatch]);

  useEffect(() => {
    setPosts(posts);
    setPostLoadStatus(loadStatus);
    setUserLoadStatus(userStatus);
  }, [posts, loadStatus, userStatus]);

  return (
    <div className="home">
      <Navbar />
      <ToastContainer />
      <div className="home-body">
        <div className="home-innerbody-1">
          <AddPost />
          <div className="mobile-home-innerbody-2">
            <ConnectToPeople />
          </div>
          {postLoadingStatus === "loading" ||
          userLoadingStatus === "loading" ? (
            <>
              <div>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </div>
            </>
          ) : (
            <div className="all-posts">
              {allPosts.length > 0 ? (
                allPosts.map(
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
                      _id={_id}
                      description={description}
                      picture={picture}
                      owner={owner}
                      liked_by={liked_by}
                      comments={comments}
                      createdAt={createdAt}
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
        <div className="home-innerbody-2">
          <ConnectToPeople />
        </div>
      </div>
    </div>
  );
};
