var User = require( '../models/user' );

// ROUTES Para el api
// =============================

module.exports = function(app, express) {

	// obtiene la instancia
	var apiRouter = express.Router();

	// middleware que se usa con todas las peticiones
	apiRouter.use( function(req, res, next) {
		// manda un mensaje
		//console.log( 'Hola intruso :v' );
		
		// aquí es donde se vana aautenticar los usuarios

		next(); // se asegura avanzar de ruta y no quedarse aquí
	});

	// prueba la ruta para asegurarse que todo bretea bien
	// accessado en GET http://localhost:8080/api
	apiRouter.get( '/' , function(req, res) {
		res.json({ message: 'tomeee! este es el api!' });
	});


	// en las rutas que terminan con /users
	// ----------------------------------------------------
	apiRouter.route( '/users' )
		//           CREANDO UN POST
		// crear un usuario (accedido en POST http://localhost:8080/api/users)
		.post( function(req, res) {
			// crea una nueva instancia del modelo User
			var user = new User();

			// establece la informacion del usuario, a partir del request
			user.name = req.body.name;
			user.username = req.body.username;
			user.password = req.body.password;

			// guarda el usuario y revisa errores
			user.save( function(err) {
				if (err) {
					// ingreso duplicado
					if (err.code == 11000)
						return res.json({ success: false, message: 'Existe un usuario con ese username. ' 
					});
				else
					return res.send(err);
				}

				res.json({ message: 'Usuario creado!' });
			});
		})
		
		// OBTIENE TODOS LOS USUARIOS (accessed at GET http://localhost:8080/api/users)
		.get(function(req, res) {
			User.find( function(err, users) {
				if (err) res.send(err);
				// retorna los usuarios
				res.json(users);
			});
		});
		
		
	// OBTIENE UN SOLO USUARIO
	// en las rutas que terminan con http://localhost:8080/api/users/:user_id
	// ----------------------------------------------------
	apiRouter.route( '/users/:user_id' )
		// obtiene el user con ese id 
		.get( function(req, res) {
			User.findById(req.params.user_id, function(err, user) {
				if (err) res.send(err);
				// retorna el usuario
				res.json(user);
			});
		})
		
		// UPDATE el usuario con ese id
		.put( function(req, res) {
		// usa el modelo de Usuario para buscar el usuario que se indica
			User.findById(req.params.user_id, function(err, user) {
				if (err) res.send(err);

				// actualiza la info solo si el contenido es nuevo
				if (req.body.name) user.name = req.body.name;
				if (req.body.username) user.username = req.body.username;
				if (req.body.password) user.password = req.body.password;

				// guarda el usuario
				user.save( function(err) {
					if (err) res.send(err);
					// return a message
					res.json({ message: 'Usuario actualizado!' });
				});
			});
		})

		// DELETE el usuario con ese id
		.delete( function(req, res) {
			User.remove({
				_id: req.params.user_id
			}, function(err, user) {
				if (err) return res.send(err);
				res.json({ message: 'Borrado exitosamente' });
			});
		});
	
	return apiRouter;
};
	
	