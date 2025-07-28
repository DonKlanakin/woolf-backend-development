const bcrypt = require("bcrypt");
const errorHandler = require("../utils/errorHandler");

exports.processCredentialForStorage = async (originalCredential) => {
	let logPrefix = "processCredentialForStorage :";
	try {
		return bcrypt.hash(originalCredential, 10);
	} catch (error) {
		console.debug(`${logPrefix} ${error}`);
		errorHandler.mapError(error);
	}
};
