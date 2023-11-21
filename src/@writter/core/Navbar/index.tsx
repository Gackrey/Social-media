import "./index.css";
import { useEffect } from "react";
import { setDataFromLocal } from "@writter/redux/actions";
import { useAppSelector, useAppDispatch } from "@writter/redux/hooks";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export const Navbar = () => {
  const { firstname, profile_pic, id } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setDataFromLocal());
  }, [dispatch]);

  return (
    <div className="navbar">
      <div className="navbody">
        <h1 className="heading" onClick={() => navigate("/")}>
          Writters <span>Club</span>
        </h1>
        <div className="user-details">
          <div className="bell-box">
            <FontAwesomeIcon icon={faBell as IconProp} className="bell-icon" />
          </div>
          <Link to={`/user-details?id=${id}`}>
            <img src={profile_pic} className="profile-nav" alt="profile pic" />
          </Link>
          <h3>{firstname}</h3>
        </div>
      </div>
    </div>
  );
};
