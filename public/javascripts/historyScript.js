$(function() {
  // on document being loaded
  // ticketsArray contains all the tickets in an Array
  if (ticketsArray.length == 0)
    document.getElementById("contain").innerHTML =
      "<section><p>No tickets purchased.<p></section>";
  for (var i = 0; i < ticketsArray.length; i++) {
    // ticketsArray[i] contains the current ticket
    console.log("Working?");
    $.post("/history/details", ticketsArray[i], function(data, status) {
      console.log("Done?");
      // data contains the data in json format
      var toAppend = "<section><p><b>Cinema</b>:Broadway</p>";
      toAppend += "<p><b>House</b>: " + data.houseName + "</p>";
      toAppend += "<p><b>Seat No</b>: " + data.seatNo + "</p>";
      toAppend += "<p><b>Film</b>: " + data.filmName + "</p>";
      toAppend += "<p><b>Category</b>: " + data.category + "</p>";
      toAppend += "<p><b>Show Time</b>: " + data.showTime + "</p>";
      var ticketFeeText;

      if (data.ticketFee == "75") ticketFeeText = "$75(Standard)";
      else ticketFeeText = "$50(Student/Senior)";

      toAppend += "<p><b>Ticket Fee</b>: " + ticketFeeText + "</p>";
      toAppend += "</section>";
      document.getElementById("contain").innerHTML += toAppend;
    });
  }
});

/*
<section>
        <p><b>Cinema</b>: Broadway</p>
        <p><b>House</b>: House A</p>
        <p><b>SeatNo</b>: D4</p>
        <p><b>Film</b>: Return Of The Cuckoo</p>
        <p><b>Category</b>: IIA</p>
        <p><b>Show Time</b>: 2015-11-16 12:10 (Mon)</p>
        <p><b>Ticket Fee</b>: $50(Student/Senior)</p>
      </section>
*/
