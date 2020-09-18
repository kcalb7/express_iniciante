const jwt = require("jsonwebtoken");

const config = require("../config");

const auth = (req, res, next) => {
	const token_header = req.headers.token;

	if (!token_header)
		return res.status(401).send({ nop: "Autenticação recusada!" });

	jwt.verify(token_header, config.JWT_SECRET_KEY, (err, decoded) => {
		//incluir na resposta a identificação do usuário autenticado
		if (decoded) res.locals.auth_data = decoded.id;
		return err ? res.status(401).send({ nop: "Token inválido!" }) : next();
	});
};

module.exports = auth;
