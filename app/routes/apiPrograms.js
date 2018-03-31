var Program = require( '../models/program' );

// ROUTES Para el apiP
// =============================

module.exports = function(app, express) {

	// obtiene la instancia
	var apiRouter = express.Router();

	// prueba la ruta para asegurarse que todo bretea bien
	// accessado en GET http://localhost:8080/apiS
	apiRouter.get( '/' , function(req, res) {
		res.json({ message: 'Este es el apiP de los programas' });
	});



	//###################################################################################################################
	apiRouter.route( '/instituciones/programas' )
		
		// OBTIENE TODOS LOS PROGRAMAS
		.get(function(req, res) {
			Program.find( function(err, result) {
				if (err) res.send(err);
				// retorna los programas
				else res.json(result);
			});
		})

		// (POST) nuevo programa
		.post( function(req, res) {
			Program.findOne({
				'institucion': req.body.instituciones.institucionAcademica,
				'escuela': req.body.escuelas.escuela,
				'programa': req.body.programa,
			},function(err, resul) {
				if(err){ 
					return res.send(err);
				}
				else if(resul){
					return res.json({ success: false, message: 'Ya existe ese programa.' });
				}else{
					var program = new Program();

					program.institucion = req.body.instituciones.institucionAcademica;
					program.escuela = req.body.escuelas.escuela;
					program.programa = req.body.programa;
					
					program.save( function(err) {
						if (err) {
							return res.send(err);
						}else{
							res.json({ message: 'Programa ingresado!' });
						}
					});
				}

			})
		})


		// (PUT) UPDATE al programa
		.put( function(req, res) {
			Program.findOneAndUpdate({
				"_id" : req.body._id
				},{
					'$set':{
						'programa': req.body.nuevoPrograma
					}
				},
				function(err, exists) {
					if(err){
						return res.send(err);
					}
					else if(exists){
						res.json({ success: true, message: 'Programa actualizado!' });
					}else{
						res.json({ success: false, message: 'El campo no existe...' });
					}
				}
			)
		});


	//el DELETE no acepta parámetros extra
	//solo el param del route
	apiRouter.route( '/instituciones/programas/:_id' )

		// obtiene el programa con ese id 
		.get( function(req, res) {
			Program.findOne({
				'_id': req.params._id
			}, function(err, result){
				if (err) res.send(err);
				// retorna el programa
				else res.json(result);
			});
		})

		// DELETE el programa con ese id
		.delete( function(req, res) {
			Program.remove({
				'_id': req.params._id
			}, function(err, resul) {
				if (err) return res.send(err);
				else res.json({ message: 'Programa borrado' });
			});
		});


	//###################################################################################################################
	apiRouter.route( '/programas/materias' )

		// agrega una materia al programa
		.post( function(req, res) {
			Program.findOne({
				'_id': req.body._id
			}, function(err, result){
				if (err){ 
					res.send(err);
				}
				else if(result){
					for(i in result.mallaCurricular){
						if(result.mallaCurricular[i].materia == req.body.materia){
							return res.json({ success: true, message: 'La materia ya existe' });
						}
					}

					Program.findOneAndUpdate({
						"_id" : req.body._id
						},{
							'$push':{
								'mallaCurricular':{
									materia: req.body.materia
								}
							}
						},
						function(err, exists) {
							if(err){
								return res.send(err);
							}
							else if(exists){
								res.json({ success: true, message: 'Materia agregada!' });
							}else{
								res.json({ success: true, message: 'El campo no existe...' });
							}
						}
					)
				}
			});
		})

		// actualiza una materia del programa
		.put( function(req, res) {
			Program.findOne({
				'_id': req.body._id,
				'mallaCurricular.materia': req.body.nuevaMateria
			}, function(err, result){
				if (err){ 
					res.send(err);
				}
				else if (result){
					res.json({ success: false, message: 'Ya existe una materia con ese nombre' });
				}else{
					Program.findOneAndUpdate({
						"_id" : req.body._id,
						'mallaCurricular.materia': req.body.materia
						},{
							'$set':{
								'mallaCurricular.$.materia': req.body.nuevaMateria
							}
						},
						function(err, exists) {
							if(err){
								return res.send(err);
							}
							else if(exists){
								res.json({ success: true, message: 'Materia actualizada!' });
							}else{
								res.json({ success: true, message: 'El campo no existe...' });
							}
						}
					);
				}
			});
		});

	//###################################################################################################################
	apiRouter.route( '/programas/materias/:data' )
		// quita una materia del programa
		.delete( function(req, res) {
			//saco la información de los parámetros
			var data = req.params.data.split("_");		// [idPrograma, nombreMateria]

			Program.findOne({
				'_id': data[0]
			}, function(err, result){
				if (err){ 
					res.send(err);
				}
				else{
					Program.findOneAndUpdate({
						"_id" : data[0]
						},{
							'$pull':{
								'mallaCurricular':{
									materia: data[1]
								}
							}
						},
						function(err, exists) {
							if(err){
								return res.send(err);
							}
							else if(exists){
								res.json({ success: true, message: 'Materia borrada!' });
							}else{
								res.json({ success: true, message: 'El campo no existe...' });
							}
						}
					)
				}
			});
		});


	//###################################################################################################################
	//ESTO ES PARA LOS CURSOS!!
	apiRouter.route( '/instituciones/programasEscuela/:names' )
		
		//obtiene todos los programas de una institucion y escuela
		.get(function(req, res) {
			//separo la institucion y la escuela
			var campos = req.params.names.split("_");	// [institucion, escuela]
			Program.find({
				'institucion': campos[0],
				'escuela': campos[1]
			},
			function(err, result) {
				if (err){
					res.send(err);
				}
				else if(result){
					// retorna los programas
					res.json(result);
				}else{
					res.json({success: false, message:'No se encontraron programas.' })
				}
			});
		});


	apiRouter.route( '/instituciones/programaEscuela/:data' )
		//obtiene un programa por numero de programa, escuela e institucion
		.get(function(req, res) {
			//separo la institucion y la escuela
			var campos = req.params.data.split("_");	// [institucion, escuela, programa]
			Program.findOne({
				'institucion': campos[0],
				'escuela': campos[1],
				'programa': campos[2]
			},
			function(err, result) {
				if (err){
					res.send(err);
				}
				else if(result){
					// retorna el programa
					res.json(result);
				}else{
					res.json({success: false, message:'No se encontro el programa.' })
				}
			});
		});
		

	
	return apiRouter;
};