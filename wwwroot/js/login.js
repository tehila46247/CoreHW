
const uri = "/User/Login";

function login(event) {
    event.preventDefault();

    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    var requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: 0,
            username: userName,
            password: password,
            type: "",
        }),
        redirect: "follow",
    };

    fetch(uri, requestOptions)
        .then(response => {
            if (response.status === 200) return response.text();
            else throw new Error("Unauthorized");
        })
        .then(token => {
            localStorage.setItem("token", "Bearer " + token);
            console.log(localStorage.getItem("token"));

            const userType = getUserTypeFromToken(token);

            // הצגת כפתורים בהתאם לסוג המשתמש
            showButtonsBasedOnRole(userType);

            // מחיקת הודעת שגיאה אם הכל תקין
            document.getElementById('error-message').style.display = 'none';

        })
        .catch(error => {
            console.log("error", error);
            document.getElementById('error-message').style.display = 'block';
            errorMessage.classList.remove("hidden");
        });
}

// פונקציה לחילוץ סוג המשתמש מה-token (JWT)
function getUserTypeFromToken(token) {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload)); 
    return decodedPayload.type; 
}

// הצגת כפתורים שונים לפי סוג המשתמש
function showButtonsBasedOnRole(userType) {
    const adminButtons = document.getElementById("admin-buttons");
    const userButtons = document.getElementById("user-buttons");
    document.querySelector('.login-container').style.display = 'none';
    if (userType === "Admin") {
        adminButtons.style.display = "block";
        userButtons.style.display = "none";
    } else if (userType === "User") {
        adminButtons.style.display = "none";
        userButtons.style.display = "block";
    }
}

function products() {
    window.location.href = "products.html";
}

function user() {
    window.location.href = "users.html";
}

// בדיקה אם המשתמש כבר מחובר
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token").split(' ')[1];
        const userType = getUserTypeFromToken(token);
        showButtonsBasedOnRole(userType);
    }
});

