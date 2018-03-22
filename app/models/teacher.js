// toma los paquetes que se necesitan para el modelo usuario
var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var bcrypt = require( 'bcrypt-nodejs' );

// esquema de usuario
var teacherSchema = new Schema({
	nombre: { type: String, required: true},
	carnet: { type: String, required: true, index: { unique: true }},
	instituciones: [ new Schema({
		institucion: { type: String, required: true},
		escuela: { type: String, required: true},
		cursos: [ new Schema ({
			curso: { type: String, required: true},
			grupo: { type: Number, required: true},
			periodo: { type: String, required: true}
		})
		]	//cierra el array de cursos
	})
	]	//cierra el array de instituciones
});

// RETORNA EL MODELO------------------------------------------------------------------------------------
module.exports = mongoose.model( 'Teacher' , teacherSchema);