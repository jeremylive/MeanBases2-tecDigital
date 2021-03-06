var Institution = require( '../models/institution' );

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
		res.json({ message: 'Este es el apiI de las instituciones' });
	});


	// en las rutas que terminan con /students
	// ----------------------------------------------------
	apiRouter.route( '/institutions' )
		// (POST)          CREANDO UN POST
		// crear un estudiante (accedido en POST http://localhost:8080/apiS/students)
		.post( function(req, res) {
			// crea una nueva instancia del modelo Student
			var institution = new Institution();

			// establece la informacion de la institucion, a partir del request
			institution.institucionAcademica = req.body.institucionAcademica;
			
			// guarda la institucion y revisa errores
			institution.save( function(err) {
				if (err) {
					// ingreso duplicado
					if (err.code == 11000)
						return res.json({ success: false, message: 'Existe una institucion con ese nombre. ' 
					});
				else
					return res.send(err);
				}

				res.json({ message: 'Institucion creada!' });
			});
		})
		
		// (GET) OBTIENE TODOS LAS INSTITUCIONES (accessed at GET http://localhost:8080/apiI/institutions)
		.get(function(req, res) {
			Institution.find( function(err, institutions) {
				if (err) res.send(err);
				// retorna los instituciones
				res.json(institutions);
			});
		});
		
		
	// OBTIENE UNA SOLA INSTITUCION
	// en las rutas que terminan con http://localhost:8080/apiI/institutions/:name
	// (GET) ------------------------------------------------
	apiRouter.route( '/institutions/:name' )
		// obtiene la institution con ese nombre
		.get( function(req, res) {
			Institution.findOne({ 'institucionAcademica':req.params.name },function(err, institution){
				if (err) res.send(err);
				// retorna la institucion
				res.json(institution);
			});
		})
		
		// (PUT) UPDATE la institucion con ese nombre
		.put( function(req, res) {
		// usa el modelo de Institucion para buscar la institucion que se indica
			Institution.findOne({ 'institucionAcademica': req.params.name }, function(err, institution){
				if (err) res.send(err);

				// actualiza la info solo si el contenido es nuevo
				if (req.body.institucionAcademica) institution.institucionAcademica = req.body.institucionAcademica;

				// guarda la institucion
				institution.save( function(err) {
					if (err) res.send(err);
					// return a message
					res.json({ message: 'Institucion actualizada!' });
				});
			});
		})

		// DELETE el estudiante con ese id
		.delete( function(req, res) {
			Institution.remove({
				'institucionAcademica': req.params.name
			}, function(err, institution) {
				if (err) return res.send(err);
				res.json({ message: 'Borrada exitosamente' });
			});
		});
	
	return apiRouter;
};