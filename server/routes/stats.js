const express = require('express');
const router = express.Router();
const Axios = require('axios')

//const host = `http://${process.env.API_HOST}:${process.env.API_PORT}`;

// router.post('/', (req, res) => {
//     return Axios.post(`${host}/stats`, req.body)
//         .then(msgs => res.json(msgs.data))
// })
// router.get('/getchannels', (req, res) => {
//     return Axios.get(`${host}/stats/getchannels`)
//         .then(channels => res.json(channels.data))
// })
// router.get('/getorigins', (req, res) => {
//     return Axios.get(`${host}/stats/getorigins`)
//         .then(origins => res.json(origins.data ))
// })

router.post('/', (req, res) => {
    return Axios.post(`http:localhost:8080/stats`, req.body)
        .then(msgs => res.json(msgs.data))
})
router.get('/getchannels', (req, res) => {
    return Axios.get(`http:localhost:8080/stats/getchannels`)
        .then(channels => res.json(channels.data))
})
router.get('/getorigins', (req, res) => {
    return Axios.get(`http:localhost:8080/stats/getorigins`)
        .then(origins => res.json(origins.data ))
})


module.exports = router


    // router.get('/general', function (req, res) {
    //     Axios.get('http://localhost:8080/stats/general')
    //     .then((msgs)=> res.json(msgs.data))
    // })

    // router.post('/date', function (req, res) {
    //     Axios.post('http://localhost:8080/stats/date', req.body)
    //     .then((msgs)=> res.json(msgs.data))
    // })

    // router.get('/channel', function (req, res) {
    //     Axios.get('http://localhost:8080/stats/channel')
    //     .then((msgs)=> res.json(msgs.data))
    // })

    // router.get('/status', function (req, res) {
    //     Axios.get('http://localhost:8080/stats/status')
    //     .then((msgs)=> res.json(msgs.data))
    // })