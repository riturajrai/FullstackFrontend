document.addEventListener('DOMContentLoaded', async () => {
    const appliedJobsContainer = document.getElementById('appliedJobsContainer');
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const token = localStorage.getItem('authToken'); // ✅ Correct token retrieval

    // Ensure user and token are present
    if (!user || !user.userId || !token) {
        appliedJobsContainer.innerHTML = '<p>❌ User not logged in or no token found.</p>';
        return;
    }

    const userId = user.userId;
    console.log("🚀 Fetching Applied Jobs for User ID:", userId);
    console.log("🔹 Token Used:", token);  // ✅ Debugging Token

    try {
        const response = await fetch(`https://fullstackjobportal.onrender.com/api/applied-jobs/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const appliedJobs = await response.json();
        console.log("✅ API Response:", appliedJobs);

        if (!Array.isArray(appliedJobs) || appliedJobs.length === 0) {
            appliedJobsContainer.innerHTML = '<p>No applied jobs found.</p>';
            return;
        }

        const jobsList = appliedJobs.map(job => `
            <div class="applied-job-card">
                <h3>${job.jobTitle}</h3>
                <p><strong>Company:</strong> ${job.companyName}</p>
                <p><strong>Location:</strong> ${job.location}</p>
            </div>
        `).join('');

        appliedJobsContainer.innerHTML = jobsList;

    } catch (error) {
        console.error('❌ Error:', error);
        appliedJobsContainer.innerHTML = `<p>❌ ${error.message}</p>`;
    }
});

// ✅ Handle Login Process
async function handleLogin(event) {
    event.preventDefault(); // Prevent form reload

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log("✅ Login Response:", data); // Debugging

        if (response.ok && data.user && data.token) {
            localStorage.setItem("loggedInUser", JSON.stringify(data.user));
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("userLoggedIn", "true");  // ✅ Important Fix

            console.log("🔹 Stored User:", localStorage.getItem("loggedInUser"));
            console.log("🔹 Token:", localStorage.getItem("authToken"));

            window.location.href = "./index.html";  
        } else {
            document.getElementById("errorMessage").innerText = `❌ Login failed: ${data.message || 'Unknown error'}`;
        }
    } catch (error) {
        console.error("❌ Login Error:", error);
        document.getElementById("errorMessage").innerText = "⚠️ Something went wrong!";
    }
}
// ✅ Attach Event Listener to the Login Form
document.getElementById("loginForm").addEventListener("submit", handleLogin); 

