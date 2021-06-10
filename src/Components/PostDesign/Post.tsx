import "./post.css";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import { postState } from "../../features/Posts/post.types";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { getID } from "../../features/auth/authSlice";
import { deletePost, likePost, dislikePost, commentPost, deleteCommentfromPost } from "../../features/Posts/postSlice";
import { successToast, infoToast } from "../Toast/Toast";
import like from "./like.png"
type Date = {
  date: string;
};
function DateCalculator({ date }: Date) {
  let timeElapsed = Date.now() - Date.parse(date);
  let timeElapsed_inminutes = Math.ceil(timeElapsed / 86400);
  let timeElapsed_inhours = Math.ceil(timeElapsed / 3600000);
  if (timeElapsed_inminutes < 60)
    return <p>{timeElapsed_inminutes} minutes ago</p>;
  if (timeElapsed_inminutes > 60 && timeElapsed_inhours < 23)
    return <p>{timeElapsed_inhours} hours ago</p>;
  else if (timeElapsed_inhours === 24)
    return <p>{Math.ceil(timeElapsed_inhours / 24)} day ago</p>;
  else return <p>{Math.ceil(timeElapsed_inhours / 24)} days ago</p>;
}
export const Post = ({
  _id,
  description,
  picture,
  owner,
  createdAt,
  liked_by,
  comments,
}: postState) => {
  const [likeBtnClick, setLikeBtnState] = useState(false);
  const [commentBtnClick, setCommentBtnState] = useState(false);
  const [comment, setComment] = useState('');
  const userID = useSelector(getID);
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const ispresent = liked_by.filter(people => people.userID === userID)
    if (ispresent.length > 0)
      setLikeBtnState(true)
    else setLikeBtnState(false)
  }, [userID, liked_by])
  async function deletePostHandler() {
    infoToast("Deleting your post");
    await dispatch(deletePost({ _id, owner, token }));
    successToast("Post deleted successfully");
  }
  async function likeHandler() {
    if (likeBtnClick) {
      await dispatch(dislikePost({ _id, liked_by, token }))
      setLikeBtnState(false)
    }
    else {
      await dispatch(likePost({ _id, liked_by, token }))
      setLikeBtnState(true);
    }
  }
  async function commentHandler() {
    infoToast("Adding your comment");
    await dispatch(commentPost({ _id, comment, comments, token }))
    setComment('');
    successToast("Comment added successfully")
  }
  async function deleteCommenthandler(comment_id: string, owner: string) {
    infoToast("Deleting your comment");
    await dispatch(deleteCommentfromPost({ post_id: _id, comment_id, owner, comments, token }))
    successToast("Comment deleted successfully");
  }
  return (
    <div key={_id} className="post">
      <div className="post-header">
        <Link to={`/user-details?id=${owner.userID}`}>
          <img src={owner.profile_pic} className="profile" alt="profile pic" />
        </Link>
        <div className="post-editer">
          <div className="owner-details">
            <h3>{owner.name}</h3>
            <DateCalculator date={createdAt} />
          </div>
          <div>
            {owner.userID === userID ? (
              <FontAwesomeIcon icon={faPen} className="edit-icon" />
            ) : (
              ""
            )}
            {owner.userID === userID ? (
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="edit-icon"
                onClick={deletePostHandler}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <ReactMarkdown className="body">{description}</ReactMarkdown>
      {picture ? <img src={picture} alt="profile pic" /> : ""}
      <div className="post-reach">
        <p>
          {liked_by.length}
          <img src={like} className="likepng" alt="likes" />
        </p>
        <p>
          {comments.length} comments
      </p>
      </div>

      <hr />
      <div className="post-footer">
        <div className="post-footer-icon" onClick={likeHandler}>
          <FontAwesomeIcon
            icon={faThumbsUp}
            style={{ color: likeBtnClick ? "#00BFFF" : "black" }}
          />
          <span style={{ color: likeBtnClick ? "#00BFFF" : "black" }}>
            {likeBtnClick ? "Liked" : "Like"}
          </span>
        </div>
        <div
          className="post-footer-icon"
          onClick={() => setCommentBtnState(!commentBtnClick)}
        >
          <FontAwesomeIcon icon={faComment} />
          <span>Comment</span>
        </div>
        <div className="post-footer-icon">
          <FontAwesomeIcon icon={faShare} />
          <span>Share</span>
        </div>
      </div>
      <div
        className="comment-box"
        style={{ display: commentBtnClick ? "flex" : "none" }}
      >
        <input
          type="text"
          className="comment-input"
          placeholder="Comment your thoughts"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="btn-comment"
          onClick={commentHandler}
        >Post</button>
      </div>
      <div style={{ display: commentBtnClick ? "block" : "none" }}>
        {comments.map(comm => {
          return <div key={comm._id} className="show-comment-box">
            <img src={comm.profile_pic} className="profile-com" alt="profile" />
            <div className="comment-body">
              <h4>{comm.name}</h4>
              <p>{comm.message}</p>
            </div>
            <FontAwesomeIcon icon={faTrashAlt}
              className="edit-icon"
              onClick={() => deleteCommenthandler(comm._id, comm.userID)}
            />
          </div>
        })
        }
      </div>
    </div>
  );
};
