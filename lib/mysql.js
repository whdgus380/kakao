var mysql = require('mysql');
var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'gmlakd4818',
    database: 'opentutorials',
});
db.connect();

module.exports = db;
