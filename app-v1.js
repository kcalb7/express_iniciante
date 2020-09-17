const express = require("express");
const app_v1 = express();

app_v1
	.get("/", (req, res) => {
		return res.send({ message: "Tudo ok com o método GET!" });
	})
	.get("/query", (req, res) => {
		let q = req.query;
		return res.send({
			message: `Voce enviou informaçõo via query: ${q.query}`,
		});
	});

app_v1.post("/", (req, res) => {
	return res.send({ message: "Tudo ok com o método POST!" });
});

app_v1.listen(3000);

module.exports = app_v1;
