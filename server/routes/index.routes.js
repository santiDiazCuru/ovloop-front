'use strict';
/* eslint-disable new-cap */

const router = require('express').Router();


router.use('/stats', require('./stats'));
router.use('/users', require('./users'))
router.use('/messages', require('./messages'))


module.exports = router;