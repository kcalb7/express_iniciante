const router = require("express").Router();

const auth = require("../middlewares/auth");

router.get("/", auth, (req, res) => {
	console.log(`.. user authenticated: ${res.locals.auth_data}`);
	return res.send({
		message: "Informação permitida somente a usuário autenticado!",
	});
});

router.post("/", (req, res) => {
	return res.send({ message: "Tudo ok com o método POST da raiz!" });
});

module.exports = router;
