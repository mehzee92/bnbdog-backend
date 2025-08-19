const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'user_bnbdog',
//   password: process.env.DB_PASS || 'pass_bnbdog',
//   database: process.env.DB_NAME || 'bnbdog',
//   connectionLimit: 10,
// });


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bnbdog',
  connectionLimit: 10,
});

module.exports = pool;
