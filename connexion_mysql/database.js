let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crudcontact'
});

connection.connect(function(error) {
    if (error) {
        console.log("connection to MySQL failed");
        throw error
    } else { console.log('connection to MYSQL success'); }
});

module.exports = connection;