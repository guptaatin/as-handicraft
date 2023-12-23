const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const upload = require("../middlewares/upload");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.get("/api/user/states", controller.states);

	app.get("/api/user/districts/:state", controller.districts);

	app.post("/api/user/update/:UserId", controller.updateUser);

	app.post("/api/user/updateProfileImage", upload.single("file"), controller.updateProfileImage);

	app.post("/api/user/createUserAddress", controller.createUserAddress);

	app.get("/api/user/:userId/addresses", controller.findUserAddresses);

	app.get("/api/user/findOneUser/:userId", controller.findOneUser);

	app.get("/api/test/all", controller.allAccess);

	app.get(
		"/api/test/user",
		[authJwt.verifyToken],
		controller.userBoard
	);

	app.get(
		"/api/test/vendor",
		[authJwt.verifyToken, authJwt.isVendor],
		controller.vendorBoard
	);

	app.get(
		"/api/test/admin",
		[authJwt.verifyToken, authJwt.isAdmin],
		controller.adminBoard
	);
};