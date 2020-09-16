const express = require("express");
const app_v1 = express();

app_v1
	.get("/", (req, res) => {
		return res.send({ messege: "Tudo ok com o métido GET!" });
	})
	.get("/query", (req, res) => {
		let q = req.query;
		return res.send({
			messege: `Voce enviou informaçõo via query: ${q.query}`,
		});
	});

app_v1.post("/", (req, res) => {
	return res.send({ messege: "Tudo ok com o métido POST!" });
});

app_v1.listen(3000);

module.exports = app_v1;
