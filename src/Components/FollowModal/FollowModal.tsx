import "./followmodal.css"
import { useState, useEffect } from "react";
import { followModalType } from "./followmodal.types"
import { useSelector, useDispatch } from "react-redux";
import { getUserFollowingList, unFollowUser } from "../../features/auth/authSlice";
import { useAppSelector } from "../../app/hooks";
import { successToast, infoToast } from "../../Components/Toast/Toast";
export const FollowModal = ({ tabs, following, follower, state, setUpdate }: followModalType) => {
    const [currTab, setCurrTab] = useState(tabs)
    const [boxDisplay, setBoxDisplay] = useState(state.box)
    const [ScreenDisplay, setScreenDisplay] = useState(state.screen)
    const followingList = useSelector(getUserFollowingList);
    const { token } = useAppSelector((state) => state.auth);
    const dispatch = useDispatch()
    useEffect(() => {
        setBoxDisplay(state.box);
        setScreenDisplay(state.screen)
        setCurrTab(tabs)
    }, [tabs, state]);
    function closeModal() {
        setBoxDisplay("none");
        setScreenDisplay("none");
    }
    function isAlreadyFollowed(user_id: string): boolean {
        const ispresent = followingList.filter(followed => followed.userID === user_id)
        if (ispresent.length > 0)
            return true
        else
            return false
    }
    async function unfollowHandler(_id: string, name: string) {
        infoToast(`Removing ${name} from your network`)
        await dispatch(unFollowUser({ _id, token }))
        setUpdate(true)
        successToast(`Added ${name} from your network`)
    }
    return (
        <div className="modal-follow-bg" style={{ display: ScreenDisplay }}>
            <div className="inner-follow-modal" style={{ display: boxDisplay }}>
                <div className="post-tabs">
                    <button
                        className={currTab === 1 ? "btn-tab active" : "btn-tab"}
                        onClick={() => setCurrTab(1)}
                    > Followers
                    </button>
                    <button
                        className={currTab === 2 ? "btn-tab active" : "btn-tab"}
                        onClick={() => setCurrTab(2)}
                    > Following
                    </button>
                </div>
                {
                    currTab === 1 ?
                        follower.length > 0 ?
                            follower.map(user => {
                                return <div className="user-box">
                                    <img src={user.profile_pic} className="profile" alt="profile" />
                                    <h3>{user.name}</h3>
                                </div>
                            })
                            : <p>No Users found</p>
                        : ""
                }
                {
                    currTab === 2 ?
                        following.length > 0 ?
                            following.map(user => {
                                return <div className="user-box">
                                    <img src={user.profile_pic} className="profile" alt="profile" />
                                    <h3>{user.name}</h3>
                                    {
                                        isAlreadyFollowed(user.userID) ?
                                            <button
                                                className="btn-unfollow"
                                                onClick={() => unfollowHandler(user.userID, user.name)}
                                            >Unfollow</button> : ""
                                    }
                                </div>
                            })
                            : <p>No Users found</p>
                        : ""
                }
                <button className="btn-close" onClick={closeModal}>Close</button>
            </div>
        </div>
    );
}

