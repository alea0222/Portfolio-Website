console.log("Ell's Portfolio JavaScript is connected!");


// =====================================================
// TAB NAVIGATION
// =====================================================

const tabButtons =
    document.querySelectorAll(".tab-btn");

const tabContents =
    document.querySelectorAll(".tab-content");


function showTab(tabId) {

    // Hide all sections

    tabContents.forEach(function (section) {

        section.classList.remove("active");

    });


    // Remove active from all buttons

    tabButtons.forEach(function (button) {

        button.classList.remove("active");

    });


    // Show selected section

    const selectedSection =
        document.getElementById(tabId);

    if (selectedSection) {

        selectedSection.classList.add("active");

    }


    // Highlight selected tab

    const selectedButton =
        document.querySelector(
            `.tab-btn[data-tab="${tabId}"]`
        );

    if (selectedButton) {

        selectedButton.classList.add("active");

    }

}


// Main navigation buttons

tabButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const tabId =
            button.getAttribute("data-tab");

        showTab(tabId);

    });

});


// Buttons/links that open tabs

const tabLinks =
    document.querySelectorAll("[data-tab-link]");


tabLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        const tabId =
            link.getAttribute("data-tab-link");

        showTab(tabId);

    });

});


// =====================================================
// WELCOME BUTTON
// =====================================================

const welcomeBtn =
    document.getElementById("welcomeBtn");

const welcomeText =
    document.getElementById("welcomeText");


if (welcomeBtn && welcomeText) {

    welcomeBtn.addEventListener("click", function () {

        welcomeText.textContent =
            "👋 Thanks for stopping by! I'm currently learning JavaScript.";

    });

}


// =====================================================
// PROFILE IMAGE MODAL
// =====================================================

const profilePic =
    document.getElementById("profilePic");

const imageModal =
    document.getElementById("imageModal");

const fullImage =
    document.getElementById("fullImage");

const closeBtn =
    document.querySelector(".close");


if (
    profilePic &&
    imageModal &&
    fullImage &&
    closeBtn
) {

    profilePic.addEventListener(
        "click",
        function () {

            imageModal.style.display = "flex";

            fullImage.src =
                profilePic.src;

        }
    );


    closeBtn.addEventListener(
        "click",
        function () {

            imageModal.style.display = "none";

        }
    );


    imageModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === imageModal
            ) {

                imageModal.style.display =
                    "none";

            }

        }
    );


    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                imageModal.style.display =
                    "none";

            }

        }
    );

}


// =====================================================
// DARK MODE
// =====================================================

const darkModeBtn =
    document.getElementById("darkModeBtn");


if (darkModeBtn) {

    darkModeBtn.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark-mode"
            );


            const darkModeEnabled =
                document.body.classList.contains(
                    "dark-mode"
                );


            if (darkModeEnabled) {

                darkModeBtn.textContent = "☀️";

            } else {

                darkModeBtn.textContent = "🌙";

            }

        }
    );

}


// =====================================================
// GITHUB REPOSITORIES
// =====================================================

const githubUsername =
    "alea0222";

const githubRepos =
    document.getElementById("githubRepos");


if (githubRepos) {

    fetch(
        `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=10`
    )

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    "GitHub API request failed"
                );

            }

            return response.json();

        })

        .then(function (repos) {

            githubRepos.innerHTML = "";


            if (repos.length === 0) {

                githubRepos.innerHTML =
                    "<p>No public repositories found.</p>";

                return;

            }


            repos.forEach(function (repo) {

                const repoCard =
                    document.createElement("div");


                repoCard.className =
                    "github-repo";


                repoCard.innerHTML = `

                    <h3>
                        ${repo.name}
                    </h3>

                    <p>
                        ${
                            repo.description ||
                            "No description available."
                        }
                    </p>

                    <p>
                        ⭐ ${repo.stargazers_count}
                        &nbsp; | &nbsp;
                        🍴 ${repo.forks_count}
                    </p>

                    <a
                        href="${repo.html_url}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View Repository →
                    </a>

                `;


                githubRepos.appendChild(
                    repoCard
                );

            });

        })

        .catch(function (error) {

            console.error(
                "GitHub error:",
                error
            );


            githubRepos.innerHTML =
                "<p>Unable to load GitHub repositories.</p>";

        });

}


// =====================================================
// CONTACT FORM VALIDATION
// =====================================================

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {

                event.preventDefault();


                if (formMessage) {

                    formMessage.textContent =
                        "❌ Please complete all fields.";

                    formMessage.style.color =
                        "#d93025";

                }

                return;

            }

        }
    );

}
