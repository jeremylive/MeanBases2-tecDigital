// toma los paquetes que se necesitan para el modelo usuario
var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var bcrypt = require( 'bcrypt-nodejs' );

// esquema de usuario
var UserSchema = new Schema({
	name: String,
	username: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false }	//select false, no devuelve la contrase�a a menos que sea explicitamente solicitada
});

// la hace hash a la contrase�a antes de que el usuario sea guardado
UserSchema.pre( 'save' , function(next) {
	var user = this;
	// la hace hash a la contrase�a solo si ha sido cambiada o el usuario es nuevo
	if ( ! user.isModified( 'password' )) return next();

	// genera el hash
	bcrypt.hash(user.password, null , null , function(err, hash) {
		if (err) return next(err);

		// cambia la contrase�a(encryptada) a la version hash
		user.password = hash;
		next();
	});
});

// metodo para comparar la contrase�a dada con el hasg en la base de datos
//ES DE AUTENTICACI�N COMPLEJA XD
/*UserSchema.methods.comparePassword = function(password) {
	var user = this;

	return bcrypt.compareSync(password, user.password);
};*/

// RETORNA EL MODELO------------------------------------------------------------------------------------
module.exports = mongoose.model( 'User' , UserSchema);