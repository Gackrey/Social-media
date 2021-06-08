import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { stateType, createPost, getResponse, postResponse, reducerType } from "./post.types";
const initialState: stateType = {
    userPosts: [],
    allPosts: [],
    loadstatus: 'idle',
    poststatus: 'idle'
};
export const createNewPost = createAsyncThunk("/create-post",
    async ({ description, token }: createPost) => {
        const response = await axios.post<postResponse>(
            "https://author-book-server.herokuapp.com/post/create-or-delete",
            { description, liked_by: [], comments: [] },
            { headers: { authorization: token } }
        );
        return response.data;
    });

export const getAllPost = createAsyncThunk("/get-posts",
    async () => {
        const response = await axios.get<getResponse>(
            "https://author-book-server.herokuapp.com/post/show-all",
        );
        return response.data;
    });

export const postSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // postReducer(state, action): any {
        //     switch (action.payload.type) {
        //         case "CREATE POST":
        //             state.posts.push(action.payload.payload)
        //             return state
        //         case "DELETE POST": return {
        //             ...state,
        //             posts: state.posts.push(action.payload)
        //         }
        //         case "UPDATE POST": return {
        //             ...state,
        //             posts: state.posts.map((post) => {
        //                 if (post._id === action.payload._id)
        //                     return {
        //                         ...post,
        //                         description: action.payload.description,
        //                         picture: action.payload.picture,
        //                     }
        //                 else return post;
        //             })
        //         }
        //         case "LIKE POST": return {
        //             ...state,
        //             posts: state.posts.map((post) => {
        //                 if (post._id === action.payload._id)
        //                     return { ...post, liked_by: post.liked_by.push(action.payload.likeditem) }
        //                 else return post;
        //             })
        //         }
        //         case "DISLIKE POST": return {
        //             ...state,
        //             posts: state.posts.map((post) => {
        //                 if (post._id === action.payload._id)
        //                     return {
        //                         ...post,
        //                         liked_by: post.liked_by.filter(
        //                             (liked_item) => liked_item.userID !== action.payload.userID
        //                         ),
        //                     }
        //                 else return post;
        //             })
        //         }
        //         case "ADD COMMENT": return {
        //             ...state,
        //             posts: state.posts.map((post) => {
        //                 if (post._id === action.payload._id)
        //                     return { ...post, comments: post.comments.push(action.payload.comment) }
        //                 else return post;
        //             })
        //         }
        //         case "DELETE COMMENT": return {
        //             ...state,
        //             posts: state.posts.map((post) => {
        //                 if (post._id === action.payload._id)
        //                     return {
        //                         ...post,
        //                         comments: post.comments.filter(
        //                             (comment_item) => comment_item.userID !== action.payload.userID
        //                         ),
        //                     }
        //                 else return post;
        //             })
        //         }
        //         default: return state;
        //     }
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewPost.pending, (state) => {
                state.poststatus = 'loading';
            })
            .addCase(createNewPost.fulfilled, (state, action) => {
                state.allPosts.push(action.payload.savedPost)
                state.poststatus = 'done';
            })
            .addCase(createNewPost.rejected, (state) => {
                state.poststatus = 'error';
            })
            .addCase(getAllPost.pending, (state) => {
                state.loadstatus = 'loading';
            })
            .addCase(getAllPost.fulfilled, (state, action) => {
                state.allPosts = action.payload.allPosts
                state.loadstatus = 'done';
            })
            .addCase(getAllPost.rejected, (state) => {
                state.loadstatus = 'error';
            })
    }
});

// export const { postReducer } = postSlice.actions;

export const getPosts = (state: reducerType) => state.post.allPosts
export const getLoadStatus = (state: reducerType) => state.post.loadstatus
export const getPostStatus = (state: reducerType) => state.post.poststatus
export default postSlice.reducer;
