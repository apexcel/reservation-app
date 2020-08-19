const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors');

const reservation = require('./reservation');
const usersRouter = require('./usersRouter');
const admin = require('./admin');
const enroll = require('./enroll');

router.use(cors());
router.use(bodyParser.json());

router.use('/reservation', reservation);
router.use('/users', usersRouter);
router.use('/admin', admin);
router.use('/enroll', enroll);

module.exports = router;