// ✅ Import all functions from errorHandler.js
import { showErrorMessage, clearErrorMessage, showSuccessMessage } from '../Js/errorHandler.js';

// Icon definitions
const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon-check">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
</svg>`;

const eyeIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon-eye">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12c0 3-3 5-7 5s-7-2-7-5 3-5 7-5 7 2 7 5z" />
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12c0 1.1-.9 2-2 2s-2-.9-2-2 2-2 2-2 2 .9 2 2z" />
</svg>`;

 // ✅ Define SVG Icons
 const companyIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V3a2 2 0 012-2h6v4h4V1h6a2 2 0 012 2v18z"/><path d="M9 21V12h6v9"/></svg>`;
 const locationIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a8 8 0 00-8 8c0 5 8 12 8 12s8-7 8-12a8 8 0 00-8-8z"/><circle cx="12" cy="10" r="3"/></svg>`;
 const categoryIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="M9 4v16M15 4v16M4 9h16M4 15h16"/></svg>`;
 const salaryIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1v22M8 5h8M6 9h12M4 13h16M2 17h20"/></svg>`;
 const descriptionIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h4"/></svg>`;
 const calendarIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h18M3 10h18M8 1v4M16 1v4"/><path d="M3 8h18v12H3z"/><path d="M9 14h.01M15 14h.01"/></svg>`;
 const applyIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19v-14"/><path d="M5 12l7-7 7 7"/></svg>`;
 const backIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>`;

// ✅ Main Event Listener
document.addEventListener('DOMContentLoaded', async () => {
    const jobDetailsContainer = document.getElementById('jobDetails');
    const relatedJobsContainer = document.getElementById('relatedJobs');
    const jobId = new URLSearchParams(window.location.search).get('id');

    console.log("Job ID:", jobId);

    if (!jobId) {
        jobDetailsContainer.innerHTML = '<p>❌ Job ID not found.</p>';
        return;
    }

    // ✅ Get Correct User ID and Token from localStorage
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));
    const token = localStorage.getItem("authToken");

    if (!userData || !token) {
        console.error("❌ User or Token Not Found! Please login again.");
        window.location.href = "login.html";
        return;
    }

    const userId = userData.userId;
    console.log("🔹 Token Used:", token);
    console.log("🆔 User ID Used:", userId);

    try {
        // ✅ Fetch Job Details
        const response = await fetch(`https://jobportalapi-0gfs.onrender.com/api/jobs/${jobId}`);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const job = await response.json();

        if (!job) {
            jobDetailsContainer.innerHTML = '<p>❌ Job details not found.</p>';
            return;
        }

        const formattedDate = new Date(job.createdAt).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        jobDetailsContainer.innerHTML = `
 <div class="relative max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-8 border border-gray-200">
    
    <!-- ✅ Top Left More Options Button (Black Color) -->
    <div class="absolute top-4 left-4">
        <!-- ⋮ More Options Button -->
        <button id="moreOptionsButton" class="p-2 text-black bg-gray-100 rounded-full shadow-md hover:bg-gray-200 transition">
            <i class="fa fa-ellipsis-v"></i> <!-- FontAwesome Ellipsis Icon -->
        </button>
    </div>

    <!-- ✅ Top Right Save Job Button -->
    <div class="absolute top-4 right-4">
        <!-- 💾 Save Job Button -->
        <button id="saveJobButton" class="p-2 text-gray-600 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 transition">
            <i class="fa fa-bookmark"></i> <!-- FontAwesome Bookmark Icon -->
        </button>
    </div>

    <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center sm:text-left flex items-center gap-2">
        ${job.jobTitle}
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p class="flex items-center text-gray-700 text-lg gap-2">
            ${companyIcon} <span class="font-medium">Company:</span> ${job.companyName}
        </p>
        <p class="flex items-center text-gray-700 text-lg gap-2">
            ${locationIcon} <span class="font-medium">Location:</span> ${job.location}
        </p>
        <p class="flex items-center text-gray-700 text-lg gap-2">
            ${categoryIcon} <span class="font-medium">Category:</span> ${job.category}
        </p>
        <p class="flex items-center text-gray-700 text-lg gap-2">
            ${salaryIcon} <span class="font-medium">Salary:</span> ${job.salary}
        </p>
    </div>

    <p class="text-gray-600 text-lg mt-4 leading-relaxed flex items-start gap-2">
        ${descriptionIcon} <span class="font-medium">Description:</span> ${job.description}
    </p>

    <p class="text-gray-500 text-sm mt-4 flex items-center gap-2">
        ${calendarIcon} <span class="font-medium">Posted On:</span> ${formattedDate}
    </p>

    <div class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button id="applyButton" class="w-full sm:w-auto px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2">
            ${applyIcon} Apply Now
        </button>
          <button id="applyButton" class="w-full sm:w-auto px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2">
            ${applyIcon} Save Job
        </button>

        <a href="jobs.html" class="w-full sm:w-auto px-6 py-3 text-lg font-semibold text-blue-600 border border-blue-600 rounded-full shadow-md hover:bg-blue-50 transition-all transform hover:scale-105 flex items-center justify-center gap-2">
            ${backIcon} Back to Jobs
        </a>
    </div>
</div>


    `;
    
   
    
    // ✅ Apply Button Smooth Animation
    document.getElementById("applyButton").addEventListener("click", function () {
        this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> Applying...`;
        this.classList.add("opacity-70", "cursor-not-allowed");
        setTimeout(() => {
            this.innerHTML = `${applyIcon} Applied`;
            this.classList.remove("bg-blue-600", "hover:bg-blue-700");
            this.classList.add("bg-green-600");
        }, 2000);
    });
    
    

        // ✅ Apply for Job Function
        const applyForJob = async () => {
            console.log("🔹 Applying for Job with Data:", {
                jobId: job._id,
                userId: userId,
                jobTitle: job.jobTitle,
                companyName: job.companyName,
                location: job.location
            });
        
            try {
                const response = await fetch("https://jobportalapi-0gfs.onrender.com/api/applied-jobs", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        jobId: job._id,
                        userId: userId,
                        jobTitle: job.jobTitle,
                        companyName: job.companyName,
                        location: job.location
                    })
                });
        
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("❌ Backend Error Response:", errorText);
                    throw new Error(`Error: ${response.status}`);
                }
        
                showSuccessMessage("applyButton", "✅ Successfully applied for the job!");
            } catch (error) {
                showErrorMessage("applyButton", "⚠️ Failed to apply!");
                console.error("❌ Error applying:", error);
            }
        };
        

        // ✅ Add Event Listener after button is rendered
        document.getElementById("applyButton").addEventListener("click", applyForJob);

        // ✅ Fetch Related Jobs
        const relatedResponse = await fetch('http://localhost:5000/api/jobs');
        const allJobs = await relatedResponse.json();
        const relatedJobs = allJobs.filter(j => j._id !== jobId).slice(0, 4);

        const relatedJobsList = relatedJobs.map(job => `
            <div class="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-all transform hover:scale-105">
                <h3 class="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <svg class="w-6 h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m4 0h-1v4m-6-4v4h1m4-8h1m-1-4h-4m4 0v1m-4-1v1m0 4h4m4 4h1m-1-4h-4m0 4h4M4 12h1m-1 4h1m-1-8h1m0-4h4m-4 4h4M2 12h1m-1 4h1m-1-8h1" />
                    </svg>
                    ${job.jobTitle}
                </h3>
                <p class="text-gray-600 mb-1 flex items-center gap-2">
                    <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.83 18.36A3 3 0 0118 22H6a3 3 0 01-3-3V7a3 3 0 013-3h2m2 0h8a3 3 0 013 3v11.36z" />
                    </svg>
                    <strong>Company:</strong> ${job.companyName}
                </p>
                <p class="text-gray-600 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10l3 3m0 0l3-3m-3 3V4m6 16a9 9 0 10-18 0h18z" />
                    </svg>
                    <strong>Location:</strong> ${job.location}
                </p>
                <button class="w-full px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                    onclick="window.location.href='job-details.html?id=${job._id}'">
                    <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m0 0H5m4 0h10m-5 0v10m0-10V2" />
                    </svg>
                    View Details
                </button>
            </div>
        `).join('');
        
        relatedJobsContainer.innerHTML = `
            <div class="py-12 px-6 sm:px-12 lg:px-24">
                <div class="max-w-6xl mx-auto">
                    <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center sm:text-left">Related Jobs</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${relatedJobsList}
                    </div>
                </div>
            </div>
        `;
        
        

    } catch (error) {
        console.error('❌ Error:', error);
        jobDetailsContainer.innerHTML = `<p>❌ ${error.message}</p>`;
    }
});
