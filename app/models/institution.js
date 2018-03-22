var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require( 'bcrypt-nodejs' );

var schemaInstituciones = new Schema(
{
	institucionAcademica:{type: String, required: true},
	escuelas: [new Schema({
		escuela:{type:String, required:true},
		programasAcademicos:[new Schema({
			programa:{type:String, required:true},
			plan:{type:Number, required:true},
			mallaCurricular:[new Schema({
				materias:[new Schema({
					materia:{type:String, required:true}
				})
				]	
			})
			]
		})
		]
	})
	]
});

module.exports = mongoose.model('Instituciones', schemaInstituciones);
