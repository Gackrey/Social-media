import "./index.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { userDet } from "@writter/redux/models";
import { Navbar, Post, FollowModal } from "@writter/core";
import { useSelector, useDispatch } from "react-redux";
import { getID, LogOut } from "@writter/redux/actions";
import { ToastContainer } from "react-toastify";
import { API_URL } from "@writter/constants";
import MoreOptions from "@writter/core/MoreOptions";
import { UserPageSkeleton } from "@writter/core/Skeleton";

export const UserDetails = () => {
  const [saveClick, setSaveState] = useState({ screen: "none", box: "none" });
  const id = new URLSearchParams(useLocation().search).get("id");
  const [user_det, setUserDetails] = useState<userDet>();
  const [tabs, setTabs] = useState(1);
  const [update, setUpdate] = useState(false);
  const userID = useSelector(getID);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      if (id) {
        const response = await axios.post<userDet>(
          `${API_URL}/user/get-user-details`,
          { _id: id }
        );
        setUserDetails(response.data);
      }
    })();
  }, [update, id]);

  const onLogOut = () => {
    dispatch(LogOut());
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      {user_det ? (
        <div className="user-details-page">
          <div className="user-details-box">
            <div className="name-images">
              <img
                src={user_det?.profile_pic}
                className="profile"
                alt="profile pic"
              />

              <div className="more-details">
                <h3>
                  {user_det?.firstname} {user_det?.lastname}
                </h3>
                <p>{user_det?.bio}</p>
                {user_det?.url ? (
                  <a
                    href={
                      user_det.url.slice(0, 4) === "http"
                        ? user_det.url
                        : `http://${user_det.url}`
                    }
                  >
                    {user_det.url}
                  </a>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div
              className="followers"
              onClick={() => {
                setSaveState({ screen: "flex", box: "block" });
                setTabs(1);
              }}
            >
              <h3>Followers</h3>
              <p>{user_det?.followers.length}</p>
            </div>
            <div
              className="following"
              onClick={() => {
                setSaveState({ screen: "flex", box: "block" });
                setTabs(2);
              }}
            >
              <h3>Following</h3>
              <p>{user_det?.following.length}</p>
            </div>
            <div className="route-icons">
              {user_det._id === userID ? (
                <MoreOptions
                  options={[
                    {
                      title: " Update Account Details",
                      callback: () => navigate("/update-details?tab=1"),
                    },
                    {
                      title: "Update User Details",
                      callback: () => navigate("/update-details?tab=2"),
                    },
                    {
                      title: "Log Out",
                      isDanger: true,
                      callback: onLogOut,
                    },
                  ]}
                />
              ) : (
                ""
              )}
            </div>
            <FollowModal
              tabs={tabs}
              following={user_det.following}
              follower={user_det.followers}
              state={saveClick}
              setUpdate={setUpdate}
            />
          </div>
          <div className="more-details-mobile">
            <h3>
              {user_det?.firstname} {user_det?.lastname}
            </h3>
            <p>{user_det?.bio}</p>
            {user_det?.url ? (
              <a
                href={
                  user_det.url.slice(0, 4) === "http"
                    ? user_det.url
                    : `http://${user_det.url}`
                }
              >
                {user_det.url}
              </a>
            ) : (
              ""
            )}
          </div>
          <div className="all-posts">
            {user_det.posts.length > 0 ? (
              user_det?.posts.map(
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
                    postType="user"
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
              <span className="no-posts-msg">No posts to display</span>
            )}
          </div>
        </div>
      ) : (
        <div>
          <UserPageSkeleton />
        </div>
      )}
    </div>
  );
};
