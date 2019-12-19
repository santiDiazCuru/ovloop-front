const express = require("express");
const router = express.Router();
const originList = require("../models/originlist");
const Message = require("../models/messages");
const Axios = require("axios");

//RUTAS CUANDO SE LEVANTA TODO DESDE EL BACK CON DOCKER
// const host = `http://${process.env.API_HOST}:${process.env.API_PORT}`;

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

//RUTAS PARA CUANDO SE LEVANTA TODO CON NPM INDEPENDIENTEMENTE
// router.post("/", (req, res) => {
//   return Axios.post(`http:localhost:8080/stats`, req.body).then(msgs =>
//     res.json(msgs.data)
//   );
// });
// router.get("/getchannels", (req, res) => {
//   return Axios.get(`http:localhost:8080/stats/getchannels`).then(channels =>
//     res.json(channels.data)
//   );
// });
// router.get("/getorigins", (req, res) => {
//   return Axios.get(`http:localhost:8080/stats/getorigins`).then(origins =>
//     res.json(origins.data)
//   );
// });
//RUTAS PARA QUE ANDE ESTO SOLO:

router.post("/", (req, res) => {
  var channel = req.body.channel;
  var to = req.body.to;
  var from = req.body.from;
  var origin = req.body.origin;
  var query = {};

  if (req.body.filter) {
    if (req.body.filter.type === "channel") {
      channel = req.body.filter.name;
      if (req.body.filter.origin) {
        origin = req.body.filter.origin;
      }
    }
    if (req.body.filter.type === "origin") {
      origin = req.body.filter.name;
      if (req.body.filter.channel) {
        channel = req.body.filter.channel;
      }
    }
  }

  if (to && from) {
    if (channel && origin) {
      query = {
        date: {
          $gte: from,
          $lt: to
        },
        channel: channel,
        origin: origin
      };
    } else if (channel) {
      query = {
        date: {
          $gte: from,
          $lt: to
        },
        channel: channel
      };
    } else if (origin) {
      query = {
        date: {
          $gte: from,
          $lt: to
        },
        origin: origin
      };
    } else {
      query = {
        date: {
          $gte: from,
          $lt: to
        }
      };
    }
  } else {
    if (channel && origin) {
      query = {
        channel: channel,
        origin: origin
      };
    } else if (channel) {
      query = {
        channel: channel
      };
    } else if (origin) {
      query = {
        origin: origin
      };
    } else {
      query = {};
    }
  }
  Message.find(query).then(msgs => {
    res.json(msgs);
  });
});
router.get("/getchannels", (req, res) => {
  const channels = Message.findChannels();
  res.json(channels);
});
router.get("/getorigins", (req, res) => {
  originList.find({}).then(origins => res.send(origins));
});
module.exports = router;
