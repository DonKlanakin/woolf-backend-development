const pool = require("../db/pool");
const errorHandler = require("../utils/errorHandler");
const securityManager = require("../security/securityManager");

exports.createUser = async (req, res, next) => {
	const logPrefix = "createUser :";
	try {
		let body = req.body;
		let sqlCheckDuplicate = `SELECT * FROM users WHERE username = $1`;
		let result = await pool.query(sqlCheckDuplicate, [body.username]);
		if (result.rowCount > 0) {
			return res.status(400).json({
				status: "fail",
				responseCode: "400",
				message: "Username already exists."
			});
		}
		let sql = `INSERT INTO users (firstname, lastname, email, username, password)
                    VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
		let values = [
			body.firstName,
			body.lastName,
			body.email,
			body.username,
			await securityManager.processCredentialForStorage(body.password)
		];
		let servResponse = await pool.query(sql, values);
		if (servResponse.rowCount > 0) {
			res.status(200).json({
				status: "success",
				requestSentAt: req.requestedAt,
				data: servResponse
			});
		} else {
			errorHandler.throwCreationFailureError("Failed creating a user.", res);
		}
	} catch (err) {
		console.debug(`${logPrefix} ${err}`);
		errorHandler.mapError(err, req, res, next);
	}
};

exports.loginUser = async (req, res, next) => {
	const logPrefix = "loginUser :";
	try {
		let body = req.body;
		let sql = `SELECT * FROM users
					WHERE username = $1`;
		let values = [body.username];
		let servResponse = await pool.query(sql, values);
		let resData = servResponse.rows[0];
		let providedCred = body.credential;
		let storedCred = resData.password;
		let isValidCredential = await securityManager.validateCredential(
			providedCred,
			storedCred
		);
		if (isValidCredential) {
			let token = await securityManager.issueToken({
				username: resData.username,
				role: resData.role
			});
			return res.status(200).json({
				status: "success",
				message: "User authenticated.",
				token: token
			});
		} else {
			return res.status(401).json({
				status: "fail",
				message: "Invalid password."
			});
		}
	} catch (err) {
		console.debug(`${logPrefix} ${err}`);
		errorHandler.mapError(err, req, res, next);
	}
};

exports.getAllUsers = async (req, res, next) => {
	try {
		let sql = "SELECT * FROM users";
		let servResponse = await pool.query(sql);
		if (servResponse.rowCount > 0) {
			res.status(200).json({
				status: "success",
				requestSentAt: req.requestedAt,
				data: servResponse
			});
		} else {
			errorHandler.throwEntryNotFoundError("Failed Retrieving users. :", res);
		}
	} catch (err) {
		errorHandler.mapError(err, req, res, next);
	}
};

exports.updateUserById = async (req, res, next) => {
	const logPrefix = "updateUserById :";
	try {
		let id = req.params.id;
		let body = req.body;
		let sql = `UPDATE users SET password = $1
					WHERE id = $2;`;
		let values = [
			await securityManager.processCredentialForStorage(body.credential),
			id
		];
		let servResponse = await pool.query(sql, values);
		if (servResponse.rowCount > 0) {
			res.status(200).json({
				status: "success",
				message: `User information [ID=${id}] has been updated sucessfully.`,
				data: servResponse
			});
		} else {
			errorHandler.throwEntityIdNotFoundError(
				"Failed updating user information. :",
				id,
				res
			);
		}
	} catch (err) {
		console.debug(`${logPrefix} ${err}`);
		errorHandler.mapError(err, req, res, next);
	}
};
