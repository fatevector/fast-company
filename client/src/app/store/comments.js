import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: state => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                comment => comment._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentCreated,
    commentRemoved
} = actions;

const commentCreateRequested = createAction("comments/commentCreateRequested");
const createCommentFailed = createAction("comments/createCommentFailed");
const commentRemoveRequested = createAction("comments/commentRemoveRequested");
const removeCommentFailed = createAction("comments/removeCommentFailed");

export const loadCommentsList = pageId => async dispatch => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(pageId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const createComment = payload => async dispatch => {
    dispatch(commentCreateRequested());
    try {
        const { content } = await commentService.createComment(payload);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(createCommentFailed(error.message));
    }
};

export const removeComment = id => async dispatch => {
    dispatch(commentRemoveRequested());
    try {
        const { content } = await commentService.removeComment(id);
        if (!content) {
            dispatch(commentRemoved(id));
        }
    } catch (error) {
        dispatch(removeCommentFailed(error.message));
    }
};

export const getComments = () => state => state.comments.entities;

export const getCommentsLoadingStatus = () => state => state.comments.isLoading;

export default commentsReducer;
