import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  faBold,
  faHeading,
  faItalic,
  faList,
  faPen,
  faEye,
  faLifeRing,
} from "@fortawesome/free-solid-svg-icons";
import "../CreatePost/index.css";
import { useAppSelector } from "@writter/redux/hooks";
import { updatePost } from "@writter/redux/actions";
import { rules } from "../CreatePost/Rules";
import { infoToast, successToast } from "../Toast";
import { editPostState } from "@writter/redux/models";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const EditPost = ({
  _id,
  description,
  picture,
  owner,
  liked_by,
  comments,
  createdAt,
  state,
  setSaveState,
}: editPostState) => {
  const dispatch = useDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const [boxDisplay, setBoxDisplay] = useState(state.box);
  const [ScreenDisplay, setScreenDisplay] = useState(state.screen);
  const [body, setBody] = useState(description);
  const [image, setImage] = useState(picture ? picture : "");
  const [tab, setTabs] = useState(1);
  useEffect(() => {
    setBoxDisplay(state.box);
    setScreenDisplay(state.screen);
    setBody(description);
    setImage(picture ? picture : "");
  }, [description, picture, state]);
  async function editHandler() {
    infoToast("Adding your post");
    await dispatch(
      updatePost({
        _id,
        description: body,
        picture: image,
        liked_by,
        comments,
        owner,
        createdAt,
        token,
      })
    );
    successToast("Post added successfully");
    closeModal();
  }
  function closeModal() {
    setSaveState({ screen: "none", box: "none" });
    setBoxDisplay("none");
    setScreenDisplay("none");
    setBody("");
  }
  async function uploadImage(files: FileList | null) {
    if (files && files[0].size <= 4000000) {
      try {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "nyrrojy6");
        infoToast("Updating image...");
        const { data: ImageData } = await axios.post(
          "https://api.cloudinary.com/v1_1/dnpapnoo1/image/upload",
          formData
        );
        setImage(ImageData.url);
        successToast("Image updated successfully");
      } catch {
        console.error("Couldn't upload image");
      }
    }
  }

  return (
    <div className="modal-bg" style={{ display: ScreenDisplay }}>
      <div className="inner-modal" style={{ display: boxDisplay }}>
        <div className="modal-heading-box">
          <h2 className="modal-heading">Edit your composition</h2>
          <button className="close pointer" onClick={closeModal}>
            X
          </button>
        </div>
        <hr />
        <div className="post-tabs">
          <button
            className={tab === 1 ? "btn-tab active-underline" : "btn-tab"}
            onClick={() => setTabs(1)}
          >
            <FontAwesomeIcon icon={faPen as IconProp} className="tab-icon" />{" "}
            Write
          </button>
          <button
            className={tab === 2 ? "btn-tab active-underline" : "btn-tab"}
            onClick={() => setTabs(2)}
          >
            <FontAwesomeIcon icon={faEye as IconProp} className="tab-icon" />{" "}
            Preview
          </button>
          <button
            className={tab === 3 ? "btn-tab active-underline" : "btn-tab"}
            onClick={() => setTabs(3)}
          >
            <FontAwesomeIcon
              icon={faLifeRing as IconProp}
              className="tab-icon"
            />{" "}
            Rules
          </button>
        </div>
        {tab === 1 ? (
          <div>
            <textarea
              className="post-body"
              value={body}
              placeholder="Start putting thoughts into words"
              onChange={(e) => setBody(e.target.value)}
              draggable={false}
            />
            {image.length > 5 ? (
              <img src={image} className="post-ki-chavi" alt="chavi" />
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        {tab === 2 ? (
          <div>
            <ReactMarkdown className="markdown-body">{body}</ReactMarkdown>
            {image.length > 5 ? (
              <img src={image} className="post-ki-chavi" alt="chavi" />
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        {tab === 3 ? (
          <div className="rules-body">
            <ReactMarkdown>{rules}</ReactMarkdown>
          </div>
        ) : (
          ""
        )}
        <div className="bottom-body">
          <div className="add-ons">
            <FontAwesomeIcon
              icon={faBold as IconProp}
              className="addon-icon"
              onClick={() => setBody((curr) => curr + "****")}
            />
            <FontAwesomeIcon
              icon={faItalic as IconProp}
              className="addon-icon"
              onClick={() => setBody((curr) => curr + "**")}
            />
            <FontAwesomeIcon
              icon={faList as IconProp}
              className="addon-icon"
              onClick={() => setBody((curr) => curr + "\n* ")}
            />
            <FontAwesomeIcon
              icon={faHeading as IconProp}
              className="addon-icon"
              onClick={() => setBody((curr) => curr + "# ")}
            />
            <input
              type="file"
              className="custom-image-input"
              accept="image/*"
              required
              onChange={(e) => uploadImage(e.target.files)}
            />
          </div>
          <div className="btn-div">
            <button className="btn-post" onClick={editHandler}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
