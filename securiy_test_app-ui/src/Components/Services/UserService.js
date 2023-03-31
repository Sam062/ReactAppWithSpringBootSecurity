import axios from 'axios';
import { authHeader, BASE_URL } from '../Utils/UrlUtils';

export const getPublicContent = () => {
    return axios.get(BASE_URL + '/public')
}

export const getUserBoard = () => {
    return axios.get(BASE_URL + '/user', authHeader())
}

export const getAdminBoard = () => {
    return axios.post(BASE_URL + '/admin', authHeader())
}

export const getReviewerBoard = () => {
    return axios.post(BASE_URL + '/reviewer', authHeader())
}

export const assessments = () => {
    return axios.get(BASE_URL + '/assessments', authHeader())
}
export const testSets = () => {
    return axios.get(BASE_URL + '/ts', authHeader())
}
export const results = () => {
    return axios.get(BASE_URL + '/rs', authHeader())
}

