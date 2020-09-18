const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../model/user");

const config = require("../config");

// token
const createUserToken = (userId) => {
	return jwt.sign({ id: userId }, config.JWT_SECRET_KEY, {
		expiresIn: config.JWT_EXPIRES,
	});
};

/* status codes
200 ok
201 created
202 accepted

400 bad request
401 unauthorized  --temporary
403 forbidden  --permanent
404 not found

500 internal server error
501 not implemented
503 service unavailable
*/

router.get("/", async (req, res) => {
	try {
		const users = await Users.find({});
		return res.send(users);
	} catch (err) {
		return res
			.status(500)
			.send({ error: `Erro ao consultar usuários: ${err}` });
	}
});

router.post("/create", async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password)
		return res.status(400).send({ message: `Dados insuficientes!` });

	try {
		if (await Users.findOne({ email }))
			return res.status(400).send({ message: `Email já registrado!` });

		const user = await Users.create(req.body);
		user.password = undefined;
		return res.status(201).send(user);
	} catch (err) {
		if (err) return res.status(500).send({ error: `find: ${err}` });
	}
});

router.post("/auth", async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password)
		return res.status(400).send({ message: `Dados insuficientes!` });
	try {
		const user = await Users.findOne({ email }).select("password");
		if (!user)
			return res.status(400).send({ message: `Usuário não registrado!` });

		if (!(await bcrypt.compare(password, user.password)))
			return res.status(401).send({ nop: "Senha incorreta!" });
		user.password = undefined;
		return res.send({ ok: user, token: createUserToken(email) });
	} catch (err) {
		if (err)
			return res
				.status(500)
				.send({ error: `Erro ao autenticar o usuário: ${err}` });
	}
});

module.exports = router;
