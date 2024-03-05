const mysql = require('mysql');
const dotenv = require('dotenv').config();



const bdd = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

bdd.connect((err) => {
    if (err) {
        console.log(err.message)
    }
    console.log("connexion a la base de donne : " + bdd.state)
})

module.exports = bdd;