const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
// Create and Save a new User
exports.create = (req, res) => {
	// Validate request
	if (!req.body.FirstName) {
	  res.status(400).send({
		message: "Content can not be empty!"
	  });
	  return;
	}
	// Create a User
	const user = {
		FirstName: req.body.FirstName,
		LastName: req.body.LastName,
		Email: req.body.Email,
		Mobile: req.body.Mobile,
		Status: req.body.Status,
		AdminStatus: req.body.AdminStatus,
		UserPassword: req.body.UserPassword,
		IsEmailVerified: req.body.IsEmailVerified,
		RegisterStatus: req.body.RegisterStatus,
		IsMobileVerified: req.body.IsMobileVerified
	};
	// Save User in the database
	User.create(user)
	  .then(data => {
		res.send(data);
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || "Some error occurred while creating the User."
		});
	  });
  };

  exports.findAll = (req, res) => {
	const Mobile = req.query.Mobile;
	var condition = Mobile ? { Mobile: { [Op.like]: `%${Mobile}%` } } : null;
	User.findAll({ where: condition })
	  .then(data => {
		res.send(data);
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || "Some error occurred while retrieving users."
		});
	  });
  };

  exports.findOne = (req, res) => {
	const UserId = req.params.UserId;
	User.findByPk(UserId)
	  .then(data => {
		if (data) {
		  res.send(data);
		} else {
		  res.status(404).send({
			message: `Cannot find User with UserId=${UserId}.`
		  });
		}
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Error retrieving User with UserId=" + UserId
		});
	  });
  };

  exports.update = (req, res) => {
	const UserId = req.params.UserId;
	User.update(req.body, {
	  where: { UserId: UserId }
	})
	  .then(num => {
		if (num == 1) {
		  res.send({
			message: "User was updated successfully."
		  });
		} else {
		  res.send({
			message: `Cannot update User with UserId=${UserId}. Maybe User was not found or req.body is empty!`
		  });
		}
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Error updating User with UserId=" + UserId
		});
	  });
  };

  exports.delete = (req, res) => {
	const UserId = req.params.UserId;
	User.destroy({
	  where: { UserId: UserId }
	})
	  .then(num => {
		if (num == 1) {
		  res.send({
			message: "User was deleted successfully!"
		  });
		} else {
		  res.send({
			message: `Cannot delete User with UserId=${UserId}. Maybe User was not found!`
		  });
		}
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Could not delete User with UserId=" + UserId
		});
	  });
  };

  exports.deleteAll = (req, res) => {
	User.destroy({
	  where: {},
	  truncate: false
	})
	  .then(nums => {
		res.send({ message: `${nums} Users were deleted successfully!` });
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || "Some error occurred while removing all Users."
		});
	  });
  };

  exports.findAllMobileVerified = (req, res) => {
	Tutorial.findAll({ where: { published: true } })
	  .then(data => {
		res.send(data);
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || "Some error occurred while retrieving tutorials."
		});
	  });
  };