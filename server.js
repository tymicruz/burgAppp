var express = require('express'),
MongoClient = require('mongodb').MongoClient,
app = express(),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
//server = require('http').createServer(app),
io = "io";//require('socket.io').listen(server);



var port = process.env.PORT || 8080;

MongoClient.connect('mongodb://localhost:27017/burgapp', function(err, db) {
	"use strict";


	if(err) throw err;

	var port = process.env.PORT || 8888;

	app.use(bodyParser.json());
	app.use(bodyParser.json({type:'application/vnd.api+json'}));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(methodOverride('X-HTTP-Mthod-Override'));

	app.use(express.static(__dirname + '/public'));
	
	require('./app/routes')(app, db, io);

	app.listen(port, function(){
		console.log('Burgapp magic is happening on port ' + port);
	});
	

});

module.exports = app;
/*8681 state route 270 pullman,wa 99163
until 8-5:30 m-f*/