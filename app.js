const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const config = require("./config");
const uri = config.BD_STRING;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	poolSize: 5,
	serverSelectionTimeoutMS: 15000, // Keep trying to send operations for 5 seconds
	socketTimeoutMS: 20000, // Close sockets after 45 seconds of inactivity
};
mongoose.connect(uri, options);
mongoose.connection.on("error", (err) => {
	console.log(`Erro na conexão com o banco de dados: ${err}`);
});
mongoose.connection.on("disconnected", () => {
	console.log(".. disconnected");
});
mongoose.connection.on("connected", () => {
	console.log(".. connected");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoute = require("./Routes/index");
const usersRoute = require("./Routes/users");
app.use("/", indexRoute);
app.use("/users", usersRoute);

app.listen(3000);

module.exports = app;
