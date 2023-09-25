function newPage(page) {

  var i, tabcontent;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i=i+1) {
    tabcontent[i].style.display = "none";
  }

  document.getElementById(page).style.display = "block";

}

//document.getElementById("defaultOpen").click();


function changePage(pageID) {
    var currentPage = document.querySelectorAll('div[id^="page"]');
    currentPage.forEach(function (page) {
        page.style.display = 'none';
    });

    var selectedPage = document.getElementById(pageID);
    selectedPage.style.display = 'block';
}

//function that allows users to login
function userLogin() {
    var userName = document.getElementById('username').value; //grab values from username textbox
    var userPass = document.getElementById('password').value; //grab values from password textbox
    var user; //create variable that will hold table information


        $.get("?tableName=User", function (userTable) {     //JQuery GET method to request an array of information from database
            //console.log(userTable);
            user = JSON.parse(userTable);       //converts array data to JSON

            var checkUser = user.find(function (user) {         // variable that will use find method to search array for specific values
                return user.userName === userName && user.userpassword === userPass;        //checks whether username and its corresponding password are the same 
            });

            if (checkUser) {
                alert("Login successful!"); //if both are correlated, success message
            }
            else {
                alert("Login Failed. Try again"); //if both are not correlated, failed message
            }      
            }); //end if-else

} //end function

document.addEventListener("DOMContentLoaded", function () {
    const accountForm = document.getElementById("accountForm");

    accountForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission

        const userName = document.getElementById("userName").value;
        const userPassword = document.getElementById("userPassword").value;
        const userEmail = document.getElementById("userEmail").value;

        // You can perform client-side validation here

        // Create a JSON object with the user input data
        const userData = {
            userName,
            userPassword,
            userEmail,
        };

        // Send the data to the server for insertion
        sendDataToServer(userData);
    });

    function sendDataToServer(userData) {
        // Use Fetch API or XMLHttpRequest to send a POST request to your server endpoint
        // Replace 'http://your-server-endpoint' with the actual URL where your server is running
        fetch("http://127.0.0.1:8000/", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server (e.g., display success message or errors)
            console.log(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
});