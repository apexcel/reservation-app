const express = require('express');
const router = express.Router();
const reservationController = require('./reservation.controller')

router.post("/get-booked-data", (req, resp, next) => {
    reservationController.getBookedData(req, resp, next)
});

router.post("/set-booked-data", (req, resp, next) => {
    reservationController.setBookedData(req, resp, next)
});

router.post('/find', (req, resp, next) => {
    reservationController.findReservation(req, resp, next)
})

module.exports = router;