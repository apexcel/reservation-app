import SendTo from './SendTo';

export default {
    signIn(data) {
        return SendTo({
            url: '/users/signin',
            method: 'post',
            data: data
        })
    },

    getUserInfo(fullname) {
        return SendTo({
            url: `/users/getuser/${fullname}`,
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