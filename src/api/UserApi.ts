import { AxiosRequestConfig } from 'axios';
import SendTo from './SendTo.ts';

export default {
    signUp(token: string, data: IObject): AxiosRequestConfig {
        return SendTo({
            headers: {
                Authorization: `Bearer ${token}`
            },
            url: `/users/signup`,
            method: 'post',
            data: data
        });
    },

    getUserInfo(token: string, id: string): AxiosRequestConfig {
        return SendTo({
            headers: {
                Authorization: `Bearer ${token}`
            },
            url: `/users/getuser/${id}`,
            method: 'get'
        });
    },

    getAdminList(token) {
        return SendTo({
            headers: {
                Authorization: `Bearer ${token}`
            },
            url: '/users/adminlist',
            method: 'get'
        });
    },

    findUser(token, id) {
        return SendTo({
            headers: {
                Authorization: `Bearer ${token}`
            },
            url: `/users/finduser/${id}`,
            method: 'get'
        });
    },

    putAlterLesson(token, fullname) {
        return SendTo({
            headers: {
                Authorization: `Bearer ${token}`
            },
            url: `/users/alter-lesson/${fullname}`,
            method: 'put'
        });
    },

    getAllUserInfo(token) {
        return SendTo({
            headers: {
                Authorization: `Bearer ${token}`
            },
            url: `/users/alluser`,
            method: 'get'
        })
    },

    putEnrollLesson(token, data) {
        return SendTo({
            headers: {
                Authorization: `Bearer ${token}`
            },
            url: `/users/enroll-lesson`,
            method: 'put',
            data: data
        });
    },

    getKakaoAccessToken(data) {
        return SendTo({
            url: '/users/kakao-token',
            method: 'post',
            data: data
        });
    }
};