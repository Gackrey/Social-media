import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactMarkdown from 'react-markdown'
import { useDispatch } from 'react-redux'
import { faBold, faHeading, faItalic, faList, faPen, faEye, faLifeRing } from "@fortawesome/free-solid-svg-icons";
import ImageSVG from '../Addpost/Img/Image.svg'
import "./createpost.css"
import { useAppSelector } from "../../app/hooks"
import { createNewPost } from '../../features/Posts/postSlice'
import { rules } from './Rules'
import { infoToast, successToast } from "../Toast/Toast"
const CreatePost = ({ state }: any) => {
    const dispatch = useDispatch();
    const { token } = useAppSelector((state) => state.auth)
    const [boxDisplay, setBoxDisplay] = useState(state.box)
    const [ScreenDisplay, setScreenDisplay] = useState(state.screen)
    const [body, setBody] = useState('')
    const [tab, setTabs] = useState(1)
    useEffect(() => {
        setBoxDisplay(state.box);
        setScreenDisplay(state.screen)
    }, [state]);
    async function createPost() {
        infoToast("Adding your post")
        await dispatch(createNewPost({ description: body, token }))
        successToast("Post added successfully")
        closeModal()
    }
    function closeModal() {
        setBoxDisplay("none");
        setScreenDisplay("none");
        setBody('')
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
                        className={tab === 1 ? "btn-tab active" : "btn-tab"}
                        onClick={() => setTabs(1)}
                    >
                        <FontAwesomeIcon icon={faPen}
                            className="tab-icon" /> Write
                    </button>
                    <button
                        className={tab === 2 ? "btn-tab active" : "btn-tab"}
                        onClick={() => setTabs(2)}
                    >
                        <FontAwesomeIcon icon={faEye}
                            className="tab-icon"
                        /> Preview
                    </button>
                    <button
                        className={tab === 3 ? "btn-tab active" : "btn-tab"}
                        onClick={() => setTabs(3)}
                    >
                        <FontAwesomeIcon icon={faLifeRing}
                            className="tab-icon"
                        /> Rules
                    </button>
                </div>
                {
                    tab === 1 ? <textarea
                        className="post-body"
                        value={body}
                        placeholder="Start putting thoughts into words"
                        onChange={(e) => setBody(e.target.value)}
                        draggable={false}
                    />
                        : ""
                }
                {
                    tab === 2 ?
                        <ReactMarkdown className="markdown-body">{body}</ReactMarkdown>
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
                            icon={faBold}
                            className="addon-icon"
                            onClick={() => setBody(curr => curr + '****')}
                        />
                        <FontAwesomeIcon
                            icon={faItalic}
                            className="addon-icon"
                            onClick={() => setBody(curr => curr + '**')}
                        />
                        <FontAwesomeIcon
                            icon={faList}
                            className="addon-icon"
                            onClick={() => setBody(curr => curr + '\n* ')}
                        />
                        <FontAwesomeIcon
                            icon={faHeading}
                            className="addon-icon"
                            onClick={() => setBody(curr => curr + '# ')}
                        />
                        <img src={ImageSVG} alt="img-icon" />
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
