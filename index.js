const express = require("express");
const morgan = require("morgan");
const path = require('path');
const router = require("./server/routes/index.routes");
// const db = require('../db/models').db
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// EXPRESS EJECUTION
const app = express();

// MONGOOSE SETTINGS (DEPRECATIONS)
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

// SETTTINGS
app.set("port", process.env.PORT || 7777);

// MIDDLEWARES
app.use(express.static(path.join(__dirname, './server/public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
app.use("/", router);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './server/public', 'index.html'));
})

const server = app.listen(app.get('port'), () => {
    console.log('App running in port ', app.get('port'))
});

module.exports = app;