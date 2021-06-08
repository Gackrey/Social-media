import "./post.css"
import ReactMarkdown from 'react-markdown'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons"
import { postState } from '../../features/Posts/post.types'
import { useState } from "react";
type Date = {
    date: string
}
function DateCalculator({ date }: Date) {
    let timeElapsed = Date.now() - Date.parse(date);
    let timeElapsed_inminutes = Math.ceil(timeElapsed / 86400);
    let timeElapsed_inhours = Math.ceil(timeElapsed / 3600000);
    if (timeElapsed_inminutes < 60)
        return <p>{timeElapsed_inminutes} minutes ago</p>
    if (timeElapsed_inminutes > 60 && timeElapsed_inhours < 23)
        return <p>{timeElapsed_inhours} hours ago</p>
    else if (timeElapsed_inhours === 24)
        return <p>{Math.ceil(timeElapsed_inhours / 24)} day ago</p>
    else return <p>{Math.ceil(timeElapsed_inhours / 24)} days ago</p>
}
export const Post = ({ _id, description, picture, owner, createdAt, liked_by, comments }: postState) => {
    const [commentBtnClick, setCommentBtnState] = useState(false);
    return (
        <div className="post">
            <div className="post-header">
                <img src={owner.profile_pic} className="profile" alt="profile pic" />
                <div className="owner-details">
                    <h3>{owner.name}</h3>
                    <DateCalculator date={createdAt} />
                </div>
            </div>
            <ReactMarkdown className="body">{description}</ReactMarkdown>
            {picture ? <img src={picture} alt="profile pic" /> : ""}
            <hr />
            <div className="post-footer">
                <div className="post-footer-icon">
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <span>Like</span>
                </div>
                <div className="post-footer-icon" onClick={() => setCommentBtnState(!commentBtnClick)}>
                    <FontAwesomeIcon icon={faComment} />
                    <span>Comment</span>
                </div>
                <div className="post-footer-icon">
                    <FontAwesomeIcon icon={faShare} />
                    <span>Share</span>
                </div>
            </div>
            <div className="comment-box" style={{ display: commentBtnClick ? "flex" : "none" }}>
                <input type="text" className="comment-input" placeholder="Comment your thoughts" />
                <button className="btn-post">Post</button>
            </div>
        </div>
    );
}

