import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getID } from "../../features/auth/authSlice";
import { userDet } from "../UserDetails/userdetails.types"
export const UpdateDetails = () => {
    const userID = useSelector(getID);
    const [user_det, setUserDetails] = useState<userDet>()
    useEffect(() => {
        (async function () {
                const response = await axios.post<userDet>(
                    "https://author-book-server.herokuapp.com/user/get-user-details",
                    { _id: userID }
                )
                setUserDetails(response.data);
        })()
    }, [userID])
    console.log(user_det);
    return (
        <div>
            
        </div>
    );
}

