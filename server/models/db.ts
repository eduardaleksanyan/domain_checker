const mysql = require("mysql");
const dbConfig = require("../config/mysql.config");

// let connection = async () => {
//     try {
//         let conn = await mysql.createPool({
//             host: dbConfig.HOST,
//             user: dbConfig.USER,
//             password: dbConfig.PASSWORD,
//             database: dbConfig.DB
//           });

//           return conn;
//     } catch (err) {
//         console.log('db connection fail');
//         process.exit(1);
//     }
// }
// let c = connection();
// module.exports = c;


let connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = connection;
