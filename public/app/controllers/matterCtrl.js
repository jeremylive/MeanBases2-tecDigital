// comienza el modulo de angular e inyecta el programService
angular.module( 'matterCtrl' , [ 'matterService' ])


	//###################################################################################################################
	.controller('matterController' , function(Matters){
		var vm = this;

		// establece la variable processing para mostrar las varas de carga
		vm.processing = true;

		// carga todos los cursos
		Matters.all()
		.success( function(data) {
			vm.processing = false;
			vm.matterData = data;
		});
		
		// funcion para borrar un programa
		vm.borrarCurso = function(id) {
			vm.processing = true;

			Matters.borrarCurso(id)
			.success(function(data) {
				vm.processing = false;

				//refresco los valores
				Matters.all()
				.success( function(data) {
					vm.matterData = data;
				});
			});
		};
	})

	// controlador para CREAR UN CURSO
	.controller( 'matterCreateController' , function(Matters) {

		var vm = this;

		//busco los nombres de las instituciones
		vm.instituteData = {};
		Matters.nombresInstituciones()
		.success( function(data){
			vm.instituteData = data;
			console.log(JSON.stringify(data))
		});

		vm.matterData = {};

		vm.cargarDatos = function(){
			//obtiene los programas de esa institucion y escuela
			//paso a string los valores de institucion y esucela a buscar
			var nombres = vm.matterData.instituciones.institucionAcademica +"_"+ vm.matterData.escuelas.escuela 
			Matters.getProgramas(nombres)
			.success( function(data) {
				vm.matterData.programData = data;

			});

			//obtiene los profesores de esa institucion y escuela
			Matters.getProfesores(nombres)
			.success( function(resul){
				vm.matterData.teacherData = resul;
			});
		}


		vm.data = {};

		// funcion para guardar el nuevo programa
		vm.guardarCurso = function() {
			vm.processing = true;
			vm.message = '' ;


			//acomodo todos los valores ingresados en una variable
			vm.data = {}
			vm.data.institucion = vm.matterData.programData.programas.institucion;
			vm.data.escuela = vm.matterData.programData.programas.escuela;
			vm.data.programa = vm.matterData.programData.programas.programa;
			vm.data.materia = vm.matterData.programData.materias.materia;
			vm.data.profesor = vm.matterData.programData.profesores.nombre;
			vm.data.grupo = vm.matterData.programData.grupo;
			vm.data.periodo = vm.matterData.programData.periodo;

			// llama al matterService para guardar
			Matters.crearCurso(vm.data)
			.success( function(data) {
				vm.processing = false;
				vm.message = data.message;
			});
		};

	})

	// controlador para EDITAR UN CURSO
	.controller( 'matterEditController' , function($routeParams,Matters) {

		var vm = this;

		vm.processing = true;

		// obtiene el parametro con el id del curso
		// $routeParams es la herramienta para agarrar la info del URL
		Matters.get($routeParams.id)
		.success( function(data) {
			vm.matterData = data;

			//ordeno los datos a usar en el apiT
			var teacherData = vm.matterData.institucion +"_"+ vm.matterData.escuela;
			//obtiene los profesores de esa institucion y escuela
			Matters.getProfesores(teacherData)
			.success( function(resul){
				vm.matterData.teacherData = resul;
			});

			//ordeno los datos a usar en el apiP
			var programData = vm.matterData.institucion +"_"+ vm.matterData.escuela +"_"+ vm.matterData.programa;
			//obtiene el programa de esa institucion, escuela, programa
			Matters.getPrograma(programData)
			.success( function(result){
				vm.matterData.mallas = result;
			});

			vm.processing = false;
		});

		

		// funcion para actualizar el curso
		vm.actualizarCurso = function() {
			vm.processing = true;
			vm.message = '' ;

			//ordeno los datos
			var data = {};
			data.id = vm.matterData._id;
			data.institucion = vm.matterData.institucion;
			data.escuela = vm.matterData.escuela;
			data.programa = vm.matterData.programa;
			data.materia = vm.matterData.materias.materia;
			data.profesor = vm.matterData.profesores.nombre;
			data.grupo = vm.matterData.grupo;
			data.periodo = vm.matterData.periodo;

			// llama al matterService para actualizar
			Matters.actualizarCurso(data)
			.success( function(resul) {
				vm.processing = false;
				vm.message = resul.message;


				//refresco los valores de los campos
				vm.matterData.materia = data.materia;
				vm.matterData.profesor = data.profesor;
				vm.matterData.grupo = data.grupo;
				vm.matterData.periodo = data.periodo;
			});
		};

	})