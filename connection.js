const mysql=require('mysql');
var connection = mysql.createConnection({
        host: 'database-2.cijg9on2lm0h.ap-south-1.rds.amazonaws.com',
        user: 'admin',
        password: "rocketman",
        database: 'innodb'
});
connection.connect();
module.exports=connection;