import SendTo from './SendTo.ts';

export default {
    getUserInfo(token, id) {
        return SendTo({
            headers: {
                Authorization: `Bearer ${token}`
            },
            url: `/users/getuser/${id}`,
            method: 'get',
        })
    },

    subtractLesson(fullname) {
        return SendTo({
            url: `/users/subtract-lesson/${fullname}`,
            method: 'put',
        })
    },

    getAllUserInfo() {
        return SendTo({
            url: `/users/alluser`,
            method: 'get',
        })
    },

    addLesson(data) {
        return SendTo({
            url: `/users/add-lesson`,
            method: 'put',
            data: data
        })
    },

    getKakaoAccessToken(data) {
        return SendTo({
            url: '/users/kakao-token',
            method: 'post',
            data: data,
        })
    }
};