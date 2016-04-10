var express = require('express'),
MongoClient = require('mongodb').MongoClient,
app = express(),
bodyParser = require('body-parser'),
methodOverride = require('method-override');
//socketio = require('socket.io'),
var http = require('http');
var server = http.createServer(app);
//io = socketio.listen(server);



var port = process.env.PORT || 8080;

MongoClient.connect('mongodb://localhost:27017/moticat', function(err, db) {
	"use strict";


	if(err) throw err;

	var port = process.env.PORT || 8888;

	//app.set('socketio', io);
	app.set('server', server)
	app.use(bodyParser.json());
	app.use(bodyParser.json({type:'application/vnd.api+json'}));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(methodOverride('X-HTTP-Mthod-Override'));

	app.use(express.static(__dirname + '/public'));
	app.use(express.static(__dirname + '/bower_components'));
	
	require('./app/routes')(app, db);

	app.get('server').listen(port, function(){
		console.log('moticat magic is happening on port ' + port);
		console.log("make sure client is listening on same port as server is running on");
	});

	// io.sockets.on('connection', function(socket)
	// {
	// 	socket.on('made-burger', function(data)
	// 	{
	// 		io.sockets.emit('new-burger', data);
	// 	});

	// });

});

module.exports = app;
/*8681 state route 270 pullman,wa 99163
until 8-5:30 m-f*/