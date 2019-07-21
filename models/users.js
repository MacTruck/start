const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	}
	name: {
		type: String,
		unique: true,
		required: true,
		trim: true
	}
	password: {
		type: String,
		unique: true,
		required: true
	}
});

// authenticate input against database documents
UserSchema.statics.authenticate = (email, password, callback) => {
	User.findOne({ email: email})
		.exec( (error, user) => {
			if (error) {
				return callback(error);
			} else if (!user) {
				const err = new Error('User not found.');
				err.status = 401;
				return callback(err);
			}

			bcrypt.compare(password, user.password, (error, result) => {
				if (result === true) {
					return callback(null, user);
				} else {
					return callback();
				}
			});
		});
}

// hash password before saving to database
UserSchema.pre('save', (next) => {
	const user = this;
	bcrypt.hash(user.password, 10, (err, hash) => {
		if (err) {
			return next(err);
		}

		user.password = hash;
		next();
	});
});

const User = mongoose.model('User', userSchema);
module.exports = User;