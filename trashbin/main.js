//미들웨어 사용
const express = require('express');
const app = express();
const port = 3000;
const db = require('./lib/mysql');
var template = require('./lib/template.js');
var bodyParser = require('body-parser');
const { request } = require('https');
var compression = require('compression');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.get('/', (req, res) => {
    res.send('hello');
});

app.listen(port, () => {});
