const mysql = require("mysql2/promise");

// 配置数据库连接信息
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "crop",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
console.log("数据库连接成功");
// 导出连接池
module.exports = pool;
