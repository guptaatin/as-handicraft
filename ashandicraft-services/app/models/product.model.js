module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        name: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.FLOAT
        },
        viewCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
    });

    return Product;
};