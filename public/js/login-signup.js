/*====================================================
        Complaint Management System
        Login & Signup
        Part 3 - UI Logic
====================================================*/

const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const formTitle = document.getElementById("formTitle");
const subtitle = document.querySelector(".subtitle");

const loginMessage = document.getElementById("loginMessage");
const signupMessage = document.getElementById("signupMessage");

/*====================================================
            Helper Functions
====================================================*/

function clearMessages(){

    loginMessage.className = "form-message";
    signupMessage.className = "form-message";

    loginMessage.style.display = "none";
    signupMessage.style.display = "none";

    loginMessage.innerHTML = "";
    signupMessage.innerHTML = "";

}

function showMessage(element, type, message){

    element.className = "form-message " + type;

    element.innerHTML = message;

    element.style.display = "block";

}

function resetForms(){

    loginForm.reset();
    signupForm.reset();

}

/*====================================================
            Switch To Login
====================================================*/

loginTab.addEventListener("click", () => {

    clearMessages();

    loginTab.classList.add("active");
    signupTab.classList.remove("active");

    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");

    formTitle.innerHTML = "Welcome Back";

    subtitle.innerHTML = "Please login to continue";

});

/*====================================================
            Switch To Register
====================================================*/

signupTab.addEventListener("click", () => {

    clearMessages();

    signupTab.classList.add("active");
    loginTab.classList.remove("active");

    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");

    formTitle.innerHTML = "Create Account";

    subtitle.innerHTML = "Register to continue";

});

/*====================================================
            Password Validation
====================================================*/

signupForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    clearMessages();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (password.length < 6) {
        showMessage(signupMessage, "error", "Password must be at least 6 characters.");
        return;
    }

    if (password !== confirmPassword) {
        showMessage(signupMessage, "error", "Passwords do not match.");
        return;
    }

    try {

        const response = await fetch("http://localhost:1000/api/auth/signup", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })

        });

        const data = await response.json();

        if (response.ok) {

            showMessage(
                signupMessage,
                "success",
                data.message
            );

            signupForm.reset();

            setTimeout(() => {

                loginTab.click();

            }, 1500);

        } else {

            showMessage(
                signupMessage,
                "error",
                data.message
            );

        }

    } catch (error) {

        showMessage(
            signupMessage,
            "error",
            "Server not responding."
        );

        console.log(error);

    }

});

/*====================================================
        Login Validation
====================================================*/

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    clearMessages();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    try {

        const response = await fetch("http://localhost:1000/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            showMessage(
                loginMessage,
                "success",
                "Login Successful"
            );

            setTimeout(() => {

                if (data.role === "Admin") {

                    window.location.href = "admin-dashboard.html";

                } else {

                    window.location.href = "dashboard.html";

                }

            }, 1000);

        } else {

            showMessage(
                loginMessage,
                "error",
                data.message
            );

        }

    } catch (error) {

        showMessage(
            loginMessage,
            "error",
            "Server not responding."
        );

        console.log(error);

    }

});