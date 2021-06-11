import { postState } from "../../features/Posts/post.types"
import {follow} from "../../features/auth/auth.types"
export type userDet = {
    _id: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: number,
    url: string,
    bio: string,
    profile_pic: string,
    following: Array<follow>,
    followers: Array<follow>,
    posts: Array<postState>
}