const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors');

const reservation = require('./reservation');
const userinfo = require('./userinfo');
const enroll = require('./enroll')

router.use(cors());
router.use(bodyParser.json());

router.use('/reservation', reservation);
router.use('/userinfo', userinfo);
router.use('/enroll', enroll);

module.exports = router;