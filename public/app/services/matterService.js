angular.module( 'matterService' , [])

	.factory( 'Matters' , function($http) {

		// crea un nuevo objeto para el servicio
		var matterFactory = {};

		// obtiene un curso
		matterFactory.get = function(id) {
			return $http.get( '/apiM/matters/' + id);
		};

		// obtiene todos los cursos
		matterFactory.all = function() {
			return $http.get( '/apiM/matters/' );
		};

		//obtiene las instituciones y escuelas
		matterFactory.nombresInstituciones = function(){
			// hace un get al api de instituciones
			return $http.get( '/apiI/instituciones/escuelas' );
		}

		// obtiene el programa
		matterFactory.getPrograma = function(matterData) {
			//llama al api de programas
			return $http.get( '/apiP/instituciones/programaEscuela/'+ matterData );
		};

		// obtiene todos los programas de una escuela en una institucion
		matterFactory.getProgramas = function(matterData) {
			//llama al api de programas
			return $http.get( '/apiP/instituciones/programasEscuela/'+ matterData );
		};

		// obtiene todos los profesores de una escuela en una institucion
		matterFactory.getProfesores = function(matterData) {
			//llama al api de teachers
			return $http.get( '/apiT/teachers/school/'+ matterData );
		};

		//----------------------------CRUDs------------------------------------
		// crea un curso
		matterFactory.crearCurso = function(matterData) {
			return $http.post( '/apiM/matters/' , matterData);
		};

		// actualiza un curso
		matterFactory.actualizarCurso = function(matterData) {
			return $http.put( '/apiM/matters/', matterData);
		};

		// borra un curso
		matterFactory.borrarCurso = function(id) {
			return $http.delete( '/apiM/matters/' + id);
		};



		// retorna el servicio matterFactory
		return matterFactory;
	});