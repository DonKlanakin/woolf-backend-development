exports.validateParam = (req, res, next, val) => {
	if (Number.isNaN(Number(val)) || Number(val) <= 0) {
		res
			.status(400)
			.json({
				status: "failed.",
				requestdAt: req.requestedAt,
				message: "Bad request.",
			});
	} else {
		next();
	}
};

exports.validateId = (req, res, next) => {
	let id = req.params.id;
	if (Number.isNaN(Number(id)) || Number(id) <= 0) {
		res
			.status(400)
			.json({
				status: "failed.",
				requestdAt: req.requestedAt,
				message: "Bad request.",
			});
	} else {
		next();
	}
};
