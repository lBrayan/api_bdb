var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'userapi',
    password: 'userapi',
    database: 'reto_bdb'
});
module.exports = connection;