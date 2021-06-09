export type likeState = {
    name: string,
    profile_pic: string,
    userID: string,
}
export type commentState = {
    name: string,
    message: string,
    profile_pic: string,
    userID: string,
}

export type postState = {
    _id: string,
    description: string,
    picture: string,
    owner: likeState,
    liked_by: Array<likeState>,
    comments: Array<commentState>,
    createdAt: string
}
export type stateType = {
    userPosts: Array<postState>,
    allPosts: Array<postState>,
    loadstatus: string,
    poststatus: string
}
export type reducerType = {
    post: stateType
}
export type createPost = {
    description: string,
    token: string
}
export type getResponse = {
    success: boolean;
    allPosts: postState[]
}
export type postResponse = {
    success: boolean;
    savedPost: postState
}
export type deletePostType = {
    _id: string,
    owner: likeState,
    token: string
}
export type deletePostResponse = {
    success: boolean,
    post_id: string
}