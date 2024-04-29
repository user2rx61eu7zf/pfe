const mysql = require("mysql");
const dotenv = require("dotenv").config();

const bdd = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pfe",
  port: 3307,
});

bdd.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("connexion a la base de donne : " + bdd.state);
});

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
