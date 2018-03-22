// CALL THE PACKAGES --------------------
var express = require( 'express' ); 		// llama al framework express
var app = express(); 						// define a la aplicacion para usar express
var bodyParser = require( 'body-parser' ); 	// dejará Postear contenido de las peticiones HTTP
var morgan = require( 'morgan' ); 			// se usa para ver las peticiones
var mongoose = require( 'mongoose' ); 		// es para trabajar con MongoDB
var path = require( 'path' ); 		// es para trabajar con MongoDB

var port = process.env.PORT || 9999; 		// establece el puerto

// Configuracion de la aplicacion ---------------------
// usa el body parser para que podamos tomar información de las peticiones POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configura la aplicacion para manejar las peticiones CORS
app.use( function(req, res, next) {
	res.setHeader( 'Access-Control-Allow-Origin' , '*' );
	res.setHeader( 'Access-Control-Allow-Methods' , 'GET, POST' );
	res.setHeader( 'Access-Control-Allow-Headers' , 'X-Requested-With,content-type, Authorization' );
	next();
});

//carga/escribe todas las peticiones a la consola mongo
app.use(morgan( 'dev' ));

mongoose.connect('mongodb://localhost:27017/registro' );

// establece la localización de los archivos estáticos
// usado para peticiones que hará el frontend
app.use(express.static(__dirname + '/public/' ));


// API ROUTES ------------------------
// Registra las rutas -------------------------------
// todas esas rutas tendrán el prefijo /apiT
var apiTeacherRoutes = require( './app/routes/apiTeachers' )(app, express);
app.use( '/apiT' , apiTeacherRoutes);
var apiStudentRoutes = require( './app/routes/apiStudents' )(app, express);
app.use( '/apiS' , apiStudentRoutes);
var apiInstitutionsRoutes = require( './app/routes/apiInstitutions' )(app, express);
app.use( '/apiI' , apiInstitutionsRoutes);
var apiMattersRoutes = require( './app/routes/apiMatters' )(app, express);
app.use( '/apiM' , apiMattersRoutes);

// MAIN CATCHALL ROUTE ---------------
// MANDA A TODOS LOS USUARIOS AL FRONTEND------------
app.get( '/' , function(req, res) {
	//res.send( 'Bienvenido a la página inicial!' );
	res.sendFile(path.join(__dirname + '/public/app/views/index.html' ));
});



//INCIA EL SERVIDOR
app.listen(port);
console.log('Server running at http://localhost:'+port+'/');