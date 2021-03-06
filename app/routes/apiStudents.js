var Student = require( '../models/student' );

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
		res.json({ message: 'Este es el apiS de los estudiante' });
	});


	// en las rutas que terminan con /students
	// ----------------------------------------------------
	apiRouter.route( '/students' )
		// (POST)          CREANDO UN POST
		// crear un estudiante (accedido en POST http://localhost:8080/apiS/students)
		.post( function(req, res) {
			// crea una nueva instancia del modelo Student
			var student = new Student();

			// establece la informacion del estudiante, a partir del request
			student.nombre = req.body.nombre;
			student.carnet = req.body.carnet;
			student.institucion = req.body.institucion;
			student.escuela = req.body.escuela;
			student.programa = req.body.programa;

			// guarda el estudiante y revisa errores
			student.save( function(err) {
				if (err) {
					// ingreso duplicado
					if (err.code == 11000)
						return res.json({ success: false, message: 'Existe un estudiante con ese carnet. ' 
					});
				else
					return res.send(err);
				}

				res.json({ message: 'Estudiante creado!' });
			});
		})
		
		// (GET) OBTIENE TODOS LOS ESTUDIANTES (accessed at GET http://localhost:8080/apiS/students)
		.get(function(req, res) {
			Student.find( function(err, students) {
				if (err) res.send(err);
				// retorna los estudiantes
				res.json(students);
			});
		});
		
		
	// OBTIENE UN SOLO ESTUDIANTE
	// en las rutas que terminan con http://localhost:8080/apiS/students/:student_id
	// (GET) ------------------------------------------------
	apiRouter.route( '/students/:student_id' )
		// obtiene el student con ese id 
		.get( function(req, res) {
			Student.findOne({ 'carnet':req.params.student_id },function(err, student){
				if (err) res.send(err);
				// retorna el estudiante
				res.json(student);
			});
		})
		
		// (PUT) UPDATE el estudiante con ese id
		.put( function(req, res) {
		// usa el modelo de Estudiante para buscar el estudiante que se indica
			Student.findOne({ 'carnet': req.params.student_id }, function(err, student){
				if (err) res.send(err);

				// actualiza la info solo si el contenido es nuevo
				if (req.body.nombre) student.nombre = req.body.nombre;
				if (req.body.institucion) student.institucion = req.body.institucion;
				if (req.body.escuela) student.escuela = req.body.escuela;
				if (req.body.programa) student.programa = req.body.programa;

				// guarda el estudiante
				student.save( function(err) {
					if (err) res.send(err);
					// return a message
					res.json({ message: 'Estudiante actualizado!' });
				});
			});
		})

		// DELETE el estudiante con ese id
		.delete( function(req, res) {
			Student.remove({
				'carnet': req.params.student_id
			}, function(err, student) {
				if (err) return res.send(err);
				res.json({ message: 'Borrado exitosamente' });
			});
		});
	
	return apiRouter;
};