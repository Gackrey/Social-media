import "./auth.css";
import front from "./Img/front.jpg";
import axios from 'axios'
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AddUserDetails } from './authSlice'
export const AddDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [bio, setBio] = useState('')
    const [URL, setURL] = useState('')
    const [image, setImage] = useState('')
    const [urlErrorState, setUrlErrorState] = useState(false);
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'\\+,;=.]+$/;
    async function uploadImage(files: FileList | null) {
        if (files && files[0].size <= 4000000) {
            try {
                const formData = new FormData();
                formData.append("file", files[0]);
                formData.append("upload_preset", "nyrrojy6");
                const { data: ImageData } = await axios.post("https://api.cloudinary.com/v1_1/dnpapnoo1/image/upload", formData)
                setImage(ImageData.url);
            }
            catch {
                console.error("Couldn't upload image");
            }
        }
    }
    async function AddDetailsHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await dispatch(AddUserDetails({ bio, URL, image }))
        navigate('/')
    }
    return (
        <div className="signin">
            <div className="signin-box">
                <div className="img-box">
                    <img src={front} className="image" alt="img" />
                    <div className="text-overlay">
                        <h1 className="heading-st">Writter <span>Club</span></h1>
                        <p>A place where writters connect</p>
                    </div>
                </div>
                <form className="add-details"
                    onSubmit={(e) => AddDetailsHandler(e)}
                >
                    <h1 className="heading-st">
                        Account <span>Details</span>
                    </h1>
                    {
                        image ? <img src={image} className="profile-pic" alt="profile pic" />
                            :
                            <input type="file" className="custom-file-input" accept="image/*" required
                                onChange={(e) => uploadImage(e.target.files)} />
                    }
                    <textarea className="input input-bio" placeholder="Add bio" value={bio} required
                        onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                    <input type="text" className="input input-prof" placeholder="Website URL" value={URL}
                        onChange={(e) => {
                            setURL(e.target.value)
                            if (urlRegex.test(e.target.value)) setUrlErrorState(false);
                            else setUrlErrorState(true);
                        }}
                    />
                    <p className="error"
                        style={{
                            display: urlErrorState ? "block" : "none",
                        }}
                    >
                        Enter a valid URL
                    </p>
                    <button type="submit" className="submit">Create Account</button>
                </form>
            </div>
        </div>
    );
}

