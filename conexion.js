const mysql = require('mysql2/promise');
// Create the connection to database
//mysql://root:CGWQbZLEzeqwmkADikxwTJvCaaBhMPxl@viaduct.proxy.rlwy.net:26048/railway
const connection = mysql.createPool({
    host: process.env.HOSTDB || 'localhost',
    user: process.env.USERDB || 'root',
    database: process.env.DB || 'servletlogin',
    password: process.env.PASSWORDDB || '',
    port: process.env.PORTDB || 3306,
  });

  module.exports = connection;