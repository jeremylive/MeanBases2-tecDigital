angular.module( 'teacherService' , [])

	.factory( 'Teacher' , function($http) {

		// crea un nuevo objeto para el servicio
		var teacherFactory = {};

		// obtiene un profesor
		teacherFactory.get = function(id) {
			return $http.get( '/apiT/teachers/' + id);
		};

		// obtiene todos los profesores
		teacherFactory.all = function() {
			return $http.get( '/apiT/teachers/' );
		};

		// crea un profesor
		teacherFactory.create = function(teacherData) {
			return $http.post( '/apiT/teachers/' , teacherData);
		};

		// actualiza un profesor
		teacherFactory.update = function(id, teacherData) {
			return $http.put( '/apiT/teachers/' + id, teacherData);
		};

		// borra un profesor
		teacherFactory. delete = function(id) {
			return $http.delete( '/apiT/teachers/' + id);
		};

		// retorna el objeto del servicio teacherFactory
		return teacherFactory;
	});