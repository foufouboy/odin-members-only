const userDropdown = document.querySelector(".user-nav .drop-down");
const userNav = document.querySelector(".user-nav");

const deleteButtons = document.querySelectorAll("button.delete-post");
const membershipLink = document.querySelector("a.join-membership");

// Header dropdown

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

// Delete post buttons

if (deleteButtons.length) {
    const deletePost = (e) => {
        const postId = e.target.getAttribute("data-post-id");

        fetch(`/delete-post/${postId}`, {
            method: "POST",
            redirect: "follow",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: postId}),
        })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        })
        .catch(err => {
            console.error(err);
        });
    }

    deleteButtons.forEach(button => {
        console.log(button);
        button.addEventListener("click", (e) => deletePost(e));
    });
}

// Membership joining

if (membershipLink) {
    membershipLink.addEventListener("click", e => {
        e.preventDefault();

        const secret = prompt(`Please enter the super secret password : "dogs are much better than cats".`);

        if (secret === "dogs are much better than cats") {

            fetch(`/join`, {
                method: "POST",
                redirect: "follow",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(response => {
                if (response.redirected) {
                    window.location.href = response.url;
                }
            })
            .catch(err => {
                console.error(err);
            });

        } else {
            alert("Wrong secret code! (Admit the truth)")
        }
    });
}