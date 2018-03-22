// comienza el modulo de angular e inyecta el studentService
angular.module( 'instituteCtrl' , [ 'instituteService' ])

	.controller('instituteController' , function(Institutions){
		var vm = this;
		console.log('');

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

	});
	