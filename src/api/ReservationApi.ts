import SendTo from './SendTo.ts';

export default {
    setReservationList(token, data) {
        return SendTo({
            headers: {
                authorization: `Bearer ${token}`
            },
            url: '/reservation/set-booked-data',
            method: 'post',
            data: data
        })
    },

    getReservationList(token, params) {
        return SendTo({
            headers: {
                authorization: `Bearer ${token}`
            },
            url: `/reservation/get-booked-data/${params}`,
            method: 'get',
        })
    },

    getUserReservationList(token, params) {
        return SendTo({
            headers: {
                authorization: `Bearer ${token}`
            },
            url: `/reservation/find/${params}`,
            method: 'get',
        })
    }
};