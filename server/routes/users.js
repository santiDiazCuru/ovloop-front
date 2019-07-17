const express = require('express');
const router = express.Router();
const Axios = require('axios')


router.post('/login', (req, res) => {
    return Axios.post('http://localhost:8080/users/login', req.body)
        .then(user => res.json(user))
})

router.get("/session", function (req, res) {
    return Axios.get('http://localhost:8080/users/session')
        .then(session => res.json(session))
});

router.get("/logout", function (req, res) {
    return Axios.get('http://localhost:8080/users/logout')
    .then(() => res.status(200).end())
});

module.exports = router