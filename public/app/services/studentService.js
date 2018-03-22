angular.module( 'studentService' , [])

	.factory( 'Student' , function($http) {
		var studentFactory = {};
		
		// obtiene un estudiante
		studentFactory.get = function(id) {
			return $http.get( '/apiS/students/' + id);
		};

		// obtiene todos los estudiantes
		studentFactory.all = function() {
			return $http.get( '/apiS/students/' );
		};

		// crea un estudiante
		studentFactory.create = function(studentData) {
			return $http.post( '/apiS/students/' , studentData);
		};

		// actualiza un estudiante
		studentFactory.update = function(id, teacherData) {
			return $http.put( '/apiS/students/' + id, studentData);
		};

		// borra un estudiante
		studentFactory.delete = function(id) {
			return $http.delete( '/apiS/students/' + id);
		};
		
		return studentFactory;
	})