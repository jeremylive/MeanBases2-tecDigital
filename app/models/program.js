var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require( 'bcrypt-nodejs' );

var schemaProgramas = new Schema(
{
	institucion:{type: String, required: true},
	escuela:{type: String, required: true},
	programa:{type: Number, required: true},
	mallaCurricular:[new Schema({
		materia:{type: String, required: true}	
	})
	]
});

module.exports = mongoose.model('Programas', schemaProgramas);
