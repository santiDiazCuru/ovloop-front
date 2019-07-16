'use strict';
/* eslint-disable new-cap */

const router = require('express').Router();


router.use('/stats', require('./stats'));


module.exports = router;