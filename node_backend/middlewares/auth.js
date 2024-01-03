const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config");


async function authMiddleware(req, res, next) {
	const token = req.headers.token;
	if (!token) {
		req.auth = { user: false };
		return next();
	}

	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		if (!verified) {
			req.auth = { user: false };
			return next();
		}

		req.auth = { user: await User.findById(verified.id) };


		return next();
	} catch {
		req.auth = { user: false };
		return next();
	}
}


module.exports = authMiddleware;

