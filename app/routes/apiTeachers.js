var Teacher = require( '../models/teacher' );

// ROUTES Para el apiT
// =============================

module.exports = function(app, express) {

	// obtiene la instancia
	var apiRouter = express.Router();

	// middleware que se usa con todas las peticiones
	apiRouter.use( function(req, res, next) {
		// aquí es donde se autenticaría

		next(); // se asegura avanzar de ruta y no quedarse aquí
	});

	// prueba la ruta para asegurarse que todo bretea bien
	// accessado en GET http://localhost:8080/apiT
	apiRouter.get( '/' , function(req, res) {
		res.json({ message: 'Este es el apiT de los profes.' });
	});


	// en las rutas que terminan con /teachers
	// ----------------------------------------------------
	apiRouter.route( '/teachers' )
		//           CREANDO UN POST
		// crear un profesor (accedido en POST http://localhost:8080/apiT/teachers)
		.post( function(req, res) {
			// establece la informacion del profesor, a partir del request, hace las validaciones pertinentes
			Teacher.findOne({
				'nombre': req.body.nombre,
				'carnet': req.body.carnet,
			},function(err, teacher) {
				if(err){ 
					return res.send(err);
				}
				else if(teacher){
					for(i in teacher.instituciones){
						if(teacher.instituciones[i].institucion == req.body.institucion &&
							teacher.instituciones[i].escuela == req.body.escuela){
							for(j in teacher.instituciones[i].cursos){
								if(teacher.instituciones[i].cursos[j].curso == req.body.curso && 
									teacher.instituciones[i].cursos[j].grupo == req.body.grupo && 
									teacher.instituciones[i].cursos[j].periodo == req.body.periodo){
									return res.json({ success: false, message: 'Existe un profesor con esos datos.' });
								}
							}
						}
					}
				}
					
				Teacher.findOneAndUpdate({
					'nombre': req.body.nombre,
					'carnet': req.body.carnet,
					'instituciones.institucion': req.body.institucion,
					'instituciones.escuela': req.body.escuela},
					{
						'$push':{
							'instituciones.$.cursos':{
								curso: req.body.curso,
								grupo: req.body.grupo,
								periodo: req.body.periodo
							}
						}
					},
					function(err, exists) {
						if(err){
							return res.send(err);
						}
						else if(exists){
							res.json({ message: 'Curso ingresado!' });
						}else{
							Teacher.findOneAndUpdate({
								'nombre': req.body.nombre,
								'carnet': req.body.carnet},
								{
									'$push':{
										'instituciones':{
											institucion: req.body.institucion,
											escuela: req.body.escuela,
											cursos: {
												curso: req.body.curso, 
												grupo: req.body.grupo,
												periodo: req.body.periodo
											}
										}
									}
								},
								function(err, exists) {
									if(err){
										return res.send(err);
									}
									else if(exists){
										res.json({ message: 'Institucion ingresada!' });
									}else{
										// crea una nueva instancia del modelo Teacher
										var teacher = new Teacher();
										
										teacher.nombre = req.body.nombre;
										teacher.carnet = req.body.carnet;
										teacher.instituciones.push({
											institucion: req.body.institucion,
											escuela: req.body.escuela,
											cursos: {
												curso: req.body.curso, 
												grupo: req.body.grupo,
												periodo: req.body.periodo
											}
										});
										
										teacher.save( function(err) {
											if (err) {
												// ingreso duplicado
												if (err.code == 11000)
													return res.json({ success: false, message: 'Existe un profesor con ese carnet. ' });
												else
													return res.send(err);
											}else{
												res.json({ message: 'Profesor ingresado!' });
											}
										});
										
									}
								}
							)
						}
					}
				)
			});
			
		})
		
		// OBTIENE TODOS LOS PROFESORES (accessed at GET http://localhost:8080/apiT/teachers)
		.get(function(req, res) {
			Teacher.find( function(err, teachers) {
				if (err) res.send(err);
				// retorna los profesores
				res.json(teachers);
			});
		});
		
		





	// OBTIENE UN SOLO PROFESOR
	// en las rutas que terminan con http://localhost:8080/apiT/teachers/:teacher_id
	// ----------------------------------------------------
	apiRouter.route( '/teachers/:teacher_id' )
		// obtiene el teacher con ese id 
		.get( function(req, res) {
			Teacher.findOne({'carnet': req.params.teacher_id}, function(err, teacher){
				if (err) res.send(err);
				// retorna el profesor
				res.json(teacher);
			});
		})
		
		// UPDATE el profe con ese id
		.put( function(req, res) {
		// usa el modelo de Teacher para buscar el profesor que se indica
			var carnet = req.body.carnet;
			var institucion = req.body.institucion;
			var escuela = req.body.escuela;
			var curso = req.body.curso;
			var grupo = req.body.grupo;
			var periodo = req.body.periodo;
			var nuevoValor = req.body.nuevoValor;
			
			//actualizar nombre (el carnet no cambia)
			if(carnet){
				if(!(institucion) && !(escuela) && !(curso) && !(grupo) && !(periodo)){
					Teacher.findOneAndUpdate({
						'carnet': carnet},
						{
							'nombre' : nuevoValor
						},
						function(err, exists) {
							if(err) return res.send(err);
							else if(!exists) return res.json({ success: false, message: 'El campo en carnets no existe.' });
						}
					)
					return res.json({message: 'Nombre actualizado.' });
				}
				//acualizar la institucion
				else if(!(escuela) && !(curso) && !(grupo) && !(periodo)){
					Teacher.findOneAndUpdate({
						'carnet': carnet,
						'instituciones.institucion': institucion},
						{
							'instituciones.$.institucion' : nuevoValor
						},
						function(err, exists) {
							if(err) return res.send(err);
							else if(!exists) return res.json({ success: false, message: 'El campo en instituciones no existe.' });
						}
					)
					return res.json({message: 'Institucion actualizada.' });
				}
				//actualizar la escuela
				else if(!(curso) && !(grupo) && !(periodo)){
					Teacher.findOneAndUpdate({
						'carnet': carnet,
						'instituciones.institucion': institucion,
						'instituciones.escuela': escuela},
						{
							'instituciones.$.escuela' : nuevoValor
						},
						function(err, exists) {
							if(err) return res.send(err);
							else if(!exists) return res.json({ success: false, message: 'El campo en escuelas no existe.' });
						}
					)
					return res.json({message: 'Escuela actualizada.' });
				}
				//actualizar curso, grupo o periodo
				else if(curso && grupo && periodo){
					var nuevoGrupo = req.body.nuevoGrupo;
					var nuevoPeriodo = req.body.nuevoPeriodo;
					if(nuevoValor && nuevoGrupo && nuevoPeriodo){
						Teacher.findOneAndUpdate({
							'carnet': carnet,
							'instituciones.institucion': institucion,
							'instituciones.escuela': escuela},
							{
								'$pull':{
									'instituciones.$.cursos':{ 
										'curso': curso,
										'grupo': grupo,
										'periodo': periodo
									}
								},
							},
							function(err, exists) {
								if(err) return res.send(err);
								else if(!exists) return res.json({ success: false, message: 'El campo en cursos no existe.' });
								else{
									//var existe = false;
									//revisa que no existan ya esos valores
									for(i in exists.instituciones){
										if(exists.instituciones[i].institucion == req.body.institucion &&
											exists.instituciones[i].escuela == req.body.escuela){
											for(j in exists.instituciones[i].cursos){
												if(exists.instituciones[i].cursos[j].curso == nuevoValor && 
													exists.instituciones[i].cursos[j].grupo == nuevoGrupo && 
													exists.instituciones[i].cursos[j].periodo == nuevoPeriodo){
													//existe = true;
													return res.json({ success: false, message: 'Ya se han ingresado esos datos' });
												}
											}
										}
									}
									
									//si no existen los valores, los ingresa
									//if(!existe){
										Teacher.findOneAndUpdate({
											'carnet': carnet,
											'instituciones.institucion': institucion,
											'instituciones.escuela': escuela},
											{
												'$push':{
													'instituciones.$.cursos':{
														curso: nuevoValor,
														grupo: nuevoGrupo,
														periodo: nuevoPeriodo
													}
												}
											},
											function(err, exists) {
												if(err) return res.send(err);
												else if(!exists) return res.json({ success: false, message: 'El campo en cursos no existe.' });
											}
										)
										return res.json({message: 'Curso, grupo y periodo actualizado.' });
									//}
								}
							}
						)
						
					}else{
						return res.json({ success: false, message: 'Error. Debe ingresar los tres nuevos valores: cruso, grupo y periodo.' });
					}
					
				}else{
					return res.json({ success: false, message: 'Error. Cruso, grupo y periodo deben ser ingresados juntos.' });
				}
				
			}
			else{
				return res.json({ success: false, message: 'Error. Debe proporcionar el carnet para la búsqueda.' });
			}
			
		})

		// DELETE el profesor con ese id
		.delete( function(req, res) {
			Teacher.remove({
				'carnet': req.params.teacher_id
			}, function(err, teacher) {
				if (err) return res.send(err);
				res.json({ message: 'Borrado exitosamente' });
			});
		});
	
	return apiRouter;
};
	
	