//this file registers new users and does validation


var db = require("../models");
var expressValidator = require('express-validator');
var passport = require('passport');

// Used to hash our passwords to our database for security
var bcrypt = require('bcrypt');
var saltRounds = 10;


// Routes
// =============================================================
module.exports = function (app) {

  app.get('/home', function (req, res) {
    res.render('home', { title: "PROFILE PAGE" })
  });

  app.get('/register', function (req, res) {
    res.render('register', { title: "Register Here" });
  });

  app.get('/profile', authenticationMiddleware(), function (req, res) {
    res.render('dashboard');
  })

  app.post('/register', function (req, res) {

    //Validation check with Middleware
    req.checkBody('name', 'Name field cannot be empty.').notEmpty();
    req.checkBody('name', 'Name must be between 4-15 characters long.').len(2, 15);
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
    req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);

    // Additional validation to ensure username is alphanumeric with underscores and dashes
    // req.checkBody('name', 'Name can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');

    var errors = req.validationErrors();

    //If there are errors console log and send and object to handlebars to render what those errors are
    if (errors) {

      console.log(`errors: ${JSON.stringify(errors)}`);

      res.render('register', {
        title: 'Registration Error',
        errors: errors
      });
    } else {
      var name = req.body.name;
      var email = req.body.email;
      var password = req.body.password;

      console.log(name);

      //Used to hash passwords before being sent to the database for secuirty measures
      bcrypt.hash(password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        db.usertwos.create({
          username: name,
          password: hash,
          email: email
        }).then((result) => {
          var user_id = result.id;

          req.login(user_id, function (err) {
            if (err) throw err;
            res.redirect('/profile');
          });
        });

      });

    }

  });

  passport.serializeUser(function (user_id, done) {
    done(null, user_id);
  });

  passport.deserializeUser(function (user_id, done) {
    done(null, user_id);
  });

  function authenticationMiddleware() {
    return (req, res, next) => {
      console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

      if (req.isAuthenticated()) return next();
      res.redirect('/login')
    }
  }


}
