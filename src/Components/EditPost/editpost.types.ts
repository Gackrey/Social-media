import { likeState, commentState } from '../../features/Posts/post.types'
export type stateObj = {
    screen: string;
    box: string;
}
export type editPostState = {
    _id: string;
    description: string;
    picture: string;
    owner: likeState;
    liked_by: Array<likeState>;
    comments: Array<commentState>;
    createdAt: string;
    state: stateObj;
    setSaveState: React.Dispatch<React.SetStateAction<{
        screen: string;
        box: string;
    }>>
}