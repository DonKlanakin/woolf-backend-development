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
	} catch (err) {
		console.debug(`${logPrefix} ${err}`);
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

exports.verifyToken = (req, res, next) => {
	const logPrefix = "varifyToken :";
	if (!req.headers.authorization) {
		return res.status(401).json({
			status: "fail",
			message: "Authentication required."
		});
	}
	const tokenParts = req.headers.authorization.split(" ");
	if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
		return res.status(401).json({
			status: "fail",
			message: `Invalid Authentication header format. It must be "Bearer <token>."`
		});
	}
	try {
		const token = tokenParts[1];
		const secretKey = process.env.JWT_SECRET_KEY;
		req.auth = jwt.verify(token, secretKey);
	} catch (err) {
		console.debug(`${logPrefix} ${err}`);
		return res.status(401).json({
			status: "fail",
			message: "Invalid token."
		});
	}
	next();
};
