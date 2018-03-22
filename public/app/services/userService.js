angular.module( 'userService' , [])

	.factory( 'User' , function($http) {

		// crea un nuevo objeto para el servicio
		var userFactory = {};

		// obtiene un usuario
		userFactory.get = function(id) {
			return $http.get( '/api/users/' + id);
		};

		// obtiene todos los usuarios
		userFactory.all = function() {
			return $http.get( '/api/users/' );
		};

		// crea un usuario
		userFactory.create = function(userData) {
			return $http.post( '/api/users/' , userData);
		};

		// actualiza un usuario a user
		userFactory.update = function(id, userData) {
			return $http.put( '/api/users/' + id, userData);
		};

		// borra un usuario
		userFactory. delete = function(id) {
			return $http.delete( '/api/users/' + id);
		};

		// retorna el objeto del servicio userFactory
		return userFactory;
	});