import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactMarkdown from 'react-markdown'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { faBold, faHeading, faItalic, faList, faPen, faEye, faLifeRing } from "@fortawesome/free-solid-svg-icons";
import "./createpost.css"
import { useAppSelector } from "../../app/hooks"
import { createNewPost } from '../../features/Posts/postSlice'
import { rules } from './Rules'
import { infoToast, successToast } from "../Toast/Toast"
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type stateObj = {
    screen: string;
    box: string;
}
type stateType = {
    state: stateObj
}

const CreatePost = ({ state }: stateType) => {
    const dispatch = useDispatch();
    const { token } = useAppSelector((state) => state.auth)
    const [boxDisplay, setBoxDisplay] = useState(state.box)
    const [ScreenDisplay, setScreenDisplay] = useState(state.screen)
    const [body, setBody] = useState('')
    const [image, setImage] = useState('')
    const [tab, setTabs] = useState(1)
    useEffect(() => {
        setBoxDisplay(state.box);
        setScreenDisplay(state.screen)
    }, [state]);
    async function createPost() {
        if (body.length > 0) {
            infoToast("Adding your post")
            await dispatch(createNewPost({ description: body, picture: image, token }))
            successToast("Post added successfully")
            closeModal()
        }
        else{
            infoToast("Can't add an empty post")
        }
    }
    function closeModal() {
        setBoxDisplay("none");
        setScreenDisplay("none");
        setBody('')
    }
    async function uploadImage(files: FileList | null) {
        if (files && files[0].size <= 4000000) {
            try {
                const formData = new FormData();
                formData.append("file", files[0]);
                formData.append("upload_preset", "nyrrojy6");
                infoToast("Adding image...")
                const { data: ImageData } = await axios.post("https://api.cloudinary.com/v1_1/dnpapnoo1/image/upload", formData)
                setImage(ImageData.url);
                successToast("Image added successfully")
            }
            catch {
                console.error("Couldn't upload image");
            }
        }
    }

    return (
        <div className="modal-bg" style={{ display: ScreenDisplay }}>
            <div className="inner-modal" style={{ display: boxDisplay }}>
                <div className="modal-heading-box">
                    <h2 className="modal-heading">Start a Composition</h2>
                    <button className="close" onClick={closeModal}>X</button>
                </div>
                <hr />
                <div className="post-tabs">
                    <button
                        className={tab === 1 ? "btn-tab active-underline" : "btn-tab"}
                        onClick={() => setTabs(1)}
                    >
                        <FontAwesomeIcon icon={faPen as IconProp}
                            className="tab-icon" /> Write
                    </button>
                    <button
                        className={tab === 2 ? "btn-tab active-underline" : "btn-tab"}
                        onClick={() => setTabs(2)}
                    >
                        <FontAwesomeIcon icon={faEye as IconProp}
                            className="tab-icon"
                        /> Preview
                    </button>
                    <button
                        className={tab === 3 ? "btn-tab active-underline" : "btn-tab"}
                        onClick={() => setTabs(3)}
                    >
                        <FontAwesomeIcon icon={faLifeRing as IconProp}
                            className="tab-icon"
                        /> Rules
                    </button>
                </div>
                {
                    tab === 1 ?
                        <div>
                            <textarea
                                className="post-body"
                                value={body}
                                placeholder="Start putting thoughts into words"
                                onChange={(e) => setBody(e.target.value)}
                                draggable={false}
                            />
                            {image.length > 5 ?
                                <img src={image} className="post-ki-chavi" alt="chavi" />
                                : ""
                            }
                        </div>
                        : ""
                }
                {
                    tab === 2 ?
                        <div>
                            <ReactMarkdown className="markdown-body">{body}</ReactMarkdown>
                            {image.length > 5 ? (
                                <img src={image} className="post-ki-chavi" alt="chavi" />
                            ) : (
                                ""
                            )}
                        </div>
                        : ""
                }
                {
                    tab === 3 ?
                        <div className="rules-body">
                            <ReactMarkdown >{rules}</ReactMarkdown>
                        </div>
                        : ""
                }
                <div className="bottom-body">
                    <div className="add-ons">
                        <FontAwesomeIcon
                            icon={faBold as IconProp}
                            className="addon-icon"
                            onClick={() => setBody(curr => curr + '****')}
                        />
                        <FontAwesomeIcon
                            icon={faItalic as IconProp}
                            className="addon-icon"
                            onClick={() => setBody(curr => curr + '**')}
                        />
                        <FontAwesomeIcon
                            icon={faList as IconProp}
                            className="addon-icon"
                            onClick={() => setBody(curr => curr + '\n* ')}
                        />
                        <FontAwesomeIcon
                            icon={faHeading as IconProp}
                            className="addon-icon"
                            onClick={() => setBody(curr => curr + '# ')}
                        />
                        <input type="file" className="custom-image-input" accept="image/*" required
                            onChange={(e) => uploadImage(e.target.files)} />
                    </div>
                    <div className="btn-div">
                        <button
                            className="btn-post"
                            onClick={createPost}
                        >Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
