const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors');

const reservationRouter = require('./reservation/reservation.router');
const usersRouter = require('./users/users.router');
const adminRouter = require('./admin/admin.router');

router.use(cors());
router.use(bodyParser.json());

router.use('/reservation', reservationRouter);
router.use('/users', usersRouter);
router.use('/admin', adminRouter);

module.exports = router;