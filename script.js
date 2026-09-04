console.log("JavaScript is connected!");


// ==============================
// Welcome Button
// ==============================

const button = document.getElementById("welcomeBtn");
const text = document.getElementById("welcomeText");

if (button && text) {
    button.addEventListener("click", function () {
        text.textContent =
            "👋 Thanks for stopping by! I'm currently learning JavaScript";
    });
}


// ==============================
// Profile Image Modal
// ==============================

const image = document.getElementById("profilePic");
const modal = document.getElementById("imageModal");
const fullImage = document.getElementById("fullImage");
const closeBtn = document.querySelector(".close");

if (image && modal && fullImage && closeBtn) {

    image.addEventListener("click", function () {
        modal.style.display = "flex";
        fullImage.src = image.src;
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            modal.style.display = "none";
        }
    });
}


// ==============================
// Dark Mode
// ==============================

const darkModeBtn = document.getElementById("darkModeBtn");

if (darkModeBtn) {
    darkModeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });
}


// ==============================
// Section Animation
// ==============================

const hiddenElements = document.querySelectorAll("section");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    });

    hiddenElements.forEach((el) => {
        el.classList.add("hidden");
        observer.observe(el);
    });

}


// ==============================
// GitHub Repositories
// ==============================

const githubUsername = "alea0222";
const githubRepos = document.getElementById("githubRepos");

if (githubRepos) {

    fetch(
        `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=10`
    )

        .then((response) => {

            if (!response.ok) {
                throw new Error("GitHub API request failed");
            }

            return response.json();

        })

        .then((repos) => {

            githubRepos.innerHTML = "";

            if (repos.length === 0) {

                githubRepos.innerHTML =
                    "<p>No public repositories found.</p>";

                return;
            }

            repos.forEach((repo) => {

                const repoCard = document.createElement("div");

                repoCard.className = "github-repo";

                repoCard.innerHTML = `
                    <h3>${repo.name}</h3>

                    <p>
                        ${repo.description || "No description available."}
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

                githubRepos.appendChild(repoCard);

            });

        })

        .catch((error) => {

            console.error("GitHub error:", error);

            githubRepos.innerHTML =
                "<p>Unable to load GitHub repositories.</p>";

        });
}


// ==============================
// Contact Form Validation
// ==============================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {

            event.preventDefault();

            if (formMessage) {
                formMessage.textContent =
                    "❌ Please complete all fields.";

                formMessage.style.color = "red";
            }

            return;
        }

        // IMPORTANT:
        // We DO NOT use event.preventDefault() here.
        //
        // The valid form is allowed to submit to:
        // https://formsubmit.co/aleafar1122@gmail.com
        //
        // FormSubmit will handle sending the email.
    });

}
