import SendTo from './SendTo';

export default {
    signIn(data) {
        return SendTo({
            headers:{
                path: '/'
            },
            url: '/',
            method: 'post',
            data: data
        })
    },
};