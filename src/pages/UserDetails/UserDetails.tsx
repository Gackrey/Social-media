import "./userdetails.css"
import { useLocation } from 'react-router-dom'
import axios from "axios";
import { useState, useEffect } from 'react';
import { userDet } from "./userdetails.types"
import { Navbar, Post } from "../../Components"
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
export const UserDetails = () => {
    const id = new URLSearchParams(useLocation().search).get("id")
    const [user_det, setUserDetails] = useState<userDet>()
    useEffect(() => {
        (async function () {
            if (id) {
                const response = await axios.post<userDet>(
                    "https://author-book-server.herokuapp.com/user/get-user-details",
                    { _id: id }
                )
                setUserDetails(response.data);
            }
        })()
    }, [id])
    return (
        <div>
            <Navbar />
            {
                user_det ?
                    <div className="user-details-page">
                        <div className="user-details-box">
                            <div className="name-images">
                                <img src={user_det?.profile_pic} className="profile" alt="profile pic" />
                                <h3>{user_det?.firstname} {user_det?.lastname}</h3>

                                <div className="more-details">
                                    <p>{user_det?.bio}</p>
                                    {
                                        user_det?.url ?
                                            <a href={user_det.url}>{user_det.url}</a>
                                            : ""
                                    }
                                </div>
                            </div>
                            <div className="followers">
                                <h3>Followers</h3>
                                <p>{user_det?.followers.length}</p>
                            </div>
                            <div className="following">
                                <h3>Following</h3>
                                <p>{user_det?.following.length}</p>
                            </div>
                        </div>
                        <div className="more-details-mobile">
                            <p>{user_det?.bio}</p>
                            {
                                user_det?.url ?
                                    <a href={user_det.url}>{user_det.url}</a>
                                    : ""
                            }
                        </div>
                        <div className="all-posts">
                            {
                                user_det?.posts.map(({ _id, description, picture, owner, liked_by, comments, createdAt }) =>
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
                            }
                        </div>
                    </div>
                    : <div className="spinner">
                        <Loader
                            type="Oval"
                            color="#00BFFF"
                            height={50}
                            width={50}
                        />
                    </div>
            }
        </div>
    );
}
