var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  if (req.session.login) {
    req.filmModel.find((err, resultOfFilm) => {
      req.broadcastModel.find((err, resultofBroadcast) => {
        console.log(resultofBroadcast);
        res.render("buyHome", {
          title: "Buy a Ticket | PreBook",
          filmArray: resultOfFilm,
          broadcastArray: resultofBroadcast
        });
      });
    });
  } else
    res.render("catcherror", {
      errorMessage: "sorry, you aren't logged in.",
      redirectUrl: "/"
    });
});

router.post("/seatplantry", function(req, res, next) {
  // req.body.filmId & req.body.broadcastId are passed
  // need to pass the information regarding -> film, house, broadcast
  if (req.session.login) {
    req.filmModel.findOne({ _id: req.body.filmId }, (err, currentFilm) => {
      req.broadcastModel.findOne(
        { _id: req.body.broadcastId },
        (err, currentBroadcast) => {
          req.houseModel.findOne(
            { houseName: currentBroadcast.houseName },
            (err, currentHouse) => {
              req.ticketModel.find(
                { broadcastId: req.body.broadcastId },
                (err, alreadyBoughtArray) => {
                  var alreadyBoughtMap = [];
                  alreadyBoughtArray.forEach(function(elem) {
                    alreadyBoughtMap.push(elem.seatRow + "|" + elem.seatCol);
                  });
                  console.log(alreadyBoughtMap);
                  res.render("buyplantry", {
                    title: "Select a Seat | PreBook",
                    currentFilm: currentFilm,
                    currentBroadcast: currentBroadcast,
                    currentHouse: currentHouse,
                    alreadyBoughtMap: alreadyBoughtMap
                  });
                }
              );
            }
          );
        }
      );
    });
  } else
    res.render("catcherror", {
      errorMessage: "sorry, you aren't logged in.",
      redirectUrl: "/"
    });
});

router.post("/buyticket", function(req, res, next) {
  // req.body.filmId & req.body.broadcastId, req.body.seat (contains the seat numbers) are passed
  // need to pass the information regarding -> film, house, broadcast
  var isAlpha = function(ch) {
    return /^[A-Z]$/i.test(ch);
  };
  if (req.session.login) {
    req.filmModel.findOne({ _id: req.body.filmId }, (err, currentFilm) => {
      req.broadcastModel.findOne(
        { _id: req.body.broadcastId },
        (err, currentBroadcast) => {
          //console.log(req.body);
          if (isAlpha(req.body.seat[0])) req.body.seat = [req.body.seat];
          res.render("buyticket", {
            title: "Confirm Ticket | PreBook",
            currentFilm: currentFilm,
            currentBroadcast: currentBroadcast,
            seats: req.body.seat
          });
        }
      );
    });
  } else
    res.render("catcherror", {
      errorMessage: "sorry, you aren't logged in.",
      redirectUrl: "/"
    });
});

router.post("/confirm", function(req, res, next) {
  // req.body.filmId & req.body.broadcastId, req.body.seat (contains the seat numbers) are passed
  // need to pass the information regarding -> film, house, broadcast
  var isAlpha = function(ch) {
    return /^[A-Z]$/i.test(ch);
  };
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  if (req.session.login) {
    req.filmModel.findOne({ _id: req.body.filmId }, (err, currentFilm) => {
      req.broadcastModel.findOne(
        { _id: req.body.broadcastId },
        (err, currentBroadcast) => {
          console.log(req.body);
          if (isAlpha(req.body.seat[0])) req.body.seat = [req.body.seat];
          if (isNumeric(req.body.type)) req.body.type = [req.body.type];

          // write to db
          for (var i = 0; i < req.body.seat.length; i++) {
            var typeOfTicket;
            if (req.body.type[i] == "75") typeOfTicket = "normal";
            else typeOfTicket = "cheap";
            var newTicket = new req.ticketModel({
              seatRow: req.body.seat[i][0],
              seatCol: req.body.seat[i][2],
              broadcastId: req.body.broadcastId,
              username: req.session.login,
              ticketType: typeOfTicket,
              ticketFee: req.body.type[i]
            });
            newTicket.save();
          }

          res.render("buyconfirm", {
            title: "Confirm Ticket | PreBook",
            currentFilm: currentFilm,
            currentBroadcast: currentBroadcast,
            seats: req.body.seat,
            types: req.body.type
          });
        }
      );
    });
  } else
    res.render("catcherror", {
      errorMessage: "sorry, you aren't logged in.",
      redirectUrl: "/"
    });
});

module.exports = router;
