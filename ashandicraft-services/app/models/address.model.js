module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define("address", {
        recipient_name: {
            type: Sequelize.STRING,
        },
        recipient_email: {
            type: Sequelize.STRING,
        },
        alt_mobile: {
            type: Sequelize.STRING,
        },
        house: {
            type: Sequelize.STRING,
        },
        street: {
            type: Sequelize.STRING,
        },
        landmark: {
            type: Sequelize.STRING,
        },
        city: {
            type: Sequelize.STRING,
        },
        pincode: {
            type: Sequelize.STRING,
        },
        state: {
            type: Sequelize.STRING,
        },
        district: {
            type: Sequelize.STRING,
        },
        save_as: {
            type: Sequelize.STRING,
        },
    });

    return Address;
};