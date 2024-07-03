
function setUpPassword() {
    let toggle = document.getElementById("toggle-password");
    let passwordField = document.getElementById("password");
    toggle.addEventListener("click", () => {
        if (toggle.innerText === "SHOW") {
            toggle.innerText = "HIDE";
            passwordField.type = "text";
        } else {
            toggle.innerText = "SHOW";
            passwordField.type = "password";
        }
    });
}
// Login form
function setUpLoginForm() {
    let login = document.getElementById("submit");

    login.addEventListener("click", (event) => {
        event.preventDefault();
        let pass = document.getElementById("password");
        let email = document.getElementById("email");
        let emailError = document.getElementById("email-error");
        let passError = document.getElementById("pass-error");
        let container = document.getElementById("container");
        let webSection = document.getElementById("web-section");

        let valid = true;

        if (email.value.length == "") {
            emailError.style.display = "block";
            email.focus();
            valid = false;
        } else if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(email.value)) {
            emailError.style.display = "block";
            emailError.innerText = "invalid email format";
            email.focus();
            valid = false;
        } else {
            emailError.style.display = "none";
        }

        if (pass.value.length <5) {
            passError.style.display = "block";
            pass.focus();
            valid = false;
        } else {
            passError.style.display = "none";
        }

        if (!valid) {
            event.preventDefault();
        } else {
            // container.style.display = "none";
            // webSection.style.display = "flex";
window.location.href='webPage.html';
           
        }
    });
}
setUpPassword();
setUpLoginForm();