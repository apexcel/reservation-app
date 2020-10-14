const express = require('express');
const router = express.Router();
const reservationController = require('./reservation.controller');

router.get("/get-booked-data/:date", (req, resp, next) => {
    reservationController.getBookedData(req, resp, next)
});

router.post("/set-booked-data", (req, resp, next) => {
    reservationController.setBookedData(req, resp, next)
});

router.get('/find/:fullname', (req, resp, next) => {
    reservationController.getUserReservationList(req, resp, next)
})

module.exports = router;