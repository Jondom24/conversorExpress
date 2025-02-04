const mysql = require('mysql2/promise');
// Create the connection to database
//mysql://root:YioqinwcCdoAzjnxPFbxrSmgeXsXfJoE@monorail.proxy.rlwy.net:13027/railway
const connection = mysql.createPool({
    host: process.env.HOSTDB || 'localhost',
    user: process.env.USERDB || 'root',
    database: process.env.DB || 'servletlogin',
    password: process.env.PASSWORDDB || '',
    port: process.env.PORTDB || 3306
  });

  module.exports = connection;