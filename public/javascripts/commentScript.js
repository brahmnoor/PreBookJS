function verify() {
  if (!document.getElementById("textbox").value) {
    alert("Please enter a comment.");
    return false;
  }
}
function retrive() {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var commentshow = document.getElementById("comments");
      commentshow.innerHTML = xmlhttp.responseText;
    }
  };
  xmlhttp.open(
    "GET",
    "/comment/retrive/" + document.getElementById("FilmId").value,
    true
  );
  xmlhttp.send();
}
