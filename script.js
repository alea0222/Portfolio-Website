console.log("JavaScript is connected!");

const button = document.getElementById("welcomeBtn");
const text = document.getElementById("welcomeText");

button.addEventListener("click", function () {
    text.textContent = "👋 Thanks for stopping by! I'm currently learning JavaScript";
});
const image = document.getElementById("profilePic");
const modal = document.getElementById("imageModal");
const fullImage = document.getElementById("fullImage");
const closeBtn = document.querySelector(".close");

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
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        modal.style.display = "none";
    }
});
const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});
const hiddenElements = document.querySelectorAll("section");

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
// Contact Form Validation
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "") {
            formMessage.textContent = "❌ Please enter your name.";
            formMessage.style.color = "red";
            return;
        }

        if (email === "") {
            formMessage.textContent = "❌ Please enter your email.";
            formMessage.style.color = "red";
            return;
        }

        if (message === "") {
            formMessage.textContent = "❌ Please enter your message.";
            formMessage.style.color = "red";
            return;
        }

        formMessage.textContent = "✅ Message sent successfully!";
        formMessage.style.color = "green";

        contactForm.reset();
    });
}
// GitHub API
const githubRepos = document.getElementById("githubRepos");

fetch("https://api.github.com/users/YOUR_GITHUB_USERNAME/repos")
    .then(response => response.json())
    .then(data => {

        githubRepos.innerHTML = "";

        data.forEach(repo => {

            const repoCard = document.createElement("div");

            repoCard.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "No description available."}</p>
                <a href="${repo.html_url}" target="_blank">
                    View Repository
                </a>
            `;

            githubRepos.appendChild(repoCard);
        });

    })
    .catch(error => {
        githubRepos.innerHTML = "<p>Unable to load GitHub repositories.</p>";
        console.log(error);
    });