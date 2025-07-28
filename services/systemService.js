exports.getEnv = (req, res) => {
    res.status(200).json({"status": "sucess", "data": process.env});
}

exports.handleNotFound = (req, res) => {
    res.status(404).json({"status": "fail", "message": "Path not found."});
}