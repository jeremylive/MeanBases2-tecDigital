var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require( 'bcrypt-nodejs' );

var schemaCursos = new Schema(
{
	institucion:{type: String, required: true},
	escuela:{type: String, required: true},
	programa:{type: Number, required: true},
	profesor: String,
	materia: {type: String, required: true},
	grupo: {type: Number, required: true},
	periodo:{type: String, required: true},
	estudiantes:[new Schema({
		estudiante:{type:String, required:true}
	})]
});

module.exports = mongoose.model('Cursos', schemaCursos);
