// public/js/services/NerdService.js

angular.module('BurgerService', []).factory('Burger', ['$http', function($http){

	return {
		// call to get all nerds
		getBuns : function () {
			return $http.get('/api/buns');
		},

		getMeats : function () {
			return $http.get('/api/meats');
		},

		getCheeses : function () {
			return $http.get('/api/cheeses');
		},

		getVeggies : function () {
			return $http.get('/api/veggies');
		},

		getCondos : function(){
			return $http.get('/api/condos');
		},

		getOthers : function() {
			return $http.get('/api/others');
		},

		updateBurger : function(burgerData)
		{
			return $http.put('/api/burgers', burgerData);
		},

		getBurger : function (_id) {
			return $http.get('/api/burgers/'+_id);
		},

		createBurger : function(burgerData) {
			return $http.post('/api/burgers', burgerData);
		},

		// call to DELETE a nerd
		delete : function(id) {
			return $http.delete('/api/nerds' + id);
		},

		getRecentBurgers : function(num)
		{
			return $http.get('/api/burgers?'+num);
		}
	}

}]);


