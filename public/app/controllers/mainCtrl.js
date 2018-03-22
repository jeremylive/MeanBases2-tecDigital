angular.module( 'mainCtrl' , [])

.controller( 'mainController' , function($rootScope, $location) {

	var vm = this;

	// obtiene la informacion si la persona est� loggeada
	vm.loggedIn = false;
	//vm.loggedIn = false;
	
	// revisar si el usuario est� loggeado en cada peticion
	/*$rootScope.$on( '$routeChangeStart' , function() {
		vm.loggedIn = false;

		// obtiene la informacion del usuario en el cambio de ruta
		var aux.getUser = function() {
		if (vm.loggedIn)
			return $http.get( '/api/me' );
		else
			return $q.reject({ message: 'User has no token.' });
		};
		
		aux.getUser()
		.success(function(data) {
			vm.user = data;
		});
	});*/

	// funcion que maneja el formulario de loggin
	vm.doLogin = function() {
		// si el usuario est� correctamente loggeado, redirecciona a la p�gina de usuarios
		//se supone que no va a haber login
		$location.path( '/users' );
	};

	// funcion que maneja el loggout
	vm.doLogout = function() {
		// resetea toda la informaci�n de usuario
		vm.user = {};
		$location.path( '/login' );
	};

});