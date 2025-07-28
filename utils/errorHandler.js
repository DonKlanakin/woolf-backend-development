exports.mapError = (err, req, res, next) => {
    err.status = err.status || "fail";
    err.responseCode = err.responseCode || 500;
    err.message = err.message || `Internal Server Error.`;
    next(err);
}

exports.throwCreationFailError = (prefix, res) => {
    let err = new Error();
    prefix = prefix || "",
    err.status = "fail";
    err.responseCode = 400;
    err.message = `${prefix} No changes were made.`;
    throw err;
}

exports.throwEntryNotFoundError = (prefix, res) => {
    let err = new Error();
    prefix = prefix || "",
    err.status = "fail";
    err.responseCode = 404;
    err.message = `${prefix} not found.`;
    throw err;
}

exports.throwEntityIdNotFoundError = (prefix, id, res) => {
    let err = new Error();
    prefix = prefix || "",
    err.status = "fail";
    err.responseCode = 404;
    err.message = `${prefix}[${id}] not found.`;
    throw err;
}