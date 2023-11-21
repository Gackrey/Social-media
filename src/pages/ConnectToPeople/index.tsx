import "./index.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getID,
  getStatus,
  getUserFollowingList,
  getUserFollowerList,
  followUser,
} from "@writter/redux/actions";
import { users, resUser } from "@writter/redux/models";
import { useAppSelector } from "@writter/redux/hooks";
import { successToast, infoToast } from "@writter/core";
import { Link } from "react-router-dom";
import { API_URL } from "@writter/constants";

export const ConnectToPeople = () => {
  const userID = useSelector(getID);
  const followingList = useSelector(getUserFollowingList);
  const followerList = useSelector(getUserFollowerList);
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const user_status = useSelector(getStatus);
  const [user_list, setUserList] = useState<users[]>();
  useEffect(() => {
    (async function () {
      const response = await axios.get<resUser>(
        `${API_URL}/user/show-all-users`
      );
      setUserList(response.data.results);
    })();
  }, []);

  function isAlreadyFollowed(user_id: string): boolean {
    const ispresent = followingList.filter(
      (followed) => followed.userID === user_id
    );
    if (ispresent.length > 0) return false;
    else return true;
  }
  function hasFollowedUser(user_id: string): boolean {
    const ispresent = followerList.filter(
      (followed) => followed.userID === user_id
    );
    if (ispresent.length > 0) return true;
    else return false;
  }
  async function followHandler(
    _id: string,
    firstname: string,
    lastname: string,
    profile_pic: string
  ) {
    infoToast(`Adding ${firstname} ${lastname} to your network`);
    await dispatch(
      followUser({ _id, firstname, lastname, profile_pic, token })
    );
    successToast(`Added ${firstname} ${lastname} to your network`);
  }
  return user_status === "done" ? (
    <div>
      <h2 className="heading-ctp">People you may know</h2>
      <div className="people-list">
        {user_list?.map((user) => {
          if (user._id !== userID && isAlreadyFollowed(user._id))
            return (
              <div className="user-box">
                <Link to={`/user-details?id=${user._id}`}>
                  <img
                    src={user.profile_pic}
                    className="user-profile"
                    alt="profile"
                  />
                </Link>
                <div className="all-user-details">
                  <h4>
                    {user.firstname} {user.lastname}
                  </h4>
                  <p>{user.followers.length} followers</p>
                </div>
                <button
                  className="btn-follow"
                  onClick={() =>
                    followHandler(
                      user._id,
                      user.firstname,
                      user.lastname,
                      user.profile_pic
                    )
                  }
                >
                  {hasFollowedUser(user._id) ? "Follow back" : "Follow"}
                </button>
              </div>
            );
          else return "";
        })}
      </div>
    </div>
  ) : (
    <p></p>
  );
};
