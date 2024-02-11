import { toast } from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faInfo,
    faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const attributes = {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
};

export const successToast = (text: String) => {
    return toast.success(
        <>
            <FontAwesomeIcon icon={faCheck as IconProp} />
            {"  " + text}
        </>,
        attributes
    );
};

export const infoToast = (text: String) => {
    return toast.info(
        <>
            <FontAwesomeIcon icon={faInfo as IconProp} />
            {"  " + text}
        </>,
        attributes
    );
};

export const warningToast = (text: String) => {
    return toast.error(
        <>
            <FontAwesomeIcon icon={faExclamation as IconProp} />
            {"  " + text}
        </>,
        attributes
    );
};