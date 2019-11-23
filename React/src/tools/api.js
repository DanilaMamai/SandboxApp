import axios from 'axios';

export const params = {
    url: 'http://188.225.74.18/'
}

export const api = {
    onLogin: (email, password) => {
        return axios.post(params.url.concat('api/Authentication'), {
            email,
            password
        })
    },
    onLoginToken: token => {
        return axios.get(params.url.concat('api/Authentication'), {
            params: {
                token
            }
        })
    },
    getBooks: () => {
        return axios.get(params.url.concat('api/Books'))
    }
}