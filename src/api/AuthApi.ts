import SendTo from './SendTo.ts';

export default {
    signIn(data) {
        return SendTo({
            url: '/auth/sign-in',
            method: 'post',
            data: data
        })
    },
};