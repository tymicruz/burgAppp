var ObjectID = require('mongodb').ObjectID;
var exec = require('child_process').exec;


module.exports = function(app, db) {

	app.get('/', function(req, res){
		res.send('welcome to moticat');
		//res.sendfile('./public/views/index.html'); //load our public/index.html file

	});

	app.get('/videos', function(req, res){
		var videos = db.collection('videos');

		videos.find({}).toArray(function(err, docs) {
	
			if(err) throw err;

			res.send(docs);
		});
	});

	app.get('/quotes', function(req, res){
		var quotes = db.collection('quotes');

		quotes.find({}).toArray(function(err, docs) {

			if(err) throw err;

			res.send(docs);
		});
	});






	// app.get('/api/others', function(req, res){
	// 	var others = db.collection('others');

	// 	others.find({}).toArray(function(err, docs) {

	// 		if(err)
	// 		{
	// 			throw err;
	// 		}	

	// 		res.send(docs);
	// 	});
	// });

	// app.post('/api/burgers', function(req, res){

	// 	var burgers = db.collection('burgers');
	// 	var burgerData = req.body;

	// 	burgers.insert(burgerData, function(err, inserted){

	// 		if (err) throw err;


	// 		console.log("created: " + JSON.stringify(inserted.ops[0]._id));

	// 		res.send(inserted.ops[0]._id);

	// 		io.sockets.emit('newburger', inserted.ops[0]._id);
	// 		//exec('start "" "taskkill" "/im" "iexplore.exe"');
	// 	});
	// });

	// app.get('/api/burgers/:burgerID', function(req, res){

	// 	var burgers = db.collection('burgers');

	// 	var burgerID = req.params.burgerID;

	// 	var obID = new ObjectID(burgerID);

	// 	burgers.findOne({_id: obID}, function(err, doc){

	// 		if(err)
	// 		{
	// 			res.send(400, "NOT FOUND")
	// 			throw err;
	// 		}

	// 		console.log("found: " + JSON.stringify(doc));
	// 		res.send(doc);
			
	// 	});
	// });

	// app.get('/api/burgers?:numBurgers', function(req, res){

	// 	var burgers = db.collection('burgers');

	// 	//make sure this is actually a number later on
	// 	//depends on client typing valid
	// 	console.log(req.params.numBurgers);
	// 	var numBurgers = parseInt(req.params.numBurgers);
	// 	console.log(numBurgers);

	// 	burgers.find().sort({"editDate" : -1}).limit(10).toArray(function(err, docs){

	// 		if(err)
	// 		{
	// 			res.send(400, "NOT FOUND")
	// 			throw err;
	// 		}

	// 		//console.log("found: " + JSON.stringify(docs));
	// 		res.send(docs);

	// 	});

	// });


	// app.put('/api/burgers', function(req, res){

	// 	console.log("update try:")
	// 	var burgers = db.collection('burgers');
	// 	var burger = req.body;
	// 	console.log(JSON.stringify(burger));
	// 	var burgerID = burger._id;

	// 	console.log("id is " + burgerID);

	// 	var obID = new ObjectID(burgerID);

	// 	var operator = { $set : {array : burger.array, editDate : burger.editDate, bun : burger.bun}};

	// 	burgers.update({_id: obID}, operator, function(err, doc){

	// 		if(err)
	// 		{
	// 			res.send(400, "NOT FOUND")
	// 			throw err;
	// 		}

	// 		console.log("found: " + JSON.stringify(doc));
	// 		res.send(doc);
	// 		io.emit('burgerupdated', doc);
	// 	});
	// });

app.put('/user/:id', function(req, res){

		console.log("add user if non-existence")
		var users = db.collection('users');

		
		var burger = req.body;
		console.log(JSON.stringify(burger));
		var burgerID = burger._id;

		console.log("id is " + burgerID);

		var obID = new ObjectID(burgerID);

		var operator = { $set : {array : burger.array, editDate : burger.editDate, bun : burger.bun}};

		burgers.update({_id: obID}, operator, function(err, doc){

			if(err)
			{
				res.send(400, "NOT FOUND")
				throw err;
			}

			console.log("found: " + JSON.stringify(doc));
			res.send(doc);
			io.emit('burgerupdated', doc);
		});
	});

	// app.delete('/api/burgers/:burgerID', function(req,res){
	// 	var burgers = db.collection('burgers');

	// 	var obID = new ObjectID(req.params.burgerID);

	// 	burgers.remove({_id : obID}, function(err, doc){
	// 		if(err){
	// 			throw err;
	// 		}
	// 		console.log("removed:");
	// 		console.log(JSON.stringify(doc));
	// 		res.send(doc);
	// 		io.emit('burgerdeleted', doc);
	// 		//exec('start "" "iexplore" "netflix.com"');
	// 	});
	// });
};