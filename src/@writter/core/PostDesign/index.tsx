import "./index.css";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import { postState } from "@writter/redux/models";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "@writter/redux/hooks";
import { getID, getUserFollowingList } from "@writter/redux/actions";
import { deletePost, likePost, dislikePost } from "@writter/redux/actions";
import { successToast, infoToast } from "../Toast";
import EditPost from "../EditPost";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { DateCalculator } from "@writter/utils";
import MoreOptions from "../MoreOptions";
import Comments from "../Comments";
import ShareOption from "../Share";

export const Post = ({
  _id,
  description,
  postType = "post",
  picture,
  owner,
  createdAt,
  liked_by,
  comments,
}: postState) => {
  const [likeBtnClick, setLikeBtnState] = useState(false);
  const [commentBtnClick, setCommentBtnState] = useState(false);
  const [saveClick, setSaveState] = useState({ screen: "none", box: "none" });
  const userID = useSelector(getID);
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const followingList = useSelector(getUserFollowingList);

  useEffect(() => {
    const ispresent = liked_by.filter((people) => people.userID === userID);
    if (ispresent.length > 0) setLikeBtnState(true);
    else setLikeBtnState(false);
  }, [userID, liked_by]);

  async function deletePostHandler() {
    infoToast("Deleting your post");
    await dispatch(deletePost({ _id, owner, token }));
    successToast("Post deleted successfully");
  }

  function editPostHandler() {
    setSaveState({ screen: "flex", box: "block" });
  }

  async function likeHandler() {
    if (likeBtnClick) {
      await dispatch(dislikePost({ _id, liked_by, token }));
      setLikeBtnState(false);
    } else {
      await dispatch(likePost({ _id, liked_by, token }));
      setLikeBtnState(true);
    }
  }

  function isFollowed(user_id: string): boolean {
    const ispresent = followingList.find(
      (followed) => followed.userID === user_id
    );
    if (ispresent || userID === user_id) return true;
    else return false;
  }

  return (
    <div>
      <EditPost
        _id={_id}
        description={description}
        picture={picture}
        owner={owner}
        liked_by={liked_by}
        comments={comments}
        createdAt={createdAt}
        state={saveClick}
        setSaveState={setSaveState}
      />
      <div
        key={_id}
        className="post"
        style={{
          display:
            postType === "user" || isFollowed(owner.userID) ? "block" : "none",
        }}
      >
        <div className="post-header">
          <Link to={`/user-details?id=${owner.userID}`}>
            <img
              src={owner.profile_pic}
              className="profile"
              alt="profile pic"
            />
          </Link>
          <div className="post-editer">
            <div className="owner-details">
              <h3>{owner.name}</h3>
              <p>{DateCalculator(createdAt)}</p>
            </div>
            {owner.userID === userID ? (
              <MoreOptions
                options={[
                  { title: "Edit Post", callback: editPostHandler },
                  { title: "Delete Post", callback: deletePostHandler },
                ]}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <ReactMarkdown className="body">{description}</ReactMarkdown>
        {picture ? (
          <img src={picture} className="picture" alt="profile pic" />
        ) : (
          ""
        )}
        <div
          style={{
            justifyContent: liked_by.length ? "space-between" : "flex-end",
          }}
          className="post-reach"
        >
          {liked_by.length ? (
            <p className="liked">
              {liked_by.length}
              <FontAwesomeIcon
                className="likepng"
                icon={faThumbsUp as IconProp}
              />
            </p>
          ) : null}
          {comments.length ? <p>{comments.length} comments</p> : null}
        </div>

        <hr />
        <div className="post-footer">
          <div className="post-footer-icon" onClick={likeHandler}>
            <FontAwesomeIcon
              icon={faThumbsUp as IconProp}
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
            <FontAwesomeIcon icon={faComment as IconProp} />
            <span>Comment</span>
          </div>
          <ShareOption postId={_id} />
        </div>
        <Comments
          _id={_id}
          comments={comments}
          commentBtnClick={commentBtnClick}
          userID={userID}
          token={token}
          owner={owner}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
};
