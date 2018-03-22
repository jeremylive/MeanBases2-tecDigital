angular.module( 'institutionService' , [])

	.factory( 'Institutions' , function($http) {

		// crea un nuevo objeto para el servicio
		var institutionFactory = {};

		// obtiene una institucion
		institutionFactory.get = function(name) {
			return $http.get( '/apiI/institutions/' + name);
		};

		// obtiene todas las instituciones
		institutionFactory.all = function() {
			return $http.get( '/apiI/institutions/' );
		};

		// crea una institucion
		institutionFactory.create = function(instituteData) {
			return $http.post( '/apiI/institutions/' , instituteData);
		};

		// actualiza una institucion
		institutionFactory.update = function(name, instituteData) {
			return $http.put( '/apiI/institutions/' + name, instituteData);
		};

		// borra una institucion
		institutionFactory. delete = function(name) {
			return $http.delete( '/apiI/institutions/' + name);
		};

		// retorna el objeto del servicio institutionFactory
		return institutionFactory;
	});