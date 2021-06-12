import "./userdetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { userDet } from "./userdetails.types";
import { Navbar, Post } from "../../Components";
import Loader from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { getID, LogOut } from "../../features/auth/authSlice";
import { FollowModal } from "../../Components/FollowModal/FollowModal"
import { ToastContainer } from 'react-toastify';
export const UserDetails = () => {
  const [utilsState, setUtilsState] = useState(false);
  const [saveClick, setSaveState] = useState({ screen: "none", box: "none" });
  const id = new URLSearchParams(useLocation().search).get("id");
  const [user_det, setUserDetails] = useState<userDet>();
  const [tabs, setTabs] = useState(1);
  const [update, setUpdate] = useState(false)
  const userID = useSelector(getID);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    (async function () {
      if (id) {
        const response = await axios.post<userDet>(
          "https://author-book-server.herokuapp.com/user/get-user-details",
          { _id: id }
        );
        setUserDetails(response.data);
      }
    })();
  }, [update, id]);
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
                {user_det?.url ? <a href={user_det.url}>{user_det.url}</a> : ""}
              </div>
            </div>
            <div className="followers"
              onClick={() => {
                setSaveState({ screen: "flex", box: "block" });
                setTabs(1)
              }}>
              <h3>Followers</h3>
              <p>{user_det?.followers.length}</p>
            </div>
            <div className="following"
              onClick={() => {
                setSaveState({ screen: "flex", box: "block" });
                setTabs(2)
              }}
            >
              <h3>Following</h3>
              <p>{user_det?.following.length}</p>
            </div>
            <div className="route-icons">
              {user_det._id === userID ? (
                <FontAwesomeIcon
                  icon={faEllipsisV}
                  className="edit-icon"
                  onClick={() => setUtilsState(true)}
                />
              ) : (
                ""
              )}
              {user_det._id === userID ? (
                <div
                  id="icon-utils"
                  tabIndex={1}
                  className="icon-utils"
                  style={{ display: utilsState ? "block" : "none" }}
                >
                  <p
                    className="utils"
                    onClick={() => navigate("/update-details?tab=2")}
                  >
                    Update user details
                  </p>
                  <hr />
                  <p
                    className="utils"
                    onClick={() => navigate("/update-details?tab=1")}
                  >
                    Update account details
                  </p>
                  <hr />
                  <p
                    className="utils"
                    onClick={() => {
                      dispatch(LogOut())
                      navigate("/login")
                    }}
                  >
                    Log Out
                  </p>
                  <hr />
                  <p className="utils" onClick={() => setUtilsState(false)}>
                    Close
                  </p>
                </div>
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
            {user_det?.url ? <a href={user_det.url}>{user_det.url}</a> : ""}
          </div>
          <div className="all-posts">
            {user_det?.posts.map(
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
            )}
          </div>
        </div>
      ) : (
        <div className="spinner">
          <Loader type="Oval" color="#00BFFF" height={50} width={50} />
        </div>
      )}
    </div>
  );
};
