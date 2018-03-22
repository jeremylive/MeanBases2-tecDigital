var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require( 'bcrypt-nodejs' );

var schemaCursos = new Schema(
{
	codigoCurso:{type: String, required: true},
	nombreCurso:{type: String, required: true},
	numeroCurso:{type: Number, required: true},
	profesor:{type: String, required: true},
	escuelaPertenece:{type: String, required: true},
	programaEscuela:{type: String, required: true},
	plan:{type: String, required: true},
	estudiantes:[new Schema({
		estudiante:{type:String, required:true}
	})]
});

module.exports = mongoose.model('Matter', schemaCursos);
