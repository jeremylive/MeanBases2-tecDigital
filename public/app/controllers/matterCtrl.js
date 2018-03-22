// comienza el modulo de angular e inyecta el studentService
angular.module( 'matterCtrl' , [ 'matterService' ])

	// student controller para la p�gina principal
	// inyecta el Institute Factory
	.controller( 'matterController' , function(Matter) {

		var vm = this;
		console.log('');

		// establece la variable processing para mostrar las varas de carga
		vm.processing = true;

		// agarra todos los estudiantes de la pagina de carga
		Matter.all()
		.success( function(data) {

			// cuando tiene todos los estudiantes, borra la variable processing
			vm.processing = false;

			// asigna los estudiantes para volver a vm.teachers
			vm.matters = data;
		});
		
		// funcion para borrar un estudiante
		vm.deleteMatter = function(name) {
			vm.processing = true;

			// acepta el id de estudiante como parametro
			Matter.delete(name)
			.success(function(data) {

				// toma todos los estudiantes para actualizar la tabla
				Matter.all()
				.success( function(data) {
					vm.processing = false;
					vm.matters = data;
				});

			});
		};

	})
	
	// controlador aplicado para la pagina crear estudiante
	.controller( 'matterCreateController' , function(Matter) {

		var vm = this;

		// variable para mostrar/ocultar los elementos de la vista
		// es lo que diferencia entre crear o editar en el html
		vm.type = 'create' ;

		// funcion para crear un estudiante
		vm.saveMatter = function() {
			vm.processing = true;

			// limpia el mensaje
			vm.message = '' ;

			// usa la funcion de crear en studentService
			Matter.create(vm.matterData)
			.success( function(data) {
				vm.processing = false;

				// limpia el formulario
				//vm.matterData = {};
				vm.message = data.message;
			});

		};

	})
	
	// controlador aplicado para la pagina editar estudiante
	.controller( 'matterEditController' , function($routeParams, Matter) {

		var vm = this;

		// variable para mostrar/ocultar los elementos de la vista
		// es lo que diferencia entre crear o editar en el html
		vm.type = 'edit' ;

		// obtiene el parametro con la informacion de estudiantes a editar
		// $routeParams es la herramienta para agarrar la info del URL
		Matter.get($routeParams.name)
		.success( function(data) {
			vm.matterData = data;
		});

		// funcion para guardar el estudiante
		vm.saveMatter = function() {
			vm.processing = true;
			vm.message = '' ;

			// llama al studentService para actualizar
			Matter.update($routeParams.name, vm.matterData)
			.success( function(data) {
				vm.processing = false;

				// limpia el formulario
				//vm.matterData = {};

				// asigna el mensaje de la API a vm.message
				vm.message = data.message;
			});
		};

	});