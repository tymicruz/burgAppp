angular.module('SocketService', []).factory('Socket', function(){

	var socket = io.connect('http://192.168.0.5:8888');

	return socket;
});