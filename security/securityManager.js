const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const errorHandler = require("../utils/errorHandler");
dotenv.config({ path: "./configs/config.env" });

exports.processCredentialForStorage = async (providedCred) => {
	const logPrefix = "processCredentialForStorage :";
	try {
		const hash = await bcrypt.hash(providedCred, 12);
		return hash;
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

exports.validateCredential = async (providedCred, hash) => {
	const result = await bcrypt.compare(providedCred, hash);
	return result;
};
