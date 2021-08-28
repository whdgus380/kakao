var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'gmlakd4818',
    database: 'nodejs_express',
    port: '3306',
});

connection.connect();

connection.query('SELECT * FROM topic', function (error, results, fields) {
    if (error) {
        console.log(error);
    }
    console.log(results);
});

connection.end();
