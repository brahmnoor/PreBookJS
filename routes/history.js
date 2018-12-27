var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  if (req.session.login) {
    req.ticketModel.find(
      { username: req.session.login },
      "-_id",
      (err, result) => {
        if (err) console.log("DB Error");
        else
          res.render("history", {
            ticketsArray: result,
            username: req.session.login,
            title: "History | PreBook"
          });
      }
    );
  } else
    res.render("catcherror", {
      errorMessage: "sorry, you aren't logged in.",
      redirectUrl: "/"
    });
});

router.post("/details", function(req, res, next) {
  // req.body.broadcastId contains the broadcastId for which we have to fetch the details
  //console.log(req.body.broadcastId);
  req.broadcastModel.findOne(
    { _id: req.body.broadcastId },
    (err, currentBroadcast) => {
      if (err) console.log("DB Error");
      else {
        //console.log(currentBroadcast.filmName);
        req.filmModel.findOne(
          { filmName: currentBroadcast.filmName },
          (err, currentFilm) => {
            if (err) console.log("DB Error");
            else {
              //console.log(currentFilm);
              res.send({
                filmName: currentFilm.filmName,
                houseName: currentBroadcast.houseName,
                category: currentFilm.category,
                showTime:
                  currentBroadcast.date +
                  " " +
                  currentBroadcast.time +
                  " (" +
                  currentBroadcast.day +
                  ")",
                seatNo: req.body.seatRow + req.body.seatCol,
                ticketFee: req.body.ticketFee
              });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
