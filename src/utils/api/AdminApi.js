import SendTo from './SendTo';

export default {
    signIn(data) {
        return SendTo({
            url: '/admin/signin',
            method: 'post',
            data: data
        })
    }
};