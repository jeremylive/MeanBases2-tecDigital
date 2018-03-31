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
		studentFactory.create = function(teacherData) {
			return $http.post( '/apiS/students/' , teacherData);
		};

		// actualiza un estudiante
		studentFactory.update = function(id, studentData) {
			return $http.put( '/apiS/students/' + id, studentData);
		};

		// borra un estudiante
		studentFactory.delete = function(id) {
			return $http.delete( '/apiS/students/' + id);
		};
		////////////////////////
		studentFactory.nombresInstituciones = function(){
			// hace un get al api de instituciones
			return $http.get( '/apiI/instituciones/escuelas' );
		}
		//
		studentFactory.nombresEscuelas = function(){
			return $http.get( '/apiP/instituciones/programas' );
		}
		//
		studentFactory.nombresProgramas = function(){
			return $http.get( '/apiP/instituciones/programas' );
		}
		//

		return studentFactory;
	})