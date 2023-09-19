function newPage(page) {

  var i, tabcontent;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i=i+1) {
    tabcontent[i].style.display = "none";
  }

  document.getElementById(page).style.display = "block";

}

document.getElementById("defaultOpen").click();


function changePage(pageID) {
    var currentPage = document.querySelectorAll('div[id^="page"]');
    currentPage.forEach(function (page) {
        page.style.display = 'none';
    });

    var selectedPage = document.getElementById(pageID);
    selectedPage.style.display = 'block';
}
