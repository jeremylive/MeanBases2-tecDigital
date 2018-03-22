angular.module( 'matterService' , [])

	.factory( 'Matter' , function($http) {

		// crea un nuevo objeto para el servicio
		var matterFactory = {};

		// obtiene un curso
		matterFactory.get = function(name) {
			return $http.get( '/apiM/matters/' + name);
		};

		// obtiene todos los cursos
		matterFactory.all = function() {
			return $http.get( '/apiM/matters/' );
		};

		// crea un curso
		matterFactory.create = function(matterData) {
			return $http.post( '/apiM/matters/' , matterData);
		};

		// actualiza un curso
		matterFactory.update = function(name, matterData) {
			return $http.put( '/apiM/matters/' + name, matterData);
		};

		// borra un curso
		matterFactory. delete = function(name) {
			return $http.delete( '/apiM/matters/' + name);
		};

		// retorna el objeto del servicio matterFactory
		return matterFactory;
	});