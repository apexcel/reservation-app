const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors');

const reservation = require('./reservation');
const login = require('./login');
const table = require('./table')

router.use(cors());
router.use(bodyParser.json());

router.use('/reservation', reservation);
router.use('/login', login);
router.use('/table', table);

module.exports = router;