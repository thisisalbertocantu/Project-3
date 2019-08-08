import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_FAQ,
    GET_FAQS,
    FAQ_ERROR,
    ADD_COMMENT,
    REMOVE_COMMENT,
    ADD_FAQ,
    DELETE_FAQ, UPDATE_LIKES
} from "./types";

// Get faqs
export const getFaqs = () => async dispatch => {
    try {
        const res = await axios.get('/api/faqs');
        dispatch({
            type: GET_FAQS,
            payload: res.data
        });
    }catch (e) {
        dispatch({
            type: FAQ_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

// Get faq
export const getFaq = id => async dispatch => {
    try {
        const res = await axios.get(`/api/faqs/${id}`);
        dispatch({
            type: GET_FAQ,
            payload: res.data
        });
    }catch (e) {
        dispatch({
            type: FAQ_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

// Add faq
export const addFaq = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post(`/api/faqs`, formData, config);
        dispatch({
            type: ADD_FAQ,
            payload: res.data
        });
        dispatch(setAlert('FAQ Created', 'success'));
        history.push('/faqs');
    }catch (e) {
        dispatch({
            type: FAQ_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

// Delete faq
export const deleteFaq = id => async dispatch => {
    try {
        await axios.delete(`/api/faqs/${id}`);
        dispatch({
            type: DELETE_FAQ,
            payload: id
        });
        dispatch(setAlert('FAQ removed', 'success'))
    }catch (e) {
        dispatch({
            type: FAQ_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

// Add comment
export const addComment = (faqId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post(`/api/faqs/comment/${faqId}`, formData, config);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });
        dispatch(setAlert('Comment Added', 'success'));
    }catch (e) {
        dispatch({
            type: FAQ_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

// Delete comment
export const deleteComment = (faqId, commentId) => async dispatch => {
    try {
        await axios.delete(`/api/faqs/comment/${faqId}/${commentId}`);
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });
        dispatch(setAlert('Comment Removed', 'success'))
    }catch (e) {
        console.log(e);
        dispatch({
            type: FAQ_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

// Add like
export const addLike = id => async dispatch => {
    try {
        console.log('addlike')
        const res  = await axios.put(`/api/faqs/like/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data}
        });
    }catch (e) {
        console.log(e);
        dispatch({
            type: FAQ_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

// Remove like
export const removeLike = id => async dispatch => {
    try {
        const res  = await axios.put(`/api/faqs/unlike/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data}
        });
    }catch (e) {
        dispatch({
            type: FAQ_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};