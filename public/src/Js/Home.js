document.getElementById('searchButton').addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput').value;
    if (searchInput) {
        // Redirect to the job lobby page with the search input as a query parameter
        window.location.href = `./jobs.html?search=${encodeURIComponent(searchInput)}`;
    } else {
        alert('Please enter a search term!');
    }
});






const jobs = [
    {
        jobTitle: "Frontend Developer",
        companyName: "Tech Innovators",
        location: "Remote",
        salary: "$60,000/yr",
        type: "Full-Time",
        id: "1"
    },
    {
        jobTitle: "Backend Engineer",
        companyName: "CloudCorp",
        location: "New York, USA",
        salary: "$75,000/yr",
        type: "Part-Time",
        id: "2"
    },
    {
        jobTitle: "UI/UX Designer",
        companyName: "Creative Minds",
        location: "San Francisco, USA",
        salary: "$85,000/yr",
        type: "Remote",
        id: "3"
    }
];

// Render Jobs
const jobListContainer = document.getElementById("job-list");

jobListContainer.innerHTML = jobs.map(job => `
    <div class="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-all transform hover:scale-105">
        <h3 class="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <svg class="w-6 h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m4 0h-1v4m-6-4v4h1m4-8h1m-1-4h-4m4 0v1m-4-1v1m0 4h4m4 4h1m-1-4h-4m0 4h4M4 12h1m-1 4h1m-1-8h1m0-4h4m-4 4h4M2 12h1m-1 4h1m-1-8h1" />
            </svg>
            ${job.jobTitle}
        </h3>
        <p class="text-gray-600 mb-1 flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10l3 3m0 0l3-3m-3 3V4m6 16a9 9 0 10-18 0h18z" />
            </svg>
            <strong>Company:</strong> ${job.companyName}
        </p>
        <p class="text-gray-600 mb-1 flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10l3 3m0 0l3-3m-3 3V4m6 16a9 9 0 10-18 0h18z" />
            </svg>
            <strong>Location:</strong> ${job.location}
        </p>
        <p class="text-gray-600 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m4 0h-1v4m-6-4v4h1m4-8h1m-1-4h-4m4 0v1m-4-1v1m0 4h4m4 4h1m-1-4h-4m0 4h4M4 12h1m-1 4h1m-1-8h1m0-4h4m-4 4h4M2 12h1m-1 4h1m-1-8h1" />
            </svg>
            <strong>Salary:</strong> ${job.salary}
        </p>
        <p class="inline-block px-3 py-1 text-sm font-medium text-white rounded-full bg-green-600">
            ${job.type}
        </p>
        <button class="w-full px-4 py-2 mt-4 text-lg font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            onclick="window.location.href='job-details.html?id=${job.id}'">
            <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m0 0H5m4 0h10m-5 0v10m0-10V2" />
            </svg>
            View Details
        </button>
    </div>
`).join('');
