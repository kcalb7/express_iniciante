const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	return res.send({ messege: "Tudo ok com o métido GET da raiz!" });
});

router.post("/", (req, res) => {
	return res.send({ messege: "Tudo ok com o métido POST da raiz!" });
});

module.exports = router;
