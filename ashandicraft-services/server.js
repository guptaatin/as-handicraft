const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
global.__basedir = __dirname;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const db = require("./app/models");
const Role = db.roles;
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
  // initial();
});
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "vendor"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/product.routes")(app);
require("./app/routes/image.routes")(app);
require("./app/routes/cart.routes")(app);
require("./app/routes/category.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});