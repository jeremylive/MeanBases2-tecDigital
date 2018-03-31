var Matter = require( '../models/matter' );

// ROUTES Para el apiS
// =============================

module.exports = function(app, express) {

	// obtiene la instancia
	var apiRouter = express.Router();


	// en las rutas que terminan con /matters
	// ----------------------------------------------------
	apiRouter.route( '/matters' )
		// (POST) crea un curso
		.post( function(req, res) {
			// crea una nueva instancia del modelo de curso

			Matter.findOne({
				'institucion' : req.body.institucion,
				'escuela' : req.body.escuela,
				'programa' : req.body.programa,
				'materia' : req.body.materia,
				'profesor' : req.body.profesor,
				'grupo' : req.body.grupo,
				'periodo' : req.body.periodo
			},function(error, result){
				if(error){
					res.send(error);
				}else if(result){
					res.json({ success: false, message: 'El curso ya existe' });
				}else{
					var matter = new Matter();

					// establece la informacion del curso
					matter.institucion = req.body.institucion;
					matter.escuela = req.body.escuela;
					matter.programa = req.body.programa;
					matter.materia = req.body.materia;
					matter.profesor = req.body.profesor;
					matter.grupo = req.body.grupo;
					matter.periodo = req.body.periodo;
					
					// guarda la institucion y revisa errores
					matter.save( function(err) {
						if (err) {
							return res.send(err);
						}else{
							res.json({ message: 'Curso creado!' });
						}
					});
				}
			});	
		})


		// (PUT) UPDATE el curso con ese nombre
		.put( function(req, res) {
			// usa el modelo de Curso para buscar el curso que se indica

			Matter.findOne({
				'institucion' : req.body.institucion,
				'escuela' : req.body.escuela,
				'programa' : req.body.programa,
				'materia' : req.body.materia,
				'profesor' : req.body.profesor,
				'grupo' : req.body.grupo,
				'periodo' : req.body.periodo
			},function(error, result){
				if(error){
					res.send(error);
				}else if(result){
					res.json({ success: false, message: 'El curso ya existe' });
				}else{
					Matter.findOneAndUpdate({
						'_id': req.body.id 
					},{
						$set:{
							'materia' : req.body.materia,
							'profesor' : req.body.profesor,
							'grupo' : req.body.grupo,
							'periodo' : req.body.periodo
						}
					}, function(err, result){
						if (err){
							res.send(err);
						}
						else if(result){
							res.json({ message: 'Curso actualizado!' });
						}else{
							res.json({ message: 'El campo no existe...' });
						}
					});
				}
			});
		})

		
		// (GET) OBTIENE TODOS LOS CURSOS
		.get(function(req, res) {
			Matter.find( function(err, matters) {
				if (err) res.send(err);
				// retorna los instituciones
				res.json(matters);
			});
		});
		
		
	// OBTIENE UN SOLO CURSO
	// (GET) ------------------------------------------------
	apiRouter.route( '/matters/:id' )
		// obtiene el curso con ese nombre
		.get( function(req, res) {
			Matter.findOne({
				'_id': req.params.id
			},function(err, result){
				if (err){
					res.send(err);
				} 
				else{
					// retorna el curso
					res.json(result);
				}
			});
		})

		// DELETE el curso con ese id
		.delete( function(req, res) {
			Matter.remove({
				'_id': req.params.id
			}, function(err, matter) {
				if (err) return res.send(err);
				res.json({ message: 'Curso borrado!' });
			});
		});
	
	return apiRouter;
};