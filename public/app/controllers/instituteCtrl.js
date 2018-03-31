// comienza el modulo de angular e inyecta el studentService
angular.module( 'instituteCtrl' , [ 'instituteService' ])

	.controller('instituteController' , function(Institutions){
		var vm = this;

		// establece la variable processing para mostrar las varas de carga
		vm.processing = true;

		// agarra todos los estudiantes de la pagina de carga
		Institutions.all()
		.success( function(data) {

			// cuando tiene todos los estudiantes, borra la variable processing
			vm.processing = false;

			// asigna los estudiantes para volver a vm.teachers
			vm.institutes = data;
		});
		
		// funcion para borrar un estudiante
		vm.deleteInstitute = function(id) {
			vm.processing = true;

			// acepta el id de estudiante como parametro
			Institutions.delete(id)
			.success(function(data) {

				// toma todos los estudiantes para actualizar la tabla
				Institutions.all()
				.success( function(data) {
					vm.processing = false;
					vm.institutes = data;
				});

			});
		};
	})
	
	// controlador aplicado para la pagina crear estudiante
	.controller( 'instituteCreateController' , function(Institutions) {

		var vm = this;

		// variable para mostrar/ocultar los elementos de la vista
		// es lo que diferencia entre crear o editar en el html
		vm.type = 'create' ;

		// funcion para crear un estudiante
		vm.saveInstitute = function() {
			vm.processing = true;

			// limpia el mensaje
			vm.message = '' ;
			console.log("holaaa");
			console.log(vm.instituteData);
			// usa la funcion de crear en studentService
			Institutions.create(vm.instituteData)
			.success( function(data) {
				vm.processing = false;

				// limpia el formulario
				vm.instituteData = {};
				vm.message = data.message;
			});

		};

	})
	
	
	// controlador aplicado para la pagina editar estudiante
	.controller( 'instituteEditController' , function($routeParams, Institutions) {

		var vm = this;

		// variable para mostrar/ocultar los elementos de la vista
		// es lo que diferencia entre crear o editar en el html
		vm.type = 'edit' ;

		// obtiene el parametro con la informacion de estudiantes a editar
		// $routeParams es la herramienta para agarrar la info del URL
		Institutions.get($routeParams.name)
		.success( function(data) {
			vm.instituteData = data;
		});

		// funcion para guardar el estudiante
		vm.saveInstitute = function() {
			vm.processing = true;
			vm.message = '' ;

			// llama al studentService para actualizar
			Institutions.update($routeParams.name, vm.instituteData)
			.success( function(data) {
				vm.processing = false;

				// limpia el formulario
				vm.instituteData = {};

				// asigna el mensaje de la API a vm.message
				vm.message = data.message;
			});
		};

	})


	//###################################################################################################################
	.controller('schoolController' , function(Institutions){
		var vm = this;

		// establece la variable processing para mostrar las varas de carga
		vm.processing = true;

		// carga todas las escuelas y su institución
		Institutions.nombresInstituciones()
		.success( function(data) {
			vm.processing = false;
			vm.instituteData = data;
		});
		
		// funcion para borrar una escuela de la institución
		vm.borrarEscuela = function(institucion, escuela) {
			vm.processing = true;

			//mando un string con los valores separados por -
			//para luego sacarlos con split
			vm.borrar = institucion +"-"+escuela;

			Institutions.borrarEscuela(vm.borrar)
			.success(function(data) {
				vm.processing = false;

				//refresco los valores
				Institutions.nombresInstituciones()
				.success( function(data) {
					vm.processing = false;
					vm.instituteData = data;
				});
			});
		};
	})

	// controlador para CREAR UNA ESCUELA dentro de una institución existente
	.controller( 'schoolCreateController' , function(Institutions) {

		var vm = this;

		// variable para mostrar/ocultar los elementos de la vista
		// es lo que diferencia entre crear o editar en el html
		vm.type = 'create' ;

		// obtiene el parametro con la informacion de instituciones
		Institutions.nombresInstituciones()
		.success( function(data) {
			vm.instituteData = data;
		});


		vm.data = {};

		// funcion para guardar la nueva escuela 
		vm.guardarEscuela = function() {
			vm.processing = true;
			vm.message = '' ;


			// llama al instituteService para actualizar
			Institutions.crearEscuela(vm.data)
			.success( function(data) {
				vm.processing = false;
				vm.message = data.message;
			});
		};

	})

	// controlador para EDITAR UNA ESCUELA dentro de una institución existente
	.controller( 'schoolEditController' , function(Institutions) {

		var vm = this;

		// variable para mostrar/ocultar los elementos de la vista
		// es lo que diferencia entre crear o editar en el html
		vm.type = 'edit' ;

		// obtiene el parametro con la informacion de instituciones
		Institutions.nombresInstituciones()
		.success( function(data) {
			vm.instituteData = data;
		});


		vm.data = {};

		// funcion para guardar la nueva escuela 
		vm.guardarEscuela = function() {
			vm.processing = true;
			vm.message = '' ;


			// llama al instituteService para actualizar
			Institutions.actualizarEscuela(vm.data)
			.success( function(data) {
				vm.processing = false;
				vm.message = data.message;


				//refresco los valores de los campos
				Institutions.nombresInstituciones()
				.success( function(data) {
					vm.instituteData = data;
				});
				vm.data.instituciones = undefined;
				vm.data.escuelas = undefined;
				vm.data.nuevaEscuela = "";
			});
		};

	});


	//###################################################################################################################
	