import "./index.css";
import { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getID,
  getStatus,
  getUserFollowingList,
  getUserFollowerList,
  followUser,
} from "@writter/redux/actions";
import { useAppSelector } from "@writter/redux/hooks";
import { successToast, infoToast } from "@writter/core";
import { Link } from "react-router-dom";
import { getUserLoadStatus, getUsersList } from "@writter/redux/actions/people";
import { FriendDesktopSkeleton, FriendMobileSkeleton } from "../Skeleton";

export const ConnectToPeople = () => {
  const userID = useSelector(getID);
  const followingList = useSelector(getUserFollowingList);
  const followerList = useSelector(getUserFollowerList);
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const userStatus = useSelector(getStatus);
  const userList = useSelector(getUsersList);
  const loadingState = useSelector(getUserLoadStatus);

  const isAlreadyFollowed = useCallback(
    (user_id: string): boolean => {
      const ispresent = followingList.filter(
        (followed) => followed.userID === user_id
      );
      if (ispresent.length > 0) return false;
      else return true;
    },
    [followingList]
  );

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

  const getUsersToShow = useMemo(() => {
    if (userList && userList?.length) {
      const filteredUserList = userList?.filter(
        (user) => user._id !== userID && isAlreadyFollowed(user._id)
      );
      return filteredUserList;
    } else return [];
  }, [userList, userID, isAlreadyFollowed]);

  return (
    <div>
      <h2 className="heading-ctp">People you may know</h2>
      {userStatus === "done" && loadingState === "done" ? (
        <div
          className={`people-list ${
            getUsersToShow.length > 3 ? "people-list-morethan-3" : ""
          }`}
        >
          {getUsersToShow?.map((user) => (
            <div className="user-box" key={`user-${user._id}`}>
              <Link to={`/user-details?id=${user._id}`}>
                <img
                  src={user.profile_pic}
                  className="user-profile-img"
                  alt="profile"
                />
              </Link>
              <div className="user-content-box">
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
            </div>
          ))}
        </div>
      ) : window.innerWidth > 768 ? (
        <>
          <FriendDesktopSkeleton /> <FriendDesktopSkeleton />
        </>
      ) : (
        <>
          <FriendMobileSkeleton /> <FriendMobileSkeleton />
        </>
      )}
    </div>
  );
};
