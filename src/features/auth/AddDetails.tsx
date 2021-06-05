import "./auth.css";
import front from "./Img/front.jpg";
import axios from 'axios'
import { useState } from "react";
export const AddDetails = () => {
    const [bio, setBio] = useState('')
    const [URL, setURL] = useState('')
    const [image, setImage] = useState('')
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
    return (
        <div className="signin">
            <div className="signin-box">
                <div className="img-box">
                    <img src={front} className="image" alt="img" />
                    <div className="text-overlay">
                        <h1>Writter</h1>
                        <p>A place where writters connect</p>
                    </div>
                </div>
                <form className="add-details">
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
                        onChange={(e) => setURL(e.target.value)}
                    />
                    <button className="submit">Create Account</button>
                </form>
            </div>
        </div>
    );
}

