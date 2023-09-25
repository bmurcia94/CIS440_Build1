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
        try {
            const response = await fetch("/submit_form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            // Handle the server response here
            console.log(data);

            // You can add further logic based on the response
            if (data.success) {
                alert("Account created successfully!");
            } else {
                alert("An error occurred: " + data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    }
});