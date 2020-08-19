import SendTo from './SendTo';

export default {
    signIn(data) {
        return SendTo({
            url: '/userinfo/signin',
            method: 'post',
            data: data
        })
    },

    getUserInfo(fullname) {
        return SendTo({
            url: `/userinfo/getuser/${fullname}`,
            method: 'get',
        })
    },

    setUserInfo(fullname) {
        return SendTo({
            url: `/userinfo/setuser/${fullname}`,
            method: 'get',
        })
    },

    getAllUserInfo() {
        return SendTo({
            url: `/userinfo/alluser`,
            method: 'get',
        })
    },

    addLesson(data) {
        return SendTo({
            url: `/userinfo/lesson-update`,
            method: 'post',
            data: data
        })
    }
};