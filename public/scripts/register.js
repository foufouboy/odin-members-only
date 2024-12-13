const signupForm = document.querySelector("form.form");
const pwConf = document.getElementById("conf-password");
const pw = document.getElementById("password");
const pwError = document.querySelector(".confirm-error");
let isError = false;

const showPasswordsSimilarity = (e) => {
    if (pwConf.value !== pw.value) {
        pwError.classList.add("active");
        isError = true;
    } else {
        pwError.classList.remove("active");
        isError = false;
    }
}

pwConf.addEventListener("input", showPasswordsSimilarity);
pw.addEventListener("input", showPasswordsSimilarity);

signupForm.addEventListener("submit", e => {
    if (isError) {
        e.preventDefault();
        alert("Password did not match!");
    }
});


