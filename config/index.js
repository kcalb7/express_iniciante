const env = process.env.NODE_ENV || "dev";

const config = () => {
	switch (env) {
		case "dev":
			return {
				BD_STRING: `mongodb+srv://${require("./_userpass")}@cluster0.ch0wu.azure.mongodb.net/api_express?retryWrites=true&w=majority`,
				JWT_SECRET_KEY: "bou",
				JWT_EXPIRES: "2d",
			};
		case "production":
			return {
				BD_STRING: `mongodb+srv://${process.env.USER_PASS}@cluster0.ch0wu.azure.mongodb.net/api_express?retryWrites=true&w=majority`,
				JWT_SECRET_KEY: "dni14731f9h1op",
				JWT_EXPIRES: "7d",
			};
		default:
			console.log(`no env: ${env}`);
			break;
	}
};

console.log(`.. starting API on ambient ${env.toUpperCase()}`);

module.exports = config();
