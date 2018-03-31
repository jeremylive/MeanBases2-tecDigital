angular.module( 'programService' , [])

	.factory( 'Programs' , function($http) {

		// crea un nuevo objeto para el servicio
		var programFactory = {};

		//MANEJO DE PROGRAMAS
		//###################################################################################################################
		programFactory.nombresInstituciones = function(){
			// hace un get al api de instituciones
			return $http.get( '/apiI/instituciones/escuelas' );
		}

		programFactory.nombresProgramas = function(){
			return $http.get( '/apiP/instituciones/programas' );
		}

		programFactory.getPrograma = function(id){
			return $http.get( '/apiP/instituciones/programas/'+ id );
		}

		programFactory.crearPrograma = function(data){
			return $http.post( '/apiP/instituciones/programas', data);
		}

		programFactory.actualizarPrograma = function(data){
			return $http.put( '/apiP/instituciones/programas', data);
		}

		programFactory.borrarPrograma = function(data){
			return $http.delete( '/apiP/instituciones/programas/'+ data);
		}

		//MANEJO DE MATERIAS
		//###################################################################################################################
		programFactory.agregarMateria = function(data){
			return $http.post( '/apiP/programas/materias', data);
		}

		programFactory.actualizarMateria = function(data){
			return $http.put( '/apiP/programas/materias', data);
		}

		programFactory.borrarMateria = function(data){
			return $http.delete( '/apiP/programas/materias/'+ data);
		}

		// retorna el objeto del servicio programFactory
		return programFactory;
	});