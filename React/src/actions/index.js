import { ACTIONS } from './actions-type';
import { api, client } from '../tools/api';

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
    console.log(token);
    if (token) {
        api.onLoginToken(token)
            .then(res => {
                dispatch(setUser(res.data));
                client.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
            })
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
