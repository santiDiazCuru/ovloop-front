'use strict';
/* eslint-disable new-cap */

const router = require('express').Router();


router.use('/stats', require('./stats'));
router.use('/users', require('./users'))

module.exports = router;