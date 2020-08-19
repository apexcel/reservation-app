import SendTo from './SendTo';

export default {
    test(data) {
        return SendTo({
            url: '/users/test',
            method: 'post',
            data: data
        })
    },

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

    updateLesson(fullname) {
        return SendTo({
            url: `/users/update-lesson/${fullname}`,
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
    }
};