const fs = require("fs");
const pool = require("../db/pool");
const errorHandler = require("../utils/errorHandler");

let data = JSON.parse(fs.readFileSync("./students.text"));

exports.createCustomer = async (req, res, next) => {
  try {
    let body = req.body;
    let sql = `INSERT INTO customers (firstname, lastname, occupation, email, city)
                    VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    let values = [
      body.firstName,
      body.lastName,
      body.occupation,
      body.email,
      body.city,
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
      errorHandler.throwCreationFailureError(
        "Failed creating a customer.",
        res
      );
    }
  } catch (err) {
    errorHandler.mapError(err, req, res, next);
  }
};

exports.getAllCustomers = async (req, res, next) => {
  try {
    let sql = "SELECT * FROM customers";
    let servResponse = await pool.query(sql);
    if (servResponse.rowCount > 0) {
      res
        .status(200)
        .json({
          status: "success",
          requestSentAt: req.requestedAt,
          data: servResponse,
        });
    } else {
      errorHandler.throwEntryNotFoundError("Failed Retrieving customers.", res);
    }
  } catch (err) {
    errorHandler.mapError(err, req, res, next);
  }
};

exports.getCustomerById = async (req, res, next) => {
  try {
    let sql = `SELECT * FROM customers WHERE customer_id = $1`;
    let id = req.params.id;
    let servResponse = await pool.query(sql, [id]);
    if (servResponse.rowCount > 0) {
      res
        .status(200)
        .json({
          status: "success",
          requestSentAt: req.requestedAt,
          data: servResponse,
        });
    } else {
      errorHandler.throwEntityIdNotFoundError(
        "Failed creating a customer. CustomerId",
        id,
        res
      );
    }
  } catch (err) {
    errorHandler.mapError(err, req, res, next);
  }
};

exports.updateCustomerById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let sql = `UPDATE customers
                    SET firstname = $1, lastname = $2, occupation = $3, email = $4, city = $5
                    WHERE customer_id = $6;`;
    let values = [
      body.firstName,
      body.lastName,
      body.occupation,
      body.email,
      body.city,
      id,
    ];
    let servResponse = await pool.query(sql, values);
    if (servResponse.rowCount > 0) {
      res
        .status(200)
        .json({
          status: "success",
          message: `Data entry [ID=${id}] has been updated sucessfully.`,
          data: servResponse,
        });
    } else {
      errorHandler.throwEntityIdNotFoundError(
        "Failed updating a customer. CustomerId",
        id,
        res
      );
    }
  } catch (err) {
    errorHandler.mapError(err, req, res, next);
  }
};

exports.deleteCustomerById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let sql = `DELETE FROM customers WHERE customer_id = $1;`;
    let servResponse = await pool.query(sql, [id]);
    if (servResponse.rowCount > 0) {
      res
        .status(200)
        .json({
          status: "success",
          message: `Data entry [ID=${id}] has been deleted sucessfully.`,
          data: servResponse,
        });
    } else {
      errorHandler.throwEntityIdNotFoundError(
        "Failed deleting a customer. CustomerId",
        id,
        res
      );
    }
  } catch (err) {
    errorHandler.mapError(err, req, res, next);
  }
};
