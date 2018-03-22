console.log('Probando los routes');
angular.module( 'app.routes' , [ 'ngRoute' ])

.config( function($routeProvider, $locationProvider) {

	$routeProvider

	// ruta del home page
	.when( '/' , {
		templateUrl : 'app/views/pages/home.html'
	})
	
	// login page
	.when( '/login' , {
		templateUrl : 'app/views/pages/login.html' ,
		controller : 'mainController' ,
		controllerAs: 'login'
	})
	
	//---------------------------------PROFESORES----------------------------------------
	// registro de profesor
	.when( '/teachers/registro-profesor' , {
		templateUrl : 'app/views/pages/profesores/registro-profesor.html' ,
		controller : 'teacherCreateController' ,
		controllerAs: 'teacher'
	})
	
	// ver todos los profes
	.when( '/teachers/ver-profesores' , {
		templateUrl : 'app/views/pages/profesores/ver-profesores.html' ,
		controller : 'teacherController' ,
		controllerAs: 'teacher'
	})
	
	// datos de profesor
	.when( '/teacher/:teacher_id' , {
		templateUrl : 'app/views/pages/profesores/ver-profesor.html' ,
		controller : 'teacherEditController' ,
		controllerAs: 'teacher'
	})
	
	// edicion de profesor
	.when( '/teachers/:teacher_id' , {
		templateUrl : 'app/views/pages/profesores/registro-profesor.html' ,
		controller : 'teacherEditController' ,
		controllerAs: 'teacher'
	})
	
	//---------------------------------ESTUDIANTES----------------------------------------
	// registro de estudiante
	.when( '/students/registro-estudiante' , {
		templateUrl : 'app/views/pages/estudiantes/registro-estudiante.html' ,
		controller : 'studentCreateController' ,
		controllerAs: 'student'
	})
	
	// ver todos los estudiantes
	.when( '/students/ver-estudiantes' , {
		templateUrl : 'app/views/pages/estudiantes/ver-estudiantes.html' ,
		controller : "studentController" ,
		controllerAs: 'student'
	})
	
	// datos de estudiante
	.when( '/student/:student_id' , {
		templateUrl : 'app/views/pages/estudiantes/ver-estudiante.html' ,
		controller : 'studentEditController' ,
		controllerAs: 'student'
	})
	
	// edicion de estudiante
	.when( '/students/:student_id' , {
		templateUrl : 'app/views/pages/estudiantes/registro-estudiante.html' ,
		controller : 'studentEditController' ,
		controllerAs: 'student'
	})
	
	//---------------------------------INSTITUCIONES----------------------------------------
	// registro de institucion
	.when( '/instituciones/registro-institucion' , {
		templateUrl : 'app/views/pages/instituciones/registro-institucion.html' ,
		controller : 'instituteCreateController' ,
		controllerAs: 'institute'
	})
	
	// ver todas las instituciones
	.when( '/instituciones/ver-institucion' , {
		templateUrl : 'app/views/pages/instituciones/ver-instituciones.html' ,
		controller : 'instituteController' ,
		controllerAs: 'institute'
	})
	
	// datos de institucion
	.when( '/institucion/:name' , {
		templateUrl : 'app/views/pages/instituciones/ver-institucion.html' ,
		controller : 'instituteEditController' ,
		controllerAs: 'institute'
	})
	
	// edicion de institucion
	.when( '/instituciones/:name' , {
		templateUrl : 'app/views/pages/instituciones/registro-institucion.html' ,
		controller : 'instituteEditController' ,
		controllerAs: 'institute'
	})

	//---------------------------------CURSOS----------------------------------------
	// registro de curso
	.when( '/matters/registro-curso' , {
		templateUrl : 'app/views/pages/cursos/registro-curso' ,
		controller : 'matterCreateController' ,
		controllerAs: 'matter'
	})
	
	// ver todos los cursos
	.when( '/matters/ver-cursos' , {
		templateUrl : 'app/views/pages/cursos/ver-cursos.html' ,
		controller : 'matterController' ,
		controllerAs: 'matter'
	})
	
	// datos de curso
	.when( '/matter/:name' , {
		templateUrl : 'app/views/pages/cursos/ver-curso.html' ,
		controller : 'matterEditController' ,
		controllerAs: 'matter'
	})
	
	// edicion de curso
	.when( '/matters/:name' , {
		templateUrl : 'app/views/pages/cursos/registro-curso.html' ,
		controller : 'matterEditController' ,
		controllerAs: 'matter'
	})
	
	
	
	
	
	.otherwise({
        redirectTo: '/'
    });

	// para liberarse del hash en el url
	$locationProvider.html5Mode(true);

});