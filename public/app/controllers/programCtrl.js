// comienza el modulo de angular e inyecta el programService
angular.module( 'programCtrl' , [ 'programService' ])


	//###################################################################################################################
	.controller('programController' , function(Programs){
		var vm = this;

		// establece la variable processing para mostrar las varas de carga
		vm.processing = true;

		// carga todas las escuelas y su institución
		Programs.nombresProgramas()
		.success( function(data) {
			vm.processing = false;
			vm.programData = data;
		});
		
		// funcion para borrar un programa
		vm.borrarPrograma = function(id) {
			vm.processing = true;

			Programs.borrarPrograma(id)
			.success(function(data) {
				vm.processing = false;

				//refresco los valores
				Programs.nombresProgramas()
				.success( function(data) {
					vm.processing = false;
					vm.programData = data;
				});
			});
		};
	})

	// controlador para CREAR UN programa
	.controller( 'programCreateController' , function(Programs) {

		var vm = this;

		// variable para mostrar/ocultar los elementos de la vista
		// es lo que diferencia entre crear o editar en el html
		vm.type = 'create' ;

		// obtiene el parametro con la informacion de
		// las instituciones y escuelas existentes
		Programs.nombresInstituciones()
		.success( function(data) {
			vm.instituteData = data;
		});


		vm.data = {};

		// funcion para guardar el nuevo programa
		vm.guardarPrograma = function() {
			vm.processing = true;
			vm.message = '' ;


			// llama al programService para guardar
			Programs.crearPrograma(vm.data)
			.success( function(data) {
				vm.processing = false;
				vm.message = data.message;
			});
		};

	})

	// controlador para EDITAR UN PROGRAMA 
	.controller( 'programEditController' , function($routeParams,Programs) {

		var vm = this;

		// variable para mostrar/ocultar los elementos de la vista
		// es lo que diferencia entre crear o editar en el html
		vm.type = 'edit' ;

		// obtiene el parametro con el id del programa
		// $routeParams es la herramienta para agarrar la info del URL
		Programs.getPrograma($routeParams.program_id)
		.success( function(data) {
			vm.programData = data;
		});

		// funcion para guardar la nueva escuela 
		vm.guardarPrograma = function() {
			vm.processing = true;
			vm.message = '' ;


			// llama al programService para actualizar
			Programs.actualizarPrograma(vm.programData)
			.success( function(data) {
				vm.processing = false;
				vm.message = data.message;


				//refresco los valores de los campos
				Programs.getPrograma($routeParams.program_id)
				.success( function(data) {
					vm.programData = data;
				});
				vm.programData.nuevoPrograma = "";
			});
		};

	})
	


	//###################################################################################################################
	.controller('mallaController' , function($routeParams,Programs){
		var vm = this;

		// establece la variable processing para mostrar las varas de carga
		vm.processing = true;

		// obtiene un programa
		Programs.getPrograma($routeParams.program_id)
		.success( function(data) {
			vm.processing = false;
			vm.programData = data;
		});
		
		// funcion para borrar una malla
		vm.borrarMalla = function(id) {
			vm.processing = true;

			Programs.borrarMalla(id)
			.success(function(data) {
				vm.processing = false;

				//refresco los valores
				Programs.nombresProgramas()
				.success( function(data) {
					vm.processing = false;
					vm.programData = data;
				});
			});
		};

		// funcion para agregar una materia a la malla
		vm.agregarMateria = function(materia) {
			vm.processing = true;

			Programs.agregarMateria(vm.programData)
			.success(function(data) {
				console.log(JSON.stringify(data.message));
				vm.processing = false;

				//refresco los valores
				Programs.getPrograma($routeParams.program_id)
				.success( function(data) {
					vm.programData = data;
				});
			});
		};

		// funcion para borrar una materia de la malla
		vm.borrarMateria = function(materia) {
			vm.processing = true;
			var data = vm.programData._id +"_"+ materia;

			Programs.borrarMateria(data)
			.success(function(data) {
				vm.processing = false;

				//refresco los valores
				Programs.getPrograma($routeParams.program_id)
				.success( function(data) {
					vm.programData = data;
				});
			});
		};
	})

	.controller('mallaEditController' , function($routeParams,Programs){
		var vm = this;

		// establece la variable processing para mostrar las varas de carga
		vm.processing = true;

		var id = $routeParams.programData.split("_");
		console.log(id[0] +" "+ id[1]);

		// obtiene un programa
		Programs.getPrograma(id[0])
		.success( function(data) {
			vm.processing = false;
			vm.programData = data;
			vm.programData.materia = id[1];
		});

		// funcion para borrar un programa
		vm.actualizarMateria = function() {
			vm.processing = true;

			Programs.actualizarMateria(vm.programData)
			.success(function(data) {
				vm.processing = false;
				vm.message = data.message;

				//refresco los valores
				if(data.success){
					var aux = vm.programData.nuevaMateria;
					Programs.getPrograma(id[0])
					.success( function(data) {
						vm.programData = data;
						vm.programData.materia = aux;
					});
				}
				
			});
		};
	});