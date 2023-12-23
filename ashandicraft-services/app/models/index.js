const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.model.js")(sequelize, Sequelize);
db.roles = require("../models/role.model.js")(sequelize, Sequelize);
db.products = require("./product.model.js")(sequelize, Sequelize);
db.images = require("./image.model.js")(sequelize, Sequelize);
db.carts = require("./cart.model.js")(sequelize, Sequelize);
db.cartItems = require("./cartItem.model.js")(sequelize, Sequelize);
db.categories = require("./category.model.js")(sequelize, Sequelize);
db.addresses = require("./address.model.js")(sequelize, Sequelize);
db.roles.belongsToMany(db.users, {
  through: "user_roles"
});
db.users.belongsToMany(db.roles, {
  through: "user_roles"
});
db.products.hasMany(db.images, {
  foreignKey: 'product_id',
  as: 'image'
});
db.images.belongsTo(db.products, {
  foreignKey: 'product_id',
  as: 'product'
});
db.users.hasOne(db.carts);
db.products.belongsTo(db.categories, { foreignKey: 'categoryId', as: 'category' });
db.carts.belongsTo(db.users);
db.carts.belongsToMany(db.products, { through: db.cartItems });
db.products.belongsToMany(db.carts, { through: db.cartItems });
db.users.hasMany(db.addresses); // A user can have multiple addresses
db.addresses.belongsTo(db.users); // An address belongs to a single user
db.ROLES = ["user", "vendor", "admin"];
module.exports = db;