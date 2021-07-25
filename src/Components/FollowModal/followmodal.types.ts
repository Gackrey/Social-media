import { follow } from "../../features/auth/auth.types"
export type saveClick = {
    screen: string;
    box: string;
}
export type followModalType = {
    tabs: number,
    following: Array<follow>,
    follower: Array<follow>,
    state: saveClick,
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>
}