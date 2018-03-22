'use strict';

// comienza el modulo de angular e inyecta el teacherService
angular.module( 'studentCtrl' , [ 'studentService' ])

	// teacher controller para la página principal
	// inyecta el Student Factory
	.controller( "studentController" , function(Student) {

		var vm = this;

		// establece la variable processing para mostrar las varas de carga
		vm.processing = true;

		// agarra todos los estudiantes de la pagina de carga
		Student.all()
		.success( function(data) {

			// cuando tiene todos los estudiantes, borra la variable processing
			vm.processing = false;

			// asigna los estudiantes para volver a vm.students
			vm.students = data;
		});
		
		// funcion para borrar un estudiante
		vm.deleteStudent = function(id) {
			vm.processing = true;

			// acepta el id de estudiante como parametro
			Student.delete(id)
			.success(function(data) {

				// toma todos los estudiantes para actualizar la tabla
				Student.all()
				.success( function(data) {
					vm.processing = false;
					vm.students = data;
				});

			});
		};
	})
	
	// controlador aplicado para la pagina crear estudiante
	.controller( 'studentCreateController' , function(Student, $scope) 
	{
		var vm = this;

		vm.type = 'create' ;

		

		$scope.names = ['Greivin Berrocal','Gerardo Gutierrez','Jeremy Live'];
		


		//$scope.escuelas = ;
		
	/*	$scope.createTodo = function(){
		$http.post('/students/:student_id', $scope.studentData)
			.success(function(data) {
				$scope.studentmData = {};
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};*/
		/*vm.names = [{
				institucion: 'Greivin Berrocal',
				escuelas: [{
					escuela: 'greivin',
					programas: [{
						programa: '110'
					}, {
						programa: '111'
					}]
				}],
				
			},{
				institucion: 'Gerardo Gutierrez',
				escuelas: [{
					escuela: 'gera',
					programas: [{
							programa: '220'
						}, {
							programa: '221'
						}]
				}],
				
			},{
				institucion: 'Jeremy Live',
				escuelas: [{
					escuela: 'jeremy',
					programas: [{
						programa: '330'
					}, {
						programa: '331'
					}]
				}],
				
			}
		];
		
		vm.userData = {};*/

		// funcion para crear un estudiante
		vm.saveStudent = function() {
		
			vm.processing = true;

			vm.db = vm.studentData;
			console.log(vm)
			// limpia el mensaje
			vm.message = '' ;

			// usa la funcion de crear en teacherService
			Student.create(vm.studentData)
			.success( function(data) {
				vm.processing = false;

				// limpia el formulario
				//vm.studentData = {};
				vm.message = data.message;
			});

		};

	})
	
	// controlador aplicado para la pagina editar estudiante
	.controller( 'studentEditController' , function($routeParams, Student) {

		var vm = this;

		// variable para mostrar/ocultar los elementos de la vista
		// es lo que diferencia entre crear o editar en el html
		vm.type = 'edit' ;
		
		vm.names = ['Greivin Berrocal','Gerardo Gutierrez','Jeremy Live'];

		// obtiene el parametro con la informacion de estudiante a editar
		// $routeParams es la herramienta para agarrar la info del URL
		Student.get($routeParams.student_id)
		.success( function(data) {
			vm.studentData = data;
		});

		// funcion para guardar el estudiante
		vm.saveStudent = function() {
			vm.processing = true;
			vm.message = '' ;

			// llama al teacherService para actualizar
			Student.update($routeParams.student_id, vm.studentData)
			.success( function(data) {
				vm.processing = false;

				// limpia el formulario
				//vm.studentData = {};

				// asigna el mensaje de la API a vm.message
				vm.message = data.message;
			});
		};

	})
	
	

