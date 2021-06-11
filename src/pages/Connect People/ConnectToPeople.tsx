import "./connect.css"
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getID, getUserFollowingList, getUserFollowerList, followUser } from "../../features/auth/authSlice";
import { users, resUser } from "./connect.types"
import { useAppSelector } from "../../app/hooks";
import { successToast, infoToast } from "../../Components/Toast/Toast";
export const ConnectToPeople = () => {
    const userID = useSelector(getID);
    const followingList = useSelector(getUserFollowingList);
    const followerList = useSelector(getUserFollowerList);
    const { token } = useAppSelector((state) => state.auth);
    const dispatch = useDispatch()
    const [user_list, setUserList] = useState<users[]>()
    useEffect(() => {
        (async function () {
            const response = await axios.get<resUser>(
                "https://author-book-server.herokuapp.com/user/show-all-users",
            )
            setUserList(response.data.results);
        })()
    }, []);

    function isAlreadyFollowed(user_id: string): boolean {
        const ispresent = followingList.filter(followed => followed.userID === user_id)
        if (ispresent.length > 0)
            return false
        else
            return true
    }
    function hasFollowedUser(user_id: string): boolean {
        const ispresent = followerList.filter(followed => followed.userID === user_id)
        if (ispresent.length > 0)
            return true
        else
            return false
    }
    async function followHandler(_id: string, firstname: string, lastname: string, profile_pic: string) {
        infoToast(`Adding ${firstname} ${lastname} to your network`)
        await dispatch(followUser({ _id, firstname, lastname, profile_pic, token }))
        successToast(`Added ${firstname} ${lastname} to your network`)
    }
    return (
        <div>
            <h2>People you may know</h2>
            <div>
                {
                    user_list?.map(user => {
                        if (user._id !== userID && isAlreadyFollowed(user._id))
                            return <div className="user-box">
                                <img src={user.profile_pic} className="user-profile" alt="profile" />
                                <div className="all-user-details">
                                    <h4>{user.firstname} {user.lastname}</h4>
                                    <p>{user.followers.length} followers</p>
                                </div>
                                <button className="btn-follow"
                                    onClick={
                                        () => followHandler(user._id, user.firstname, user.lastname, user.profile_pic)
                                    }
                                >
                                    {hasFollowedUser(user._id) ? "Follow back" : "Follow"}
                                </button>
                            </div>
                        else return ""
                    })
                }
            </div>
        </div>
    );
}

