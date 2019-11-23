import { ACTIONS } from '../actions/actions-type';

const initialState = { loading: false, user: null, error: '' };

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SET_USER:
            return { ...state, user: action.user }
        case ACTIONS.SET_LOADING:
            return { ...state, loading: action.loading }
        case ACTIONS.SET_ERROR:
            return { ...state, error: action.error };
        default:
            return state;
    }
};
