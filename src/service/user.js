import axios from '../utils/axios'

export function login(params) {
    return axios.post('/user/login', params)
}

export function register(params) {
    return axios.post('/user/register', params)
}

export function getUserInfo() {
    return axios.get('/user/info')
}

export function logout() {
    return axios.post('/user/logout')
}

export function editUserInfo(params) {
    return axios.put('/user/info', params)
}