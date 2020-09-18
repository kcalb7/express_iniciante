const user_pass = require("./_userpass");

const env = process.env.NODE_ENV || "dev";

const config = () => {
	switch (env) {
		case "dev":
			return {
				BD_STRING: `mongodb+srv://${user_pass}@cluster0.ch0wu.azure.mongodb.net/api_express?retryWrites=true&w=majority`,
				JWT_SECRET_KEY: "bou",
				JWT_EXPIRES: "2d",
			};
		case "hml":
			return {
				BD_STRING: `mongodb+srv://${user_pass}@cluster0.ch0wu.azure.mongodb.net/api_express?retryWrites=true&w=majority`,
				JWT_SECRET_KEY: "bou",
				JWT_EXPIRES: "2d",
			};
		case "prod":
			return {
				BD_STRING: `mongodb+srv://${user_pass}@cluster0.ch0wu.azure.mongodb.net/api_express?retryWrites=true&w=majority`,
				JWT_SECRET_KEY: "dni14731f9h1op",
				JWT_EXPIRES: "7d",
			};
	}
};

console.log(`.. starting API on ambient ${env.toUpperCase()}`);

module.exports = config();
