exports.getEnv = (req, res) => {
	res.status(200).json({ status: "sucess", data: process.env });
};

exports.handlePathNotFound = (req, res, next) => {
	const err = new Error(`URL: ${req.originalUrl} not found.`);
	err.status = "fail";
	err.responseCode = 404;
	next(err);
};
