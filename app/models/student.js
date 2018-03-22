// toma los paquetes que se necesitan para el modelo
var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var bcrypt = require( 'bcrypt-nodejs' );

// esquema
var studentSchema = new Schema({
	nombre: { type: String, required: true},
	carnet: { type: String, required: true, index: { unique: true }},
	institucion: { type: String, required: true},
	escuela: { type: String, required: true},
	programa: { type: String, required: true},
	cursosMatriculados: [ new Schema({
		curso: { type: String, required: true},
		grupo: { type: Number, required: true},
		periodo: { type: String, required: true}
	})]
});

// RETORNA EL MODELO------------------------------------------------------------------------------------
module.exports = mongoose.model( 'Student' , studentSchema);
/*const studentModelo = mongoose.model( 'Student' , studentSchema);
module.exports = studentModelo;*/