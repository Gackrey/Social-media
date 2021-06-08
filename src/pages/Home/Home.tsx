import "./home.css"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Navbar, AddPost, Post } from "../../Components"
import { getLoadStatus, getPosts, getAllPost } from '../../features/Posts/postSlice'
import { postState } from '../../features/Posts/post.types'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Home = () => {
    const posts = useSelector(getPosts);
    const l_status = useSelector(getLoadStatus);
    const dispatch = useDispatch();
    const [allPosts, setPosts] = useState<Array<postState>>([])
    const [loadingStatus, setLoadStatus] = useState('')
    useEffect(() => {
        (async function () {
            await dispatch(getAllPost())
        })()
    }, [dispatch])

    useEffect(() => {
        setPosts(posts)
        setLoadStatus(l_status)
    }, [posts, l_status])
    console.log(allPosts);
    return (
        <div className="home">
            <Navbar />
            <div className="spinner">
                {loadingStatus === 'loading'
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
                    <div className="all-posts">
                        {
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
                        }
                    </div>
                </div>
                <div className="home-innerbody-2">
                    <h2>People you may know</h2>
                </div>
            </div>
        </div>
    );
}
