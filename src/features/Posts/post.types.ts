export type likeState = {
    name: string,
    profile_pic: string,
    userID: string,
}
export type commentState = {
    _id: string
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
    picture: string,
    token: string
}
export type updatePostType = {
    _id: string,
    description: string,
    picture: string,
    owner: likeState,
    liked_by: Array<likeState>,
    comments: Array<commentState>,
    createdAt:string,
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

export type likePostType = {
    _id: string,
    liked_by: Array<likeState>,
    token: string
}
export type respLikeType = {
    success: boolean,
    _id: string,
    liked_by: Array<likeState>,
}
export type commentPostType = {
    _id: string,
    comment: string,
    comments: Array<commentState>,
    token: string
}
export type respCommentType = {
    success: boolean,
    _id: string,
    comments: Array<commentState>
}

export type delcommentPostType = {
    post_id: string,
    comment_id: string,
    owner: string,
    comments: Array<commentState>,
    token: string
}
export type updatePostResponse = {
    success: boolean,
    post_id: string,
    updatedPost: postState
}