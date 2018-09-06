var db = require("../models");
var passport = require('passport');


module.exports = function(app) {

    app.get("/api/user", authenticationMiddleware() ,function(req,res){
        res.send(req.session.passport);
    });



    function authenticationMiddleware () {
        return (req, res, next) => {
            console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
  
            if (req.isAuthenticated()) return next();
            res.send("Not Logged In");
      }
  }
}