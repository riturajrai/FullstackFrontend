import { showErrorMessage, showSuccessMessage } from './errorHandler.js';

document.addEventListener("DOMContentLoaded", async () => {
    const jobList = document.getElementById("jobList");
    const searchInput = document.getElementById("jobSearchInput");
    const searchButton = document.getElementById("jobSearchButton");
    const categoryContainer = document.getElementById("jobCategoryContainer");
    const toggleMenu = document.getElementById("jobToggleMenu");

    const API_URL = "http://localhost:5000/api/jobs"; // ✅ Fixed API URL

    const categories = [
        "Software Development", "Marketing", "Web Developer",
        "Data Science", "UI/UX Designer", "Project Manager", "DevOps Engineer"
    ];

    // ✅ Ensure category buttons are added to DOM before attaching event listeners
    categoryContainer.innerHTML = categories.map(category =>
        `<button class="job-category-btn" data-category="${category}">${category}</button>`
    ).join("");

    // ✅ Toggle category menu
    if (toggleMenu) {
        toggleMenu.addEventListener("click", () => {
            categoryContainer.classList.toggle("hidden");
        });
    }

    // ✅ Attach event listeners after elements exist
    document.querySelectorAll(".job-category-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const selectedCategory = btn.getAttribute("data-category");
            searchInput.value = selectedCategory;
            fetchJobs(selectedCategory);
        });
    });

    // ✅ Search Button Click
    if (searchButton) {
        searchButton.addEventListener("click", (e) => {
            const query = searchInput.value.trim();
            if (query) {
                e.preventDefault()
                window.location.href = `./jobs.html?search=${encodeURIComponent(query)}`;
            } else {
                showErrorMessage('jobSearchMessage', 'Please enter a search query');
            }
        });
    }

    // ✅ Fetch jobs when search term is present in URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");
    if (searchQuery) {
        searchInput.value = searchQuery;
        fetchJobs(searchQuery);
    } else {
        fetchJobs();
    }

    async function fetchJobs(query = "") {
        showSuccessMessage('jobSearchMessage', '🔄 Loading jobs...');
        try {
            const url = query ? `${API_URL}?keyword=${encodeURIComponent(query)}` : API_URL;
            const response = await fetch(url);
            const jobs = await response.json();

            // ✅ Clear jobList before adding new jobs
            jobList.innerHTML = "";

            if (!Array.isArray(jobs) || jobs.length === 0) {
                showErrorMessage('jobSearchMessage', `No jobs found for: ${query}`);
                return;
            }

            jobs.forEach(job => {
                const jobElement = document.createElement("div");
                jobElement.classList.add(
                    "job-card-item", "bg-white", "shadow-md", "rounded-2xl", "p-5",
                    "transition-all", "hover:shadow-2xl", "hover:-translate-y-1", "border", "border-gray-200"
                );
                jobList.classList.add("grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "gap-6");

                jobElement.innerHTML = `
                   <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-3 job-title">
    ${job.jobTitle}
</h3>

<p class="flex items-center text-gray-600 mb-2 company-name text-sm sm:text-base">
    <i class="fa fa-building text-blue-600"></i> 
    <span class="font-medium ml-2">Company:</span> ${job.companyName}
</p>

<p class="flex items-center text-gray-600 mb-2 job-location text-sm sm:text-base">
    <i class="fa fa-map-marker-alt text-blue-600"></i> 
    <span class="font-medium ml-2">Location:</span> ${job.location}
</p>

<p class="flex items-center text-gray-600 mb-2 job-category text-sm sm:text-base">
    <i class="fa fa-briefcase text-blue-600"></i> 
    <span class="font-medium ml-2">Category:</span> ${job.category}
</p>

<p class="flex items-center text-gray-600 mb-4 job-salary text-sm sm:text-base">
    <i class="fa fa-dollar-sign text-blue-600"></i> 
    <span class="font-medium ml-2">Salary:</span> ${job.salary}
</p>

<!-- View Details Button -->
<button class="job-view-details flex items-center gap-2 bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 
    rounded-full font-medium transition-all shadow-md transform hover:scale-105"
    data-id="${job._id}">
    <i class="fa fa-eye text-white"></i> View Details
</button>

                `;

                // ✅ Add event listener for View Details button **inside** the loop
                jobElement.querySelector(".job-view-details").addEventListener("click", function () {
                    window.location.href = `job-details.html?id=${this.getAttribute("data-id")}`;
                });

                jobList.appendChild(jobElement);
            });

        } catch (error) {
            console.error("❌ Error Fetching Jobs:", error);
            showErrorMessage('jobSearchMessage', '⚠️ Failed to load jobs. Please try again later.');
        }
    }
});

// ✅ Toggle Category Menu
const filterButton = document.querySelector('.filter-btn');
const categoryMenu = document.querySelector('.category-menu');
const relatedJobs = document.querySelector('.related-job-container');

// ✅ Check if elements exist before adding event listener
if (filterButton && categoryMenu && relatedJobs) {
    filterButton.addEventListener('click', () => {
        categoryMenu.classList.toggle('hidden'); // Tailwind CSS hidden class
        relatedJobs.classList.toggle('active');

        // ✅ Smooth transition effect
        categoryMenu.classList.toggle('opacity-100');
        categoryMenu.classList.toggle('scale-100');
    });
} else {
    console.error("❌ One or more elements not found! Check class names or ensure HTML is loaded.");
}

// ✅ Extract search term from URL (joblobby.html)
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('search');

if (searchTerm) {
    console.log("Searching for:", searchTerm);
} else {
    console.log("No search term provided.");
}
