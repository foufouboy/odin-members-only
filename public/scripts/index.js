const userDropdown = document.querySelector(".user-nav .drop-down");
const userNav = document.querySelector(".user-nav");

if (userDropdown && userNav) {
    document.body.addEventListener("click", (e) => {

        if (userDropdown.classList.contains("active") &&
            !userDropdown.contains(e.target)) {
                console.log("in");
                userDropdown.classList.remove("active");
            }
    })

    userNav.addEventListener("click", (e) => {
        e.stopPropagation();
        if (userDropdown.classList.contains("active")) {
            userDropdown.classList.remove("active");
        } else {
            userDropdown.classList.add("active");
        }
    });

    userDropdown.addEventListener("click", (e) => {
        e.stopPropagation();
    })
}

