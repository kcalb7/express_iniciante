const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const Users = require("../model/user");

router.get("/", (req, res) => {
	Users.find({}, (err, data) => {
		if (err) return res.send({ error: `find: ${err}` });
		return res.send({ users: data });
	});
});

router.post("/create", (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) return res.send({ msg: `Dados insuficientes` });

	Users.findOne({ email }, (err, data) => {
		if (err) return res.send({ error: `find: ${err}` });
		if (data) return res.send({ msg: `Email já registrado` });

		Users.create(req.body, (err, data) => {
			if (err) return res.send({ error: `create: ${err}` });
			data.password = undefined;
			return res.send({ user: data });
		});
	});
});

router.post("/auth", (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) return res.send({ msg: `Dados insuficientes` });

	Users.findOne({ email }, (err, data) => {
		if (err) return res.send({ error: `auth: ${err}` });
		if (!data) return res.send({ msg: `Usuário não registrado!` });

		bcrypt.compare(password, data.password, (err, same) => {
			console.log(data);
			if (err) return res.send({ error: "Erro ao autenticar o usuário" });
			if (!same) return res.send({ nop: "usuário não autenticado" });
			data.password = undefined;
			return res.send({ ok: data });
		});
	}).select("password");
});

module.exports = router;
