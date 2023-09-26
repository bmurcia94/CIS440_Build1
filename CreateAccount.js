document.addEventListener("DOMContentLoaded", function () {
    const accountForm = document.getElementById("accountForm");

    accountForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission

        const userName = document.getElementById("userName").value;
        const userPassword = document.getElementById("userPassword").value;
        const userEmail = document.getElementById("userEmail").value;

        // Create a JSON object with the user input data
        const userData = {
            userName,
            userPassword,
            userEmail,
        };

        // Send the data to the server for insertion
      sendDataToServer(userData);
    });

    async function sendDataToServer(userData) {
        fetch("/submit_form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response here
            if (data.success) {
                alert("Account created successfully!");
                window.location.href = 'login.html';
            } else {
                // alert("An error occurred: " + data.message);
                // alert("Account created successfully!");
                window.location.href = 'login.html';
            }
        })
        .catch(error => {
            console.error("Error:", error);
            // alert("An error occurred. Please try again.");
            window.location.href = 'login.html';
        });
        }
    
});