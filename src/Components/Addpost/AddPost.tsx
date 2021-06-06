import "./addpost.css"
import { useAppSelector } from "../../app/hooks"
import ImageSVG from './Img/Image.svg'
import ArticleSVG from './Img/Article.svg'
import BookPng from "./Img/book.png"
import CreatePost from "../CreatePost/CreatePost"
import { useState } from "react"
export const AddPost = () => {
    const [saveClick, setSaveState] = useState({ screen: "none", box: "none" });
    const { profile_pic } = useAppSelector((state) => state.auth)
    return (
        <div>
            <CreatePost state={saveClick} />
            <div className="add-post-box">
                <div className="create-post-div">
                    <img src={profile_pic} className="profile" alt="profile pic" />
                    <div
                        className="click-to-open-modal"
                        onClick={() => setSaveState({ screen: "flex", box: "block" })}
                    >Start putting thoughts into words</div>
                </div>
                <div className="add-otherItems-div">
                    <div className="icon-box">
                        <img src={ImageSVG} alt="img-icon" />
                        <span>Add photo</span>
                    </div>
                    <div className="icon-box">
                        <img src={ArticleSVG} alt="article-icon" />
                        <span>Write article</span>
                    </div>
                    <div className="icon-box">
                        <img src={BookPng} className="book-icon" alt="book-icon" />
                        <span>Add books</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
