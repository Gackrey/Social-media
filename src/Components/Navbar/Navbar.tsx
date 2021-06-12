import "./navbar.css"
import { useEffect } from 'react';
import { setDataFromLocal } from '../../features/auth/authSlice'
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
export const Navbar = () => {
    const { firstname, profile_pic, id } = useAppSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setDataFromLocal())
    }, [dispatch])

    return (
        <div className="navbar">
            <div className="navbody">
                <h1
                    className="heading"
                    onClick={() => navigate("/")}
                >Writters <span>Club</span></h1>
                <div className="user-details">
                    <div className="bell-box">
                        <FontAwesomeIcon icon={faBell} className="bell-icon" />
                    </div>
                    <Link to={`/user-details?id=${id}`}>
                        <img src={profile_pic} className="profile-nav" alt="profile pic" />
                    </Link>
                    <h3>{firstname}</h3>
                </div>
            </div>
        </div>
    );
}

