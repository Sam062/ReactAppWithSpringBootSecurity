import axios from 'axios';
import { BASE_URL } from '../Utils/UrlUtils';

export const signin = (data) => {
    return axios.post(BASE_URL + '/signin', data);
}

export const signup = (data) => {
    return axios.post(BASE_URL + '/signup', data);
}

export const signout = () => {
    localStorage.removeItem('user');
}

export const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

