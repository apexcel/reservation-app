import SendTo from './SendTo';

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

    getReservationList(token, data) {
        return SendTo({
            headers: {
                authorization: `Bearer ${token}`
            },
            url: '/reservation/get-booked-data',
            method: 'post',
            data: data
        })
    },

    getUserReservationList(data) {
        return SendTo({
            url: '/reservation/find',
            method: 'post',
            data: data
        })
    }
};