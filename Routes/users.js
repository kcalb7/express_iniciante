const express = require("express");
const router = express.Router();

const User = require("../model/user");

router.get("/", (req, res) => {
	User.find({}, (err, data) => {
		if (err) return res.send({ error: `find: ${err}` });
		return res.send({ users: data });
	});
});

router.post("/", (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) return res.send({ msg: `Dados insuficientes` });

	User.findOne({ email }, (err, data) => {
		if (err) return res.send({ error: `find: ${err}` });
		if (data) return res.send({ msg: `Email já registrado` });

		User.create(req.body, (err, data) => {
			if (err) return res.send({ error: `create: ${err}` });
			data.password = undefined;
			return res.send({ user: data });
		});
	});
});

module.exports = router;
