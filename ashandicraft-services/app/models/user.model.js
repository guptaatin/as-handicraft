module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("user", {
		UserId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			notNull: true,
			autoIncrement: true,
		},
		FirstName: {
			type: Sequelize.STRING,
		},
		LastName: {
			type: Sequelize.STRING,
		},
		Email: {
			type: Sequelize.STRING,
		},
		Mobile: {
			type: Sequelize.STRING,
		},
		Status: {
			type: Sequelize.ENUM("1", "0"),
			defaultValue: "0",
		},
		AdminStatus: {
			type: Sequelize.ENUM("1", "0"),
			defaultValue: "0",
		},
		UserPassword: {
			type: Sequelize.STRING,
		},
		IsEmailVerified: {
			type: Sequelize.ENUM("1", "0"),
			defaultValue: "0",
		},
		RegisterStatus: {
			type: Sequelize.ENUM("1", "0"),
			defaultValue: "0",
		},
		IsMobileVerified: {
			type: Sequelize.ENUM("1", "0"),
			defaultValue: "0",
		}
	});

	return User;
};
