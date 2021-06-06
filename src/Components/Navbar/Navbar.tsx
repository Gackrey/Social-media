import "./navbar.css"
import { useEffect } from 'react';
import { setDataFromLocal } from '../../features/auth/authSlice'
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const Navbar = () => {
    const { firstname, profile_pic } = useAppSelector((state) => state.auth)
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
                    <img src={profile_pic} className="profile" alt="profile pic" />
                    <h3>{firstname}</h3>
                </div>
            </div>
        </div>
    );
}

