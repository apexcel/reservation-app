const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = express.Router();
const cors = require('cors');

const authRouter = require('./auth/auth.router');
const reservationRouter = require('./reservation/reservation.router');
const usersRouter = require('./users/users.router');
const adminRouter = require('./admin/admin.router');
const errorRouter = require('./error.router');

router.use(cors());
router.use(bodyParser.json());
router.use(cookieParser());

// TODO: auth 라우터 이용
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/reservation', reservationRouter);
router.use('/admin', adminRouter);
router.use(errorRouter);

module.exports = router;