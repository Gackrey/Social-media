import { useState, useEffect } from "react";
import "./createpost.css"
const CreatePost = ({ state }: any) => {
    const [boxDisplay, setBoxDisplay] = useState(state.box)
    const [ScreenDisplay, setScreenDisplay] = useState(state.screen)
    useEffect(() => {
        setBoxDisplay(state.box);
        setScreenDisplay(state.screen)
    }, [state]);
    return (
        <div className="modal-bg" style={{ display: ScreenDisplay }}>
            <div className="inner-modal" style={{ display: boxDisplay }}>
                <button onClick={() => setScreenDisplay("none")}>Close</button>
            </div>
        </div>
    );
}

export default CreatePost;
