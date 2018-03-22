// comienza el modulo de angular e inyecta el teacherService
angular.module( 'teacherCtrl' , [ 'teacherService' ])

	// teacher controller para la página principal
	// inyecta el Teacher Factory
	.controller( 'teacherController' , function(Teacher) {

		var vm = this;

		// establece la variable processing para mostrar las varas de carga
		vm.processing = true;

		// agarra todos los profesores de la pagina de carga
		Teacher.all()
		.success( function(data) {

			// cuando tiene todos los profesores, borra la variable processing
			vm.processing = false;

			// asigna los profesores para volver a vm.teachers
			vm.teachers = data;
		});
		
		// funcion para borrar un profesor
		vm.deleteTeacher = function(id) {
			vm.processing = true;

			// acepta el id de profesor como parametro
			Teacher.delete(id)
			.success(function(data) {

				// toma todos los profesores para actualizar la tabla
				Teacher.all()
				.success( function(data) {
					vm.processing = false;
					vm.teachers = data;
				});

			});
		};

	})
	
	// controlador aplicado para la pagina crear profesor
	.controller( 'teacherCreateController' , function(Teacher) {

		var vm = this;

		// variable para mostrar/ocultar los elementos de la vista
		// es lo que diferencia entre crear o editar en el html
		vm.type = 'create' ;

		// funcion para crear un profesor
		vm.saveTeacher = function() {
			vm.processing = true;

			// limpia el mensaje
			vm.message = '' ;

			// usa la funcion de crear en teacherService
			Teacher.create(vm.teacherData)
			.success( function(data) {
				vm.processing = false;

				// limpia el formulario
				//vm.teacherData = {};
				vm.message = data.message;
			});

		};

	})
	
	// controlador aplicado para la pagina editar profesor
	.controller( 'teacherEditController' , function($routeParams, Teacher) {

		var vm = this;

		// variable para mostrar/ocultar los elementos de la vista
		// es lo que diferencia entre crear o editar en el html
		vm.type = 'edit' ;

		// obtiene el parametro con la informacion de profesor a editar
		// $routeParams es la herramienta para agarrar la info del URL
		Teacher.get($routeParams.teacher_id)
		.success( function(data) {
			vm.teacherData = data;
		});

		// funcion para guardar el profesor
		vm.saveTeacher = function() {
			vm.processing = true;
			vm.message = '' ;

			// llama al teacherService para actualizar
			Teacher.update($routeParams.teacher_id, vm.teacherData)
			.success( function(data) {
				vm.processing = false;

				// limpia el formulario
				//vm.teacherData = {};

				// asigna el mensaje de la API a vm.message
				vm.message = data.message;
			});
		};

	});