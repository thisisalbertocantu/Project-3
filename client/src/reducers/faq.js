import {
    GET_FAQS,
    GET_FAQ,
    ADD_FAQ,
    DELETE_FAQ,
    FAQ_ERROR,
    UPDATE_LIKES,
    ADD_COMMENT,
    REMOVE_COMMENT
} from "../actions/types";

const initialState = {
    faqs: [],
    faq: null,
    loading: true,
    error: {}
};

export default function (state = initialState, action){
    const {type, payload} = action;
    switch (type) {
        case GET_FAQS:
            return {
                ...state,
                faqs: payload,
                loading: false
            };
        case GET_FAQ:
            return {
                ...state,
                faq: payload,
                loading: false
            };
        case ADD_FAQ:
            return {
                ...state,
                faqs: [payload, ...state.faqs],
                loading: false
            };
        case DELETE_FAQ:
            return {
                ...state,
                faqs: state.faqs.filter(faq => faq._id !== payload),
                loading: false
            };
        case FAQ_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case UPDATE_LIKES:
            return {
                ...state,
                faqs: state.faqs.map(faq => faq._id === payload.id ?
                    {...faq, likes: payload.likes}
                    : faq),
                loading: false
            };
        case ADD_COMMENT:
            return {
                ...state,
                faq: {...state.faq, comments: payload},
                loading: false
            };
        case REMOVE_COMMENT:
            return {
                ...state,
                faq: {...state.faq,
                comment: state.faq.comments.filter(comment => comment._id !== payload)
                },
                loading: false
            };

        default: return state;
    }
};