const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const planetsRouter = require('./routes/planets/planets.router.js');
const { launchesRouter } = require('./routes/launches/launches.router.js');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
       res.sendStatus(200);
     }
     else {
       next();
     }});

// app.use(cors({
//     origin: 'https://rocky-fjord-66825.herokuapp.com',
// }))

app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);

module.exports = app;