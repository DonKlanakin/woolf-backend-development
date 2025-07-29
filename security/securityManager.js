const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const errorHandler = require("../utils/errorHandler");
dotenv.config({ path: "./configs/config.env" });

exports.processCredentialForStorage = async (originalCredential) => {
	const logPrefix = "processCredentialForStorage :";
	try {
		return bcrypt.hash(originalCredential, 10);
	} catch (error) {
		console.debug(`${logPrefix} ${error}`);
		errorHandler.mapError(error);
	}
};

exports.issueToken = async (payload) => {
	const activationPeriod = 60 * 60;
	const secretkey = process.env.JWT_SECRET_KEY;
	const token = jwt.sign(payload, secretkey, { expiresIn: activationPeriod });
	return token;
};
