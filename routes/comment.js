var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  if (req.session.login) {
    req.filmModel.find((err, result) => {
      res.render("comment", { title: "Leave a comment", filmArray: result });
    });
  } else
    res.render("catcherror", {
      errorMessage: "sorry, you aren't logged in.",
      redirectUrl: "/"
    });
});

router.get("/retrive/:name", function(req, res, next) {
  var response = "";
  req.commentModel.find({ filmName: req.params.name }, (err, result) => {
    result.forEach(function(e) {
      response += "<section style='padding: 1rem 3rem;'>";
      response += "<h3>Viewer: " + e.username + "</h3>";
      response += "<p style='padding:0;'>" + e.comment + "</p>";
      response += "</section>";
    });
    res.send(response);
  });
});

router.post("/submit", function(req, res, next) {
  var newComment = new req.commentModel({
    filmName: req.body.FilmId,
    username: req.session.login,
    comment: req.body.comment
  });
  newComment.save();
  res.render("catchsuccess", {
    successMessage: "Comment added. Thanks a lot for sharing your opinion.",
    redirectUrl: "/comment"
  });
});

module.exports = router;
