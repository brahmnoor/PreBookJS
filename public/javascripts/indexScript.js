var form = document.getElementById("loginform");
var button = document.getElementById("submit");
button.addEventListener("click", function() {
  if (!form.checkValidity()) {
    alert("Please do not leave the fields empty.");
  }
});
