const express = require('express');
const router = express.Router();
const Axios = require('axios')

const host = `http://${process.env.API_HOST}:${process.env.API_PORT}`;

router.get('/general', function (req, res) {
    Axios.get(`${host}/stats/general`)
    .then((msgs)=> res.json(msgs.data))
})

router.post('/date', function (req, res) {
    Axios.post(`${host}/stats/date`, req.body)
    .then((msgs)=> res.json(msgs.data))
})

router.get('/channel', function (req, res) {
    Axios.get(`${host}/stats/channel`)
    .then((msgs)=> res.json(msgs.data))
})

router.get('/status', function (req, res) {
    Axios.get(`${host}/stats/status`)
    .then((msgs)=> res.json(msgs.data))
})

module.exports = router