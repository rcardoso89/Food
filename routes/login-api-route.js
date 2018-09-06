// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // Registers new user into DataBase
  app.post("/api/registeruser", function(req, res) {
    // Add sequelize code to find all posts, and return them to the user with res.json
    db.users.create({
      username: req.body.username,
      password: req.body.password,
    }).then((result) => {
      res.json(result);
    })
  });

  // Validates if user auth is valid
  app.post("/api/validateuser", function(req, res) {
    // Add sequelize code for creating a post using req.body,
    // then return the result using res.json
    db.users.findAll({where: {
      email: req.body.username,
      password: req.body.password
    }}).then((result) => {
      console.log(result);
      if (result.length === 0) {
        res.send("INVALID LOGIN")
      } else {
        res.send("SUCCESS")
      }
    })
  });
}
