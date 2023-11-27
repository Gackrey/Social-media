import "./index.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getID,
  updateUser,
  updateAccountWithPassword,
  updateAccountWithoutPassword,
} from "@writter/redux/actions";
import { userDet } from "@writter/redux/models";
import { useAppSelector } from "@writter/redux/hooks";
import { successToast, infoToast } from "@writter/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "@writter/constants";

export const UpdateDetails = () => {
  const rectab = new URLSearchParams(useLocation().search).get("tab");
  let intTab;
  if (rectab) intTab = parseInt(rectab);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userID = useSelector(getID);
  const { token } = useAppSelector((state) => state.auth);
  const [user_det, setUserDetails] = useState<userDet>();
  const [tab, setTabs] = useState(intTab);
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<number>();
  const [changePassword, setChangePassState] = useState(false);
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [phoneErrorState, setPhoneErrorState] = useState(false);
  const [urlErrorState, setUrlErrorState] = useState(false);
  const [passErrorState, setPassErrorState] = useState(false);
  const [bio, setBio] = useState("");
  const [URL, setURL] = useState("");
  const [image, setImage] = useState("");
  const passregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,15}$/;
  const phoneRegex = /^[2-9]{2}[0-9]{8}$/;
  const urlRegex =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'\\+,;=.]+$/;
  useEffect(() => {
    (async function () {
      const response = await axios.post<userDet>(
        `${API_URL}/user/get-user-details`,
        { _id: userID }
      );
      setUserDetails(response.data);
    })();
  }, [userID]);
  async function uploadImage(files: FileList | null) {
    if (files && files[0].size <= 4000000) {
      try {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "nyrrojy6");
        const { data: ImageData } = await axios.post(
          "https://api.cloudinary.com/v1_1/dnpapnoo1/image/upload",
          formData
        );
        setImage(ImageData.url);
      } catch {
        console.error("Couldn't upload image");
      }
    }
  }
  useEffect(() => {
    if (user_det) {
      setFirstName(user_det.firstname);
      setlastName(user_det.lastname);
      setEmail(user_det.email);
      setPhone(user_det.phone);
      setBio(user_det.bio);
      setURL(user_det.url);
      setImage(user_det.profile_pic);
    }
  }, [user_det]);
  async function updateAccountHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (changePassword && phone) {
      infoToast("Updating account details");
      await dispatch(
        updateAccountWithPassword({
          firstname: firstName,
          lastname: lastName,
          email,
          phone,
          oldpassword,
          newpassword,
          token,
        })
      );
      successToast("Updated account details");
      navigate("/");
    } else {
      if (phone) {
        infoToast("Updating user details");
        await dispatch(
          updateAccountWithoutPassword({
            firstname: firstName,
            lastname: lastName,
            email,
            phone,
            token,
          })
        );
        successToast("Updated account details");
        navigate("/");
      }
    }
  }
  async function updateUserHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    infoToast("Updating user details");
    await dispatch(updateUser({ bio, image, URL, token }));
    successToast("Updated user details");
    navigate("/");
  }
  return (
    <div className="update-details">
      <ToastContainer />
      <div className="tabs">
        <span
          className={tab === 1 ? "tab active" : "tab"}
          onClick={() => setTabs(1)}
        >
          Update Account
        </span>
        <span
          className={tab === 2 ? "tab active" : "tab"}
          onClick={() => setTabs(2)}
        >
          Update User
        </span>
      </div>

      <form
        className="signup-form"
        style={{ display: tab === 1 ? "block" : "none" }}
        onSubmit={(e) => updateAccountHandler(e)}
      >
        <h1 className="heading-ud">
          Account <span>Details</span>
        </h1>
        <label htmlFor="firstname">First Name</label>
        <input
          type="text"
          name="firstname"
          className="input"
          placeholder="First Name"
          value={firstName}
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastname">Last Name</label>
        <input
          type="text"
          name="lastname"
          className="input"
          placeholder="Last Name"
          value={lastName}
          required
          onChange={(e) => setlastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          className="input"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="phone">Phone No.</label>
        <input
          type="number"
          name="phone"
          className="input"
          placeholder="Phone Number"
          value={phone}
          required
          onChange={(e) => {
            setPhone(parseInt(e.target.value));
            if (phoneRegex.test(e.target.value)) setPhoneErrorState(false);
            else setPhoneErrorState(true);
          }}
        />
        <p
          className="error"
          style={{
            display: phoneErrorState ? "block" : "none",
          }}
        >
          Enter a valid 10 digit Phone number
        </p>
        <button
          type="button"
          className="change-pass"
          onClick={() => setChangePassState(!changePassword)}
        >
          Change Password
        </button>
        <div style={{ display: changePassword ? "block" : "none" }}>
          <label htmlFor="password">Old Password</label>
          <div className="password">
            <input
              type="password"
              className="pass-box"
              placeholder="Password"
              value={oldpassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required={changePassword}
            />
          </div>
          <label htmlFor="password">Old Password</label>
          <div className="password">
            <input
              type="password"
              className="pass-box"
              placeholder="Password"
              value={newpassword}
              required={changePassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (passregex.test(e.target.value)) setPassErrorState(false);
                else setPassErrorState(true);
              }}
            />
          </div>
          <p
            className="error"
            style={{
              display: passErrorState ? "block" : "none",
            }}
          >
            Password must be of 8-15 chararters and must contain at least an
            Uppercase letter, a lowercase letter and a number.
          </p>
        </div>
        <button
          type="submit"
          className={
            passErrorState === false && phoneErrorState === false
              ? "submit"
              : "submit-disable "
          }
          disabled={passErrorState === true || phoneErrorState === true}
        >
          Update
        </button>
      </form>
      <form
        className="add-details"
        style={{ display: tab === 2 ? "block" : "none" }}
        onSubmit={(e) => updateUserHandler(e)}
      >
        <h1 className="heading-ud">
          User <span>Details</span>
        </h1>
        <img src={image} className="profile-pic" alt="profile pic" />
        <input
          type="file"
          className="custom-file-input"
          accept="image/*"
          onChange={(e) => uploadImage(e.target.files)}
        />
        <label htmlFor="bio">Bio</label>
        <textarea
          className="input input-bio"
          name="bio"
          placeholder="Add bio"
          value={bio}
          required
          draggable={false}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <label htmlFor="url">Url</label>
        <input
          type="text"
          name="url"
          className="input input-prof"
          placeholder="Website URL"
          value={URL}
          onChange={(e) => {
            setURL(e.target.value);
            if (urlRegex.test(e.target.value)) setUrlErrorState(false);
            else setUrlErrorState(true);
          }}
        />
        <p
          className="error"
          style={{
            display: urlErrorState ? "block" : "none",
          }}
        >
          Enter a valid URL
        </p>
        <button type="submit" className="submit pointer">
          Update
        </button>
      </form>
    </div>
  );
};
