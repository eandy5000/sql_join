var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/sql_join";

app.set("port", process.env.PORT || 8000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/people', function(req, res){
    var results = [];
    //make sql language queries from server
        pg.connect(connectionString, function(err, client, done){
        var query = client.query('SELECT * FROM users;');
        console.log(query);
    //results come back one row at a time and are pushed into the results
        query.on('row', function(row){
            results.push(row);
        });

       //data returns close client/connection return results
            query.on('end', function(){
                client.end();
                console.log(results);
                return res.json(results);
            });
                    if (err) console.log("error is ",err);
         });
});






app.get('/*', function(req, res){
    var file = req.params[0] || "/assets/views/index.html";
    res.sendFile(path.join(__dirname, "./public/", file));
});

app.listen(app.get("port"), function(){
    console.log("Listening on port: ", app.get("port"));
});