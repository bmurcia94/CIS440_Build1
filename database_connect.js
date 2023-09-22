var mysql = require("mysql")

var con = mysql.createConnection({
    host: "107.180.1.16",
    port: "3306",
    user: "fall2023team1",
    password: "fall2023team1",
    database: "fall2023team1"
});
//con.connect();

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
