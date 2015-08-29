// public/js/contollers/MainCtrl.js

angular.module('BurgerCtrl', []).controller('BurgerController', function($scope, Burger) {

	$scope.hideCss = "display: none;";

	$scope.postMode = true;
	$scope.postEditButton = "post urburg";
	//not post most 

	$scope.buns = [];
	$scope.meats = [];
	$scope.cheeses = [];
	$scope.veggies = [];
	$scope.condos = [];
	$scope.others = [];

	$scope.indexesToRemove = []; 

	$scope.word = " - the future of burger making";

	$scope.burger = 
	{
		//bun : {},
		//meats : [],
		//cheeses : [],
		//veggies : [],
		//condos : [],
		//others : [],

		array: []
	};

	$scope.restart = function(){

		$scope.burger = 	{
			//bun : {},
			//meats : [],
			//cheeses : [],
			//veggies : [],
			//condos : [],
			//others : [],

			array: []
		};

		$scope.postEditButton = "post urburg";
		$scope.indexesToRemove = [];

		$scope.postMode = true;

		$scope.word = "- the future of burger making";
	}

	Burger.getRecentBurgers("10").then(

		function(response){

			$scope.burgFeed = response.data;

	}, 

		function(response){
			console.log("nooooo wtf");


	});

	Burger.getBuns().then(

		function(response){
			//success
			$scope.buns = response.data;
			console.log("SUCCESSSSSS");
			console.log(response.status);
			//console.log(response.data);
	},

		function(response){
			console.log("FAIIIIIIIL")
			console.log(response.status);
	});

	Burger.getMeats().then(

		function(response){
			$scope.meats = response.data;
			//console.log(response.data);
	},

		function(response){
			console.log("FAIIIIIIIL")
			console.log(response.status);
	});

	Burger.getCheeses().then(

		function(response){
			$scope.cheeses = response.data;
	}, 

		function(response){
			console.log("FAIIIIIIIL")
			console.log(response.status);
	});

	Burger.getVeggies().then(

		function(response){
			$scope.veggies = response.data;
	}, 

		function(response){
			console.log("FAIIIIIIIL")
			console.log(response.status);
	});

	Burger.getCondos().then(

		function(response){
			$scope.condos = response.data;
	}, 

		function(response){
			console.log("FAIIIIIIIL")
			console.log(response.status);
	});

	Burger.getOthers().then(

		function(response){
			$scope.others = response.data;
	}, 

		function(res){
			console.log("FAIIIIIIIL")
			console.log(response.status);
	});


	$scope.setDescription = function(description)
	{
		//console.log(description);
		$scope.word = description;
	}

	$scope.clear = function()
	{		
		$scope.word = "...";
	}

	$scope.setBun = function (bun)
	{
		$scope.burger.bun = bun;
	}

	$scope.addCheese = function (cheese)
	{
		cheese.type = "cheese";
		//$scope.burger.cheeses.push(cheese);
		$scope.burger.array.push(cheese);
	}

	$scope.addMeat = function (meat)
	{
		meat.type = "meat";
		//$scope.burger.meats.push(meat);
		$scope.burger.array.push(meat);
	}

	$scope.addVeggie = function (veggie)
	{
		veggie.type = "veggie";
		//$scope.burger.veggies.push(veggie);
		$scope.burger.array.push(veggie);
	}

	$scope.addCondo = function (condo)
	{
		condo.type = "condo";
		//$scope.burger.condos.push(condo);
		$scope.burger.array.push(condo);
	}

	$scope.addOther = function (other)
	{
		other.type = "other";
		//$scope.burger.others.push(other);
		$scope.burger.array.push(other);
	}

	$scope.postBurger = function()
	{
		$scope.reorganizeBurger();

		if($scope.postEditButton == 'post urburg'){

			Burger.createBurger({"bun" : $scope.burger.bun, "array" : $scope.burger.array, "createDate" : Date.now(), "editDate" : Date.now()}).then(

				function(response){
					console.log("GOOD POST");
					console.log("new burgid: " + response.data);
					console.log(response.status);

					$scope.word = "new burgid: " + response.data;
					$scope.restart();
				},

				function(response){

					console.log("POST FAILURE wtf");
					console.log(response.data);
					console.log(response.status);
				});
		}
		else if ($scope.postEditButton == "update urburg")
		{
			//put to server new array change update time
			$scope.burger.editDate = Date.now();

			Burger.updateBurger($scope.burger).then(
				function(response){
					console.log("successful update");
					$scope.word = "update burgid: " + JSON.stringify(response.data);
					$scope.restart();
				}, function(response){
					console.log("fck failed update...");
				})
		}
	}

	//item is hidden on screen and will be deleted later
	$scope.remove = function(index)
	{
		if($scope.postMode)
		{
			$scope.indexesToRemove.push(index);
			console.log(index);
		}
	}

	//function physically removes the burger from the burger object
	//when they are clicked, they are just hidden to given the appearence
	//of them being removed
	$scope.reorganizeBurger = function() {

		$scope.indexesToRemove.sort();
		var actual = 0;

		for(var i = 0; i < $scope.indexesToRemove.length; i++)
		{
			var rem = [$scope.indexesToRemove[i] - actual];
			$scope.burger.array.splice(rem, 1);
			actual++;
		}

		$scope.indexesToRemove = [];//clear indexs to clear after burger is reorganizsed
	}

	$scope.getBurger = function(burgerID)
	{
		Burger.getBurger(burgerID).then(

			function(response){

				console.log("GOOD GET BURG");
				console.log(JSON.stringify(response.data));
				console.log(response.status);

				$scope.burger = response.data;
				$scope.burgerCreateDate = response.data.createDate;//$filter('date')(response.data.date, 'MM/dd/yyyy @ h:mma', 
				$scope.burgerEditDate = response.data.editDate;
				$scope.postMode = false;//let person look at their burger
			},

			function(response){

				console.log("GET BURG FAILURE wtf");
				console.log(response.data);
				console.log(response.status);
			});
	}

	$scope.editBurgerMode = function()
	{
		$scope.postMode = true;
		$scope.postEditButton = "update urburg";

	}

});