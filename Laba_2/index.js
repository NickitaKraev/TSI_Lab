const mysql = require("mysql2");
const express = require("express");
const fs = require('fs');
const app = express();
const urlencodedParser = express.urlencoded({extended: false});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "users",
  password: "root"
});

let jsonData = JSON.parse(fs.readFileSync('structure.json', 'utf-8'));
app.use('/css', express.static('css'));
app.set('view engine', 'ejs');

app.post("/add", urlencodedParser, function (req, res) {        
    if(!req.body) return res.sendStatus(400);
    connection.query("INSERT INTO data_base_ (date_, indications) VALUES (?,?)", [new Date().toLocaleDateString(), JSON.stringify(req.body)], (err) => {
      if(err) return console.log(err);
      res.redirect("/");
    });
});

app.get("/", function(req, res) {
  connection.query("SELECT * FROM data_base_", function(err, data) {
      if(err) return console.log(err); 
      res.render("index.ejs", {structure : jsonData, arr: data});
    });
});

app.get('/:name', function(req, res) {
  if(req.params.name === 'add'){
    res.render("add.ejs", {data : jsonData});
  }
  else{
    res.sendFile(__dirname + '/404.html');
  }
});

app.listen(3000);
