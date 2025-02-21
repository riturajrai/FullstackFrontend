import { showErrorMessage, showSuccessMessage } from './errorHandler.js';

document.addEventListener("DOMContentLoaded", async () => {
    const jobList = document.getElementById("jobList");
    const searchInput = document.getElementById("jobSearchInput");
    const searchButton = document.getElementById("jobSearchButton");
    const categoryContainer = document.getElementById("jobCategoryContainer");
    const toggleMenu = document.getElementById("jobToggleMenu");

    const API_URL = "https://fullstackjobportal.onrender.com/api/jobs";

    const categories = [
        "Software Development", "Marketing", "Web Developer",
        "Data Science", "UI/UX Designer", "Project Manager", "DevOps Engineer"
    ];

    categoryContainer.innerHTML = categories.map(category => 
        `<button class="job-category-btn" data-category="${category}">${category}</button>`
    ).join("");

    toggleMenu.addEventListener("click", () => {
        categoryContainer.classList.toggle("hidden");
    });

    document.querySelectorAll(".job-category-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const selectedCategory = btn.getAttribute("data-category");
            searchInput.value = selectedCategory;
            fetchJobs(selectedCategory);
        });
    });

    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `./jobs.html?search=${encodeURIComponent(query)}`;
        } else {
            showErrorMessage('jobSearchMessage', 'Please enter a search query');
        }
    });

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
                        <svg class="w-5 h-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h12v2H3v-2zm0 4h12v2H3v-2zm0 4h18v2H3v-2z"/>
                        </svg> 
                        <span class="font-medium">Company:</span> ${job.companyName}
                    </p>
            
                    <p class="flex items-center text-gray-600 mb-2 job-location text-sm sm:text-base">
                        <svg class="w-5 h-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M8 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM8 9a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z"/>
                        </svg>
                        <span class="font-medium">Location:</span> ${job.location}
                    </p>
            
                    <p class="flex items-center text-gray-600 mb-2 job-category text-sm sm:text-base">
                        <svg class="w-5 h-5 text-yellow-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M11.3 1.7a1 1 0 0 0-1.4 0l-2 2a1 1 0 0 0 0 1.4l.7.7c.2-.1.5-.2.7-.3l.7.7a3.5 3.5 0 0 1 0 5l-2.7 2.7a1 1 0 0 0 0 1.4l2 2a1 1 0 0 0 1.4-1.4l-2-2a3.5 3.5 0 0 1 5-5l-.7-.7c.1-.2.2-.5.3-.7l.7-.7a1 1 0 0 0 0-1.4l-2-2a1 1 0 0 0-1.4 0z"/>
                        </svg>
                        <span class="font-medium">Category:</span> ${job.category}
                    </p>
            
                    <p class="flex items-center text-gray-600 mb-4 job-salary text-sm sm:text-base">
                        <svg class="w-5 h-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M3.5 1A1.5 1.5 0 0 1 5 2.5h6A1.5 1.5 0 0 1 12.5 1h-9zm0 1h9a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V2.5a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                        <span class="font-medium">Salary:</span> ${job.salary}
                    </p>
            
                    <button id="job-view-details" 
                        class="job-view-details flex items-center gap-2 bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 
                        rounded-full font-medium hover:bg-blue-700 transition-all shadow-md transform hover:scale-105" 
                        data-id="${job._id}">
                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M11.742 10.742a6.5 6.5 0 1 0-1.414 1.414 5.978 5.978 0 0 0 1.414-1.414zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg> 
                        View Details
                    </button>
                `;
            
                jobList.appendChild(jobElement);
            });

            document.querySelectorAll(".job-view-details").forEach(button => {
                button.addEventListener("click", function () {
                    window.location.href = `job-details.html?id=${this.getAttribute("data-id")}`;
                });
            });
        } catch (error) {
            console.error("❌ Error Fetching Jobs:", error);
            showErrorMessage('jobSearchMessage', '⚠️ Failed to load jobs. Please try again later.');
        }
    }
});


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




// Extract search term from URL (joblobby.html)
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('search');

// Display search term or perform further actions
if (searchTerm) {
    console.log("Searching for:", searchTerm);
    // You can fetch jobs related to searchTerm here
} else {
    console.log("No search term provided.");
}


