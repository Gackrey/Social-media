import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
    stateType,
    createPost,
    getResponse,
    postResponse,
    reducerType,
    deletePostType,
    deletePostResponse,
    likePostType,
    respLikeType,
    commentPostType,
    respCommentType,
    delcommentPostType,
    updatePostType,
    updatePostResponse
} from "./post.types";
const initialState: stateType = {
    userPosts: [],
    allPosts: [],
    loadstatus: "idle",
    poststatus: "idle",
};
export const createNewPost = createAsyncThunk(
    "/create-post",
    async ({ description, picture, token }: createPost) => {
        const response = await axios.post<postResponse>(
            "https://author-book-server.herokuapp.com/post/create-or-delete",
            { description, picture, liked_by: [], comments: [] },
            { headers: { authorization: token } }
        );
        return response.data;
    }
);

export const deletePost = createAsyncThunk(
    "/delete-post",
    async ({ _id, owner, token }: deletePostType) => {
        const response = await axios.delete<deletePostResponse>(
            "https://author-book-server.herokuapp.com/post/create-or-delete",
            {
                headers: { authorization: token },
                data: { _id, owner }
            }
        );
        return response.data;
    }
);

export const getAllPost = createAsyncThunk("/get-posts", async () => {
    const response = await axios.get<getResponse>(
        "https://author-book-server.herokuapp.com/post/show-all"
    );
    return response.data;
});

export const likePost = createAsyncThunk(
    "/like-post",
    async ({ _id, liked_by, token }: likePostType) => {
        const response = await axios.post<respLikeType>(
            "https://author-book-server.herokuapp.com/post/liked",
            { _id, liked_by },
            { headers: { authorization: token } }
        );
        return response.data;
    }
);
export const dislikePost = createAsyncThunk(
    "/dislike-post",
    async ({ _id, liked_by, token }: likePostType) => {
        const response = await axios.delete<respLikeType>(
            "https://author-book-server.herokuapp.com/post/liked",
            {
                headers: { authorization: token },
                data: { _id, liked_by }
            }
        );
        return response.data;
    }
);
export const commentPost = createAsyncThunk(
    "/comment-post",
    async ({ _id, comment, comments, token }: commentPostType) => {
        const response = await axios.post<respCommentType>(
            "https://author-book-server.herokuapp.com/post/comment",
            { _id, comment, comments },
            { headers: { authorization: token } }
        );
        return response.data;
    }
);
export const deleteCommentfromPost = createAsyncThunk(
    "/uncomment-post",
    async ({ post_id, comment_id, owner, comments, token }: delcommentPostType) => {
        const response = await axios.delete<respCommentType>(
            "https://author-book-server.herokuapp.com/post/comment",
            {
                headers: { authorization: token },
                data: { post_id, comment_id, owner, comments }
            }
        );
        return response.data;
    }
);
export const updatePost = createAsyncThunk(
    "/update-post",
    async ({ _id, description, picture, owner,liked_by, comments,createdAt, token }: updatePostType) => {
        const response = await axios.post<updatePostResponse>(
            "https://author-book-server.herokuapp.com/post/update",
            { _id, description, picture, owner,liked_by,createdAt, comments },
            { headers: { authorization: token } }
        );
        return response.data;
    }
);
export const postSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewPost.pending, (state) => {
                state.poststatus = "loading";
            })
            .addCase(createNewPost.fulfilled, (state, action) => {
                state.allPosts.push(action.payload.savedPost);
                state.poststatus = "done";
            })
            .addCase(createNewPost.rejected, (state) => {
                state.poststatus = "error";
            })
            .addCase(getAllPost.pending, (state) => {
                state.loadstatus = "loading";
            })
            .addCase(getAllPost.fulfilled, (state, action) => {
                state.allPosts = action.payload.allPosts;
                state.loadstatus = "done";
            })
            .addCase(getAllPost.rejected, (state) => {
                state.loadstatus = "error";
            })
            .addCase(deletePost.pending, (state) => {
                state.poststatus = "loading";
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.allPosts = state.allPosts.filter(post => post._id !== action.payload.post_id)
                state.poststatus = "done";
            })
            .addCase(deletePost.rejected, (state) => {
                state.poststatus = "error";
            })
            .addCase(likePost.pending, (state) => {
                state.poststatus = "loading";
            })
            .addCase(likePost.fulfilled, (state, action) => {
                const index = state.allPosts.findIndex(post => post._id === action.payload._id)
                state.allPosts[index].liked_by = action.payload.liked_by
                state.poststatus = "done";
            })
            .addCase(likePost.rejected, (state) => {
                state.poststatus = "error";
            })
            .addCase(dislikePost.pending, (state) => {
                state.poststatus = "loading";
            })
            .addCase(dislikePost.fulfilled, (state, action) => {
                const index = state.allPosts.findIndex(post => post._id === action.payload._id)
                state.allPosts[index].liked_by = action.payload.liked_by
                state.poststatus = "done";
            })
            .addCase(dislikePost.rejected, (state) => {
                state.poststatus = "error";
            })
            .addCase(commentPost.pending, (state) => {
                state.poststatus = "loading";
            })
            .addCase(commentPost.fulfilled, (state, action) => {
                const index = state.allPosts.findIndex(post => post._id === action.payload._id)
                state.allPosts[index].comments = action.payload.comments
                state.poststatus = "done";
            })
            .addCase(commentPost.rejected, (state) => {
                state.poststatus = "error";
            })
            .addCase(deleteCommentfromPost.pending, (state) => {
                state.poststatus = "loading";
            })
            .addCase(deleteCommentfromPost.fulfilled, (state, action) => {
                const index = state.allPosts.findIndex(post => post._id === action.payload._id)
                state.allPosts[index].comments = action.payload.comments
                state.poststatus = "done";
            })
            .addCase(deleteCommentfromPost.rejected, (state) => {
                state.poststatus = "error";
            })
            .addCase(updatePost.pending, (state) => {
                state.poststatus = "loading";
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.allPosts.findIndex(post => post._id === action.payload.post_id)
                state.allPosts[index] = action.payload.updatedPost
                state.poststatus = "done";
            })
            .addCase(updatePost.rejected, (state) => {
                state.poststatus = "error";
            })
    },
});

export const getPosts = (state: reducerType) => state.post.allPosts;
export const getLoadStatus = (state: reducerType) => state.post.loadstatus;
export const getPostStatus = (state: reducerType) => state.post.poststatus;
export default postSlice.reducer;
