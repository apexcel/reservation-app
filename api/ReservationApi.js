import SendTo from './SendTo';

export default {
    setReservationList(data) {
        return SendTo({
            url: '/reservation/set-booked-data',
            method: 'post',
            data: data
        })
    },

    getReservationList(data) {
        return SendTo({
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