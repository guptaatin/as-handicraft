module.exports = app => {
	const users = require("../controllers/user.controller.js");
	var router = require("express").Router();
	// Create a new User
	router.post("/", users.create);
	// Retrieve all users
	router.get("/", users.findAll);
	// // Retrieve all published users
	router.get("/mobileVerified", users.findAllMobileVerified);
	// // Retrieve a single User with UserId
	router.get("/:UserId", users.findOne);
	// // Update a User with UserId
	router.put("/:UserId", users.update);
	// // Delete a User with UserId
	router.delete("/:UserId", users.delete);
	// // Delete all users
	router.delete("/", users.deleteAll);
	app.use('/api/users', router);
  };