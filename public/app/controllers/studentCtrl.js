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


		vm.deleteCurso = function(id) {
			vm.processing = true;
			console.log("borrando materia.......");
			// acepta el id de estudiante como parametro
			Student.deleteMateria(id)
			.success(function(data) {

				// toma todos los estudiantes para actualizar la tabla
				Student.all()
				.success( function(data) {
					vm.processing = false;
					vm.students = data;
				});

			});
		}

		// vm.matricular = function(){
		// 	console.log("matricula a hacer push")
		// 	console.log(vm.studentData);
		// 	vm.studentData.cursosMatriculados.push(vm.studentData.cursosMatriculados);
		// };
	})
	
	// controlador aplicado para la pagina crear estudiante
	.controller( 'studentCreateController' , function(Student) {
		
		var vm = this;
		vm.type = 'create' ;
		//vm.studentData = data;
		//vm.data = {};

		// funcion para crear un estudiante
		vm.saveStudent = function() {		
			vm.processing = true;
			vm.message = '' ;

			//toma los valores de los select option
			vm.studentData.institucion = vm.userData.instituciones.institucion;
			vm.studentData.escuela = vm.userData.escuelas.escuela;
			vm.studentData.programa = vm.userData.programas.programa;

			// usa la funcion de crear en teacherService
			Student.create(vm.studentData)
			.success( function(data) {
				vm.processing = false;
				vm.studentData = {};
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
		
		//vm.names = ['Greivin Berrocal','Gerardo Gutierrez','Jeremy Live'];

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
	
	
	.controller( 'studentMatricularController' , function($routeParams, Student, $scope) {

		var vm = this;
		$scope.cursosMatriculadosVar = {};
		vm.type = 'matricular' ;

		Student.get($routeParams.student_id)
		.success( function(data) {
			vm.studentData = data;
			console.log(vm.studentData);
		});

		
		$scope.agregarMateria = function(){
			vm.studentData.cursosMatriculados.push($scope.cursosMatriculadosVar);
			console.log($scope.cursosMatriculadosVar);
			console.log(vm.studentData.cursosMatriculados);
		};

		vm.saveStudent = function() {
			vm.processing = true;
			vm.message = '' ;

			

			Student.update($routeParams.student_id, vm.studentData)
			.success( function(data) {
				console.log("update....");
				
				vm.processing = false;
				vm.message = data.message;

				vm.studentData.cursosMatriculados = {};
			});
		};

	});

		// vm.names = [{
		// 		institucion: 'Greivin Berrocal',
		// 		escuelas: [{
		// 			escuela: 'greivin',
		// 			programas: [{
		// 				programa: '110'
		// 			}, {
		// 				programa: '111'
		// 			}]
		// 		}],
				
		// 	},{
		// 		institucion: 'Gerardo Gutierrez',
		// 		escuelas: [{
		// 			escuela: 'gera',
		// 			programas: [{
		// 					programa: '220'
		// 				}, {
		// 					programa: '221'
		// 				}]
		// 		}],
				
		// 	},{
		// 		institucion: 'Jeremy Live',
		// 		escuelas: [{
		// 			escuela: 'jeremy',
		// 			programas: [{
		// 				programa: '330'
		// 			}, {
		// 				programa: '331'
		// 			}]
		// 		}],
				
		// 	}
		// ]