import { homeIcon, jobsIcon, employersIcon, eyeIcon, aboutIcon, profileIcon, logoutIcon } from "../Js/icons.js";

document.addEventListener("DOMContentLoaded", function () {
    const navbarContainer = document.getElementById("navbar-container");

    // ✅ Navbar Inject
    navbarContainer.innerHTML = `
        <nav class="navbar bg-white shadow-md fixed top-0 left-0 w-full flex justify-between items-center px-6 py-3 z-50">
            <a href="./index.html" class="flex items-center">
                <img id="img-logo" src="https://rgitech.weebly.com/uploads/1/0/1/4/101493456/published/job-portal-software-script_1.png?1491821976" class="logo h-12" alt="Logo">
            </a>
            <div>
                <button class="menu-toggle text-2xl md:hidden focus:outline-none" id="menu-toggle">☰</button>
            </div>
            <ul class="nav-links hidden md:flex flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none space-y-4 md:space-y-0 md:space-x-6 items-center text-gray-700 font-medium p-4 md:p-0 transition-all duration-300 ease-in-out" id="nav-links">
                <li><a href="./index.html" class="hover:text-blue-600 flex items-center">${homeIcon} Home</a></li>
                <li><a href="./jobs.html" class="hover:text-blue-600 flex items-center">${jobsIcon} Jobs</a></li>
                <li><a href="./contact.html" class="hover:text-blue-600 flex items-center">${eyeIcon} Contact</a></li>
                <li><a href="./about.html" class="hover:text-blue-600 flex items-center">${aboutIcon} About</a></li>
                <li><a href="./empoloyers.html" class="hover:text-blue-600 flex items-center">${employersIcon} Employers</a></li>
                <li><a href="./profile-view.html" id="profile-link" class="hover:text-blue-600 flex items-center hidden">👤 Profile</a></li>
                <li><a href="./join.html" id="join-link" class="btn-primary bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Join Now</a></li>
                <li><a href="#" id="logout-button" class="btn-danger bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition hidden">LogOut</a></li>
            </ul>
        </nav>
    `;

    setupNavbar(); // Ensure this function exists

    // ✅ Mobile Menu Toggle Logic
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("hidden");
        navLinks.classList.toggle("flex"); // Show on mobile
    });
});


function setupNavbar() {
   
    // ✅ Highlight Active Link
    highlightActiveLink();

    // ✅ Update Navbar Elements (Login/Logout)
    updateProfileAndJoinButtons();

    // ✅ Local Storage Event Listener
    window.addEventListener("storage", updateProfileAndJoinButtons);
}

function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const navLinksItems = document.querySelectorAll(".nav-links a");
    navLinksItems.forEach(link => {
        if (link.href.includes(currentPath)) {
            link.classList.add("active");
        }
    });
}

// ✅ Update Profile & Logout Button Visibility
function updateProfileAndJoinButtons() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const profileLink = document.getElementById("profile-link");
    const joinLink = document.getElementById("join-link");
    const logoutButton = document.getElementById("logout-button");

    if (!profileLink || !joinLink || !logoutButton) {
        console.error("🚨 Navbar elements not found in DOM!");
        return;
    }

    if (user) {
        profileLink.style.display = "block";  // ✅ Profile
        joinLink.style.display = "none";      // ❌ Join 
        logoutButton.style.display = "block"; // ✅ Logout 
    } else {
        profileLink.style.display = "none";
        joinLink.style.display = "block";
        logoutButton.style.display = "none";
    }

    // ✅ Logout Button Click Event
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("authToken");
        localStorage.setItem("userLoggedIn", "false");
        alert("✅ Logout successful!");
        updateProfileAndJoinButtons();
        window.location.href = "./login.html";
    });
}
document.addEventListener("DOMContentLoaded", function () {
    updateProfileAndJoinButtons();
});
