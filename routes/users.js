const router = require('express').Router();
var mysql = require('mysql');

require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB_NAME,
    port: process.env.SQL_PORT
});

router.route('/allUsers').get((req, res) => {

    connection.connect();

    connection.query('SELECT username FROM ' + process.env.SQL_DB_NAME + '.ofUser WHERE username!="admin";', function (err, results, fields) {
        if (err) {
            res.status(500).json({ msg: "server error" });
            console.error(err);
        } else {
            var response = [];
            results.forEach(element => {
                response.push(element.username);
            });

            res.status(200).json({ userList: response })
        };
    });

    connection.end();
});

module.exports = router;
