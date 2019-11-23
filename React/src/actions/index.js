import { ACTIONS } from './actions-type';
import { api } from '../tools/api';

const setLoading = loading => ({
    type: ACTIONS.SET_LOADING,
    loading
});

const setError = error => ({
    type: ACTIONS.SET_ERROR,
    error
});

const setUser = user => ({
    type: ACTIONS.SET_USER,
    user
})

const logInWithToken = () => dispatch => {
    const token = localStorage.token;
    if (token) {
        api.onLoginToken(token)
            .then(res => dispatch(setUser(res.data)))
            .catch(error => {
                console.log(error);
                localStorage.removeItem("token");
            });
    }
}

const logOut = () => dispatch => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
}

export { setLoading, setError, setUser, logOut, logInWithToken };
