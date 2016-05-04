//script calling google places api and returns json on success 

var express = require('express');
var app = express();
var request = require('request');
var data = null;



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=44.7866,20.4489&radius=15000&type=restaurant%7Ccafe%7Cbar%7Cfood&key=AIzaSyCHrW3KvAifw16FrpjDXcepinA5QZmEwVY';

    
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    data = JSON.parse(body);
  } else {
    console.log("Got an error: ", error, ", status code: ", response.statusCode);
  }
});


app.get('/data', function(req, res){
  res.send(data); 
});

app.listen(3000);