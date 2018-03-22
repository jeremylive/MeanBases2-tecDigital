var Matter = require( '../models/matter' );

// ROUTES Para el apiS
// =============================

module.exports = function(app, express) {

	// obtiene la instancia
	var apiRouter = express.Router();

	// middleware que se usa con todas las peticiones
	apiRouter.use( function(req, res, next) {
		// aqu� es donde se autenticar�a

		next(); // se asegura avanzar de ruta y no quedarse aqu�
	});

	// prueba la ruta para asegurarse que todo bretea bien
	// accessado en GET http://localhost:8080/apiS
	apiRouter.get( '/' , function(req, res) {
		res.json({ message: 'Este es el apiI de los cursos' });
	});


	// en las rutas que terminan con /students
	// ----------------------------------------------------
	apiRouter.route( '/matters' )
		// (POST)          CREANDO UN POST
		// crear un estudiante (accedido en POST http://localhost:8080/apiS/students)
		.post( function(req, res) {
			// crea una nueva instancia del modelo Student
			var matter = new Matter();

			// establece la informacion de la institucion, a partir del request
			matter.nombreCurso = req.body.nombreCurso;
			
			// guarda la institucion y revisa errores
			matter.save( function(err) {
				if (err) {
					// ingreso duplicado
					if (err.code == 11000)
						return res.json({ success: false, message: 'Existe un curso con ese nombre. ' 
					});
				else
					return res.send(err);
				}

				res.json({ message: 'Curso creado!' });
			});
		})
		
		// (GET) OBTIENE TODOS LAS INSTITUCIONES (accessed at GET http://localhost:8080/apiI/institutions)
		.get(function(req, res) {
			Matter.find( function(err, matters) {
				if (err) res.send(err);
				// retorna los instituciones
				res.json(matters);
			});
		});
		
		
	// OBTIENE UNA SOLA INSTITUCION
	// en las rutas que terminan con http://localhost:8080/apiI/institutions/:name
	// (GET) ------------------------------------------------
	apiRouter.route( '/matters/:name' )
		// obtiene la matter con ese nombre
		.get( function(req, res) {
			Matter.findOne({ 'nombreCurso':req.params.name },function(err, matter){
				if (err) res.send(err);
				// retorna la institucion
				res.json(matter);
			});
		})
		
		// (PUT) UPDATE la institucion con ese nombre
		.put( function(req, res) {
		// usa el modelo de Institucion para buscar la institucion que se indica
			Matter.findOne({ 'nombreCurso': req.params.name }, function(err, matter){
				if (err) res.send(err);

				// actualiza la info solo si el contenido es nuevo
				if (req.body.nombreCurso) matter.nombreCurso = req.body.nombreCurso;

				// guarda la institucion
				matter.save( function(err) {
					if (err) res.send(err);
					// return a message
					res.json({ message: 'Curso actualizado!' });
				});
			});
		})

		// DELETE el estudiante con ese id
		.delete( function(req, res) {
			Matter.remove({
				'nombreCurso': req.params.name
			}, function(err, matter) {
				if (err) return res.send(err);
				res.json({ message: 'Borrada exitosamente' });
			});
		});
	
	return apiRouter;
};