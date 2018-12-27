var form = document.getElementById("createform");
var username;
var password;
var button = document.getElementById("submit");
var reOneNum = new RegExp("/d/");
var reOneAl = new RegExp("/[A-Z]/i");
var reFinal = new RegExp("([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*");
var reAlnum = new RegExp("^[a-zA-Z0-9]*$");
function validateForm() {
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;
  if (username.length == 0 || password.length == 0) {
    alert("Please do no leave the fields empty");
    return false;
  } else if (username.length < 3) {
    alert("Username must be longer than 3 characters");
    return false;
  } else if (!reAlnum.test(username)) {
    alert("Username can only consist of characters and numbers");
    return false;
  } else if (
    password.length < 6 ||
    password.length > 15 ||
    !reFinal.test(password)
  ) {
    alert(
      "The length of the password must be between 6 to 15 characters and it must consist of only alphanumerical characters with at least one alphabet and one numerical character"
    );
    return false;
  }
}
