var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  res.render("create", { title: "Create a new account | PreBook" });
});

router.post("/create", function(req, res, next) {
  req.userModel.findOne({ username: req.body.username }, (err, result) => {
    if (result) {
      res.render("catcherror", {
        errorMessage: "username already exists, choose another username.",
        redirectUrl: "/createaccount"
      });
    } else {
      var newUser = new req.userModel({
        username: req.body.username,
        password: req.body.password
      });
      newUser.save((err, result) => {
        if (err) {
          console.log("Database error: " + err);
        } else {
          console.log("Record added");
        }
      });
      res.render("catchsuccess", {
        successMessage: "account created. Now please login.",
        redirectUrl: "/"
      });
    }
  });
});

module.exports = router;
