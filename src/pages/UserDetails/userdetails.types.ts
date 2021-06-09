import { AnyNaptrRecord } from "dns"
import { postState } from "../../features/Posts/post.types"
export type userDet = {
    _id: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: number,
    url: string,
    bio: string,
    profile_pic: string,
    following: Array<any>,
    followers: Array<AnyNaptrRecord>,
    posts: Array<postState>
}