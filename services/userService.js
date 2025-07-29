const pool = require("../db/pool");
const errorHandler = require("../utils/errorHandler");
const securityManager = require("../security/securityManager");

exports.createUser = async (req, res, next) => {
  try {
    let body = req.body;
    let sql = `INSERT INTO users (firstname, lastname, email, username, password)
                    VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    let values = [
      body.firstName,
      body.lastName,
      body.email,
      body.username,
      await securityManager.processCredentialForStorage(body.password),
    ];
    let servResponse = await pool.query(sql, values);
    if (servResponse.rowCount > 0) {
      res
        .status(200)
        .json({
          status: "success",
          requestSentAt: req.requestedAt,
          data: servResponse,
        });
    } else {
      errorHandler.throwCreationFailureError("Failed creating a user.", res);
    }
  } catch (err) {
    errorHandler.mapError(err, req, res, next);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    let sql = "SELECT * FROM users";
    let servResponse = await pool.query(sql);
    if (servResponse.rowCount > 0) {
      res
        .status(200)
        .json({
          status: "success",
          requestSentAt: req.requestedAt,
          data: servResponse,
          token: await securityManager.issueToken({})
        });
    } else {
      errorHandler.throwEntryNotFoundError("Failed Retrieving users. :", res);
    }
  } catch (err) {
    errorHandler.mapError(err, req, res, next);
  }
};
