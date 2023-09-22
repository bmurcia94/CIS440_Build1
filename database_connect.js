var mysql = require("mysql")

var con = mysql.createConnection({
    host: "107.180.1.16",
    port: "3306",
    user: "fall2023team1",
    password: "fall2023team1",
    database: "fall2023team1"
});

//Code below is a test that will pull data from our database
con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM User", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});
