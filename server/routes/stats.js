const express = require('express');
const router = express.Router();
const Axios = require('axios')

router.get('/general', function (req, res) {
    Axios.get('http://localhost:8080/stats/general')
    .then((msgs)=> res.json(msgs.data))
})

router.post('/date', function (req, res) {
    Axios.post('http://localhost:8080/stats/date', req.body)
    .then((msgs)=> res.json(msgs.data))
})

router.get('/channel', function (req, res) {
    Axios.get('http://localhost:8080/stats/channel')
    .then((msgs)=> res.json(msgs.data))
})

router.get('/status', function (req, res) {
    Axios.get('http://localhost:8080/stats/status')
    .then((msgs)=> res.json(msgs.data))
})

module.exports = router