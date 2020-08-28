import SendTo from './SendTo';

export default {
    signIn(data) {
        return SendTo({
            url: '/admin/signin',
            method: 'post',
            data: data
        })
    },

    getAdminList() {
        return SendTo({
            url: '/admin/adminlist',
            method: 'get',
        })
    },

    getKakaoAccessToken(data) {
        return SendTo({
            url: '/admin/kakao-token',
            method: 'post',
            data: data,
        })
    },

    kakaoBookMessage(data) {
        return SendTo({
            url: '/admin/kakao-book-message',
            method: 'post',
            data: data,
        })
    },

    kakaoCheckToken(data) {
        return SendTo({
            url: '/admin/kakao-check-token',
            method: 'post',
            data: data,
        })
    },

    kakaoRefreshAccessToken() {
        return SendTo({
            url: '/admin/kakao-refresh-access-token',
            method: 'get',
        })
    }
};