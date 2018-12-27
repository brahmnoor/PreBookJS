function check() {
  var flag = -1;
  var listOfCheckboxes = document.getElementsByClassName("checkbox");
  for (var i = 0; i < listOfCheckboxes.length; i++) {
    if (listOfCheckboxes[i].checked) flag = 1;
  }
  if (flag == -1) {
    alert("Please choose at least one seat.");
    return false;
  }
}
