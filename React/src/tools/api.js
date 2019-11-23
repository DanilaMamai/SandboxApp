import axios from 'axios';

export const client = axios.create({
    baseURL: 'http://188.225.74.18/',
});

const token = localStorage.token;
if (token) {
    client.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
}

export const api = {
    onLogin: (email, password) => {
        return client.post('api/Authentication', {
            email,
            password
        })
    },
    onLoginToken: token => {
        return client.get('api/Authentication', {
            params: {
                token
            }
        })
    },
    getBooks: () => {
        return client.get('api/Books')
    },
    getPosts: () => {
        return client.get('api/Posts')
    }
}