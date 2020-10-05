import SendTo from './SendTo';

export default {
    signIn(data) {
        return SendTo({
            url: '/auth/sign-in',
            method: 'post',
            data: data
        })
    },
};