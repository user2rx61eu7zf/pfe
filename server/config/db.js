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

// function dbQuery(sql, params) {
//     return new Promise((resolve, reject) => {
//         bdd.query(sql, params, (err, results) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(results);
//             }
//         });
//     });
// }

module.exports = bdd;
// module.exports = { dbQuery };
