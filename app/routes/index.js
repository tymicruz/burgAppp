var ObjectID = require('mongodb').ObjectID;


module.exports = function(app, db, io) {

	app.get('/', function(req, res){
		//res.send('welcome to Burgapp');
		res.sendfile('./public/views/index.html'); //load our public/index.html file

	});

	app.get('/api/buns', function(req, res){
		var buns = db.collection('buns');

		buns.find({}).toArray(function(err, docs) {
	
			if(err) throw err;

			//console.log(docs);
			res.send(docs);
		});
	});

	app.get('/api/meats', function(req, res){
		var meats = db.collection('meats');

		meats.find({}).toArray(function(err, docs) {

			if(err) throw err;

			res.send(docs);
		});
	});

	app.get('/api/cheeses', function(req, res){
		var cheeses = db.collection('cheeses');

		cheeses.find({}).toArray(function(err, docs) {

			if(err) throw err;

			res.send(docs);
		});
	});

	app.get('/api/veggies', function(req, res){
		var veggies= db.collection('veggies');

		veggies.find({}).toArray(function(err, docs) {

			if(err) throw err;

			res.send(docs);
		});
	});

	app.get('/api/condos', function(req, res){
		var condiments = db.collection('condos');

		condiments.find({}).toArray(function(err, docs) {


			if(err)
			{
				throw err;
			}	

			res.send(docs);
		});
	});

	app.get('/api/others', function(req, res){
		var others = db.collection('others');

		others.find({}).toArray(function(err, docs) {

			if(err)
			{
				throw err;
			}	

			res.send(docs);
		});
	});

	app.post('/api/burgers', function(req, res){

		var burgers = db.collection('burgers');
		var burgerData = req.body;

		burgers.insert(burgerData, function(err, inserted){

			if (err) throw err;


			console.log("created: " + JSON.stringify(inserted.ops[0]._id));

			res.send(inserted.ops[0]._id);
		});
	});

	app.get('/api/burgers/:burgerID', function(req, res){

		var burgers = db.collection('burgers');

		var burgerID = req.params.burgerID;

		var obID = new ObjectID(burgerID);

		burgers.findOne({_id: obID}, function(err, doc){

			if(err)
			{
				res.send(400, "NOT FOUND")
				throw err;
			}

			console.log("found: " + JSON.stringify(doc));
			res.send(doc);
		});
	});

	app.get('/api/burgers?:numBurgers', function(req, res){

		var burgers = db.collection('burgers');

		//make sure this is actually a number later on
		//depends on client typing valid
		console.log(req.params.numBurgers);
		var numBurgers = parseInt(req.params.numBurgers);
		console.log(numBurgers);

		burgers.find().sort({"editDate" : -1}).limit(10).toArray(function(err, docs){

			if(err)
			{
				res.send(400, "NOT FOUND")
				throw err;
			}

			//console.log("found: " + JSON.stringify(docs));
			res.send(docs);
		});

	});

	app.put('/api/burgers', function(req, res){

		console.log("update try:")
		var burgers = db.collection('burgers');
		var burger = req.body;
		console.log(JSON.stringify(burger));
		var burgerID = burger._id;

		console.log("id is " + burgerID);

		var obID = new ObjectID(burgerID);

		var operator = { $set : {array : burger.array, editDate : burger.editDate}};

		burgers.update({_id: obID}, operator, function(err, doc){

			if(err)
			{
				res.send(400, "NOT FOUND")
				throw err;
			}

			console.log("found: " + JSON.stringify(doc));
			res.send(doc);
		});
	});
};