import React, { Dispatch, useState } from "react";
import { commentPost, deleteCommentfromPost } from "@writter/redux/actions";
import { faTrashAlt, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { infoToast, successToast } from "../Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { commentState, likeState } from "@writter/redux/models";

type CommentsProps = {
  _id: string;
  commentBtnClick: boolean;
  userID: string;
  token: string;
  owner: likeState;
  comments: commentState[];
  dispatch: Dispatch<any>;
};

const Comments = ({
  _id,
  comments,
  userID,
  token,
  owner,
  commentBtnClick,
  dispatch,
}: CommentsProps) => {
  const [comment, setComment] = useState("");

  async function commentHandler() {
    if (comment.length > 0) {
      infoToast("Adding your comment");
      await dispatch(commentPost({ _id, comment, comments, token }));
      setComment("");
      successToast("Comment added successfully");
    } else {
      infoToast("Can't add an empty comment");
    }
  }

  async function deleteCommenthandler(comment_id: string, owner: string) {
    infoToast("Deleting your comment");
    await dispatch(
      deleteCommentfromPost({
        post_id: _id,
        comment_id,
        owner,
        comments,
        token,
      })
    );
    successToast("Comment deleted successfully");
  }

  return (
    <>
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
        <button className="btn-comment" onClick={commentHandler}>
          <FontAwesomeIcon icon={faPaperPlane as IconProp} />
        </button>
      </div>
      <div style={{ display: commentBtnClick ? "block" : "none" }}>
        {comments.map((comm) => {
          return (
            <div key={comm._id} className="show-comment-box">
              <img
                src={comm.profile_pic}
                className="profile-com"
                alt="profile"
              />
              <div className="comment-body">
                <h4>{comm.name}</h4>
                <p>{comm.message}</p>
                {userID === comm.userID || owner.userID === userID ? (
                  <FontAwesomeIcon
                    icon={faTrashAlt as IconProp}
                    className="edit-icon"
                    onClick={() => deleteCommenthandler(comm._id, comm.userID)}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Comments;
