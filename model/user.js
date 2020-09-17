const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: { type: String, required: true, unique: true, lowercase: true },
	password: { type: String, required: true, select: false },
	create: { type: Date, default: Date.now },
});

UserSchema.pre("save", function (next) {
	let user = this;
	if (!user.isModified("password")) return next();

	bcrypt.hash(user.password, 10, (err, enc) => {
		user.password = enc;
		return next();
	});
});

module.exports = mongoose.model("Users", UserSchema);
