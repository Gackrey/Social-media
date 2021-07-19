import "./home.css"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Navbar, AddPost, Post } from "../../Components"
import { getLoadStatus, getPosts, getAllPost } from '../../features/Posts/postSlice'
import { getID, getStatus, getUserData } from '../../features/auth/authSlice'
import { postState } from '../../features/Posts/post.types'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConnectToPeople } from '../Connect People/ConnectToPeople'
export const Home = () => {
    const posts = useSelector(getPosts);
    const l_status = useSelector(getLoadStatus);
    const user_status = useSelector(getStatus);
    const dispatch = useDispatch();
    const userID = useSelector(getID);
    const [allPosts, setPosts] = useState<Array<postState>>([])
    const [userLoadingStatus, setPostLoadStatus] = useState('')
    const [postLoadingStatus, setUserLoadStatus] = useState('')
    useEffect(() => {
        (async function () {
            await dispatch(getUserData({ _id: userID }))
        })()
    }, [dispatch, userID])

    useEffect(() => {
        (async function () {
            await dispatch(getAllPost())
        })()
    }, [dispatch])

    useEffect(() => {
        setPosts(posts)
        setPostLoadStatus(l_status);
        setUserLoadStatus(user_status)
    }, [posts, l_status, user_status])
    return (
        <div className="home">
            <Navbar />
            <div className="spinner">
                {postLoadingStatus === 'loading' || userLoadingStatus === 'loading'
                    ? <Loader
                        type="Oval"
                        color="#00BFFF"
                        height={50}
                        width={50}
                    />
                    : ""
                }
            </div>
            <ToastContainer />
            <div className="home-body">
                <div className="home-innerbody-1">
                    <AddPost />
                    <div className="mobile-home-innerbody-2">
                        <ConnectToPeople />
                    </div>
                    <div className="all-posts">
                        {allPosts.length > 0 ?
                            allPosts.map(({ _id, description, picture, owner, liked_by, comments, createdAt }) =>
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
                            : <span className="no-posts-msg">Create Posts or follow users to see posts</span>
                        }
                    </div>
                </div>
                <div className="home-innerbody-2">
                    <ConnectToPeople />
                </div>

            </div>
        </div>
    );
}
