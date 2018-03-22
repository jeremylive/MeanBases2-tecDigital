// comienza el modulo de angular e inyecta el userService
angular.module( 'userCtrl' , [ 'userService' ])

	// user controller para la página principal
	// inyecta el User Factory
	.controller( 'userController' , function(User) {

		var vm = this;

		// establece la variable processing para mostrar las varas de carga
		vm.processing = true;

		// agarra todos los usuarios de la pagina de carga
		User.all()
		.success( function(data) {

			// cuando tiene todos los usuarios, borra la variable processing
			vm.processing = false;

			// asigna los usuarios para volver a vm.users
			vm.users = data;
		});
		
		// funcion para borrar un usuario
		vm.deleteUser = function(id) {
			vm.processing = true;

			// acepta el id de usuario como parametro
			User.delete(id)
			.success(function(data) {

				// toma todos los usuarios para actualizar la tabla
				User.all()
				.success( function(data) {
					vm.processing = false;
					vm.users = data;
				});

			});
		};

	})
	
	// controlador aplicado para la pagina crear usuario
	.controller( 'userCreateController' , function(User) {

		var vm = this;

		// variable para mostrar/ocultar los elementos de la vista
		// es lo que diferencia entre crear o editar
		vm.type = 'create' ;

		// funcion para crear un usuario
		vm.saveUser = function() {
			vm.processing = true;

			// limpia el mensaje
			vm.message = '' ;

			// usa la funcion de crear en userService
			User.create(vm.userData)
			.success( function(data) {
				vm.processing = false;

				// limpia el formulario
				vm.userData = {};
				vm.message = data.message;
			});

		};

	})
	
	// controlador aplicado para la pagina editar usuario
	.controller( 'userEditController' , function($routeParams, User) {

		var vm = this;

		// variable para mostrar/ocultar los elementos de la vista
		// es lo que diferencia entre crear o editar
		vm.type = 'edit' ;

		// obtiene el parametro con la informacion de usuario a editar
		// $routeParams es la herramienta para agarrar la info del URL
		User.get($routeParams.user_id)
		.success( function(data) {
			vm.userData = data;
		});

		// funcion para guardar el usuario
		vm.saveUser = function() {
			vm.processing = true;
			vm.message = '' ;

			// llama al userService para actualizar
			User.update($routeParams.user_id, vm.userData)
			.success( function(data) {
				vm.processing = false;

				// limpia el formulario
				vm.userData = {};

				// asigna el mensaje de la API a vm.message
				vm.message = data.message;
			});
		};

	});