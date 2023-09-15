function newPage(page) {

  var i, tabcontent;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i=i+1) {
    tabcontent[i].style.display = "none";
  }

  document.getElementById(page).style.display = "block";

}

document.getElementById("defaultOpen").click();
