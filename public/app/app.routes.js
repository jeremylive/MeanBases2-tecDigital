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
	// matricula estudiante
/*	.when( '/students/matricula-estudiante' , {
		templateUrl : 'app/views/pages/estudiantes/matricula-estudiante.html' ,
		controller : 'studentCreateController' ,
		controllerAs: 'student'
	})
*/

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

	// EDITAR matricula estudiante
	.when( '/students/matricula/:student_id' , {
		templateUrl : 'app/views/pages/estudiantes/matricula-estudiante.html' ,
		controller : 'studentMatricularController' ,
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


	//---------------------------------ESCUELAS----------------------------------------
	// ver todas las escuelas
	.when( '/instituciones/ver-escuelas' , {
		templateUrl : 'app/views/pages/instituciones/escuelas/ver-escuelas.html' ,
		controller : 'schoolController' ,
		controllerAs: 'institution'
	})

	// registro de escuela
	.when( '/instituciones/registro-escuela' , {
		templateUrl : 'app/views/pages/instituciones/escuelas/registro-escuela.html' ,
		controller : 'schoolCreateController' ,
		controllerAs: 'institution'
	})

	// actualizar escuela
	.when( '/instituciones/actualizar-escuela' , {
		templateUrl : 'app/views/pages/instituciones/escuelas/registro-escuela.html' ,
		controller : 'schoolEditController' ,
		controllerAs: 'institution'
	})

	//---------------------------------PROGRAMAS----------------------------------------
	// ver todos los programas
	.when( '/instituciones/ver-programas' , {
		templateUrl : 'app/views/pages/instituciones/programas/ver-programas.html' ,
		controller : 'programController' ,
		controllerAs: 'program'
	})

	// registro de programa
	.when( '/instituciones/registro-programa' , {
		templateUrl : 'app/views/pages/instituciones/programas/registro-programa.html' ,
		controller : 'programCreateController' ,
		controllerAs: 'program'
	})

	// actualizar programa
	.when( '/instituciones/actualizar-programa/:program_id' , {
		templateUrl : 'app/views/pages/instituciones/programas/registro-programa.html' ,
		controller : 'programEditController' ,
		controllerAs: 'program'
	})

	//------------------------------MALLAS ACADÉMICAS------------------------------------
	// ver la malla de un programa
	.when( '/instituciones/ver-malla/:program_id' , {
		templateUrl : 'app/views/pages/instituciones/mallas/ver-materias.html' ,
		controller : 'mallaController' ,
		controllerAs: 'program'
	})

	// ver la malla de un programa
	.when( '/instituciones/ver-malla/actualizar-materia/:programData' , {
		templateUrl : 'app/views/pages/instituciones/mallas/actualizar-materia.html' ,
		controller : 'mallaEditController' ,
		controllerAs: 'program'
	})





	//---------------------------------CURSOS----------------------------------------
	// ver todos los cursos
	.when( '/cursos/ver-cursos' , {
		templateUrl : 'app/views/pages/cursos/ver-cursos.html' ,
		controller : 'matterController' ,
		controllerAs: 'matter'
	})

	// registro de curso
	.when( '/cursos/registro-curso' , {
		templateUrl : 'app/views/pages/cursos/registrar-curso.html' ,
		controller : 'matterCreateController' ,
		controllerAs: 'matter'
	})

	// edicion de curso
	.when( '/cursos/:id' , {
		templateUrl : 'app/views/pages/cursos/actualizar-curso.html' ,
		controller : 'matterEditController' ,
		controllerAs: 'matter'
	})


	//---------------------------------------------------------------------
	// ESTOS EDIT DEBEN ESTAR DE ÚLTIMOS!!!

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
	
	
	
	
	
	
	.otherwise({
        redirectTo: '/'
    });

	
	$locationProvider.html5Mode(true);

});