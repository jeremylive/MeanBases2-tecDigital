//Esta es una vista a alto nivel del proyecto
console.log('Probando el app');
angular.module( 'userApp' , [
	'ngAnimate' ,				//para agregar animaciones a todas las directivas Angular
	'app.routes' ,				//estar� haciendo routing para toda la aplicacion
	'mainCtrl' ,				//ser� un nuevo controlador que abarcar� la vista principal
	//PROFESORES
	'teacherCtrl' ,
	'teacherService',
	//ESTUDIANTES
	'studentCtrl' ,
	'studentService',
	//INSTITUCIONES
	'instituteCtrl' ,
	'instituteService',
	//CURSOS
	'matterCtrl' ,
	'matterService',
	//PROGRAMAS
	'programCtrl' ,
	'programService'
]);