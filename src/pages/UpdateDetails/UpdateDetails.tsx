import { useSelector, useDispatch } from "react-redux";
import { getID } from "../../features/auth/authSlice";
export const UpdateDetails = () => {
    const userID = useSelector(getID);
    return (
        <div>
            
        </div>
    );
}

