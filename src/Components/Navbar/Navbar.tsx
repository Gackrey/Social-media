import "./navbar.css"
import { useEffect } from 'react';
import { setDataFromLocal } from '../../features/auth/authSlice'
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom"
export const Navbar = () => {
    const { firstname, profile_pic, id } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setDataFromLocal())
    }, [dispatch])

    return (
        <div className="navbar">
            <div className="navbody">
                <img
                    src="https://www.seekpng.com/png/detail/438-4381468_website-content-writing-website-content-writer.png"
                    alt="logo"
                    className="logo"
                />
                <div className="Search">
                    <input
                        type="text"
                        placeholder="Search"
                    //   value={searchContent}
                    //   onChange={(e) => setSearchContent(e.target.value)}
                    //   onKeyDown={searchHandler}
                    >
                    </input>
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </div>
                <div className="user-details">
                    <div className="bell-box">
                        <FontAwesomeIcon icon={faBell} className="bell-icon" />
                    </div>
                    <Link to={`/user-details?id=${id}`}>
                        <img src={profile_pic} className="profile" alt="profile pic" />
                    </Link>
                    <h3>{firstname}</h3>
                </div>
            </div>
        </div>
    );
}

