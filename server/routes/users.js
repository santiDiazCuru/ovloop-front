const express = require('express');
const router = express.Router();
//const usersController = require('../controllers/users.controller')
const passport = require('../passport/config')
const User = require('../models/users')


//PASSPORT 
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user)
})

router.get("/session", function (req, res) {
   req.user ? res.json(true) : res.json(false)
});

router.get("/logout", function (req, res) {
    req.session.destroy();
    res.send(200)
});
router.post('/seed', (req,res)=>{
    User.create({username: 'admin', password: 'admin'})
    .then(user=>res.json(user))
})

module.exports = router