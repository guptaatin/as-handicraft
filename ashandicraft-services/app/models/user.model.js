module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("user", {
		userName: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		},
		firstName: {
			type: Sequelize.STRING,
		},
		lastName: {
			type: Sequelize.STRING,
		},
		prefixMobile: {
			type: Sequelize.STRING
		},
		mobile: {
			type: Sequelize.STRING,
		},
		gender: {
			type: Sequelize.STRING
		},
		dateOfBirth: {
			type: Sequelize.STRING,
		},
		status: {
			type: Sequelize.ENUM("1", "0"),
			defaultValue: "0",
		},
		adminStatus: {
			type: Sequelize.ENUM("1", "0"),
			defaultValue: "0",
		},
		isEmailVerified: {
			type: Sequelize.ENUM("1", "0"),
			defaultValue: "0",
		},
		registerStatus: {
			type: Sequelize.ENUM("1", "0"),
			defaultValue: "0",
		},
		isMobileVerified: {
			type: Sequelize.ENUM("1", "0"),
			defaultValue: "0",
		},
		type: {
			type: Sequelize.STRING,
		},
		name: {
			type: Sequelize.STRING,
		},
		data: {
			type: Sequelize.BLOB("long"),
		},
		cover_type: {
			type: Sequelize.STRING,
		},
		cover_name: {
			type: Sequelize.STRING,
		},
		cover_data: {
			type: Sequelize.BLOB("long"),
		}
	});

	return User;
};
