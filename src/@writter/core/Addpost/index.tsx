import "./index.css";
import { useAppSelector } from "../../redux/hooks";
import CreatePost from "../CreatePost";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export const AddPost = () => {
  const [saveClick, setSaveState] = useState({ screen: "none", box: "none" });
  const { profile_pic, id } = useAppSelector((state) => state.auth);
  return (
    <div>
      <CreatePost state={saveClick} />
      <div className="add-post-box">
        <div className="create-post-div">
          <Link to={`/user-details?id=${id}`}>
            <img src={profile_pic} className="profile" alt="profile pic" />
          </Link>
          <div
            className="click-to-open-modal pointer"
            onClick={() => setSaveState({ screen: "flex", box: "block" })}
          >
            Start putting thoughts into words
          </div>
        </div>
        <div className="add-otherItems-div">
          <div className="icon-box">
            <FontAwesomeIcon icon={"fa-regular fa-image" as IconProp} />
            <span>Add photo</span>
          </div>
          <div className="icon-box">
            <FontAwesomeIcon
              icon={"fa-solid fa-book" as IconProp}
              className="book-icon"
            />
            <span>Add books</span>
          </div>
        </div>
      </div>
    </div>
  );
};
