const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const Users = require("../model/user");

router.get("/", async (req, res) => {
	try {
		const users = await Users.find({});
		return res.send(users);
	} catch (err) {
		return res.send({ error: `Erro ao consultar usuários: ${err}` });
	}
});

router.post("/create", async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) return res.send({ msg: `Dados insuficientes!` });

	try {
		if (await Users.findOne({ email }))
			return res.send({ msg: `Email já registrado!` });

		const user = await Users.create(req.body);
		data.password = undefined;
		return res.send(user);
	} catch (err) {
		if (err) return res.send({ error: `find: ${err}` });
	}
});

router.post("/auth", async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) return res.send({ msg: `Dados insuficientes!` });
	try {
		const user = await Users.findOne({ email }).select("password");
		if (!user) return res.send({ msg: `Usuário não registrado!` });

		if (!(await bcrypt.compare(password, user.password)))
			return res.send({ nop: "Senha incorreta!" });
		user.password = undefined;
		return res.send({ ok: user });
	} catch (err) {
		if (err) return res.send({ error: `Erro ao autenticar o usuário: ${err}` });
	}
});

module.exports = router;
