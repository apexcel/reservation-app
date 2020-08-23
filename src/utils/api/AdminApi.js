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
    }
};