const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../model/user");

const { secretKey } = require("../_vars_env");

// token
const createUserToken = (userId) => {
	return jwt.sign({ id: userId }, secretKey, { expiresIn: "1d" });
};

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
	if (!email || !password) return res.send({ message: `Dados insuficientes!` });

	try {
		if (await Users.findOne({ email }))
			return res.send({ message: `Email já registrado!` });

		const user = await Users.create(req.body);
		data.password = undefined;
		return res.send(user);
	} catch (err) {
		if (err) return res.send({ error: `find: ${err}` });
	}
});

router.post("/auth", async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) return res.send({ message: `Dados insuficientes!` });
	try {
		const user = await Users.findOne({ email }).select("password");
		if (!user) return res.send({ message: `Usuário não registrado!` });

		if (!(await bcrypt.compare(password, user.password)))
			return res.send({ nop: "Senha incorreta!" });
		user.password = undefined;
		return res.send({ ok: user, token: createUserToken(email) });
	} catch (err) {
		if (err) return res.send({ error: `Erro ao autenticar o usuário: ${err}` });
	}
});

module.exports = router;
