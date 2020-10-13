import SendTo from './SendTo.ts';

export default {
    getKakaoAccessToken(token, data) {
        return SendTo({
            headers: {
                authorization: `Bearer ${token}`
            },
            url: '/admin/kakao-token',
            method: 'post',
            data: data,
        })
    },

    kakaoBookMessage(token, data) {
        return SendTo({
            headers: {
                authorization: `Bearer ${token}`
            },
            url: '/admin/kakao-book-message',
            method: 'post',
            data: data
        });
    },

    kakaoCheckToken(token, data) {
        return SendTo({
            headers: {
                authorization: `Bearer ${token}`
            },
            url: '/admin/kakao-check-token',
            method: 'post',
            data: data,
        })
    },

    kakaoRefreshAccessToken(token) {
        return SendTo({
            headers: {
                authorization: `Bearer ${token}`
            },
            url: '/admin/kakao-refresh-access-token',
            method: 'get',
        })
    }
};