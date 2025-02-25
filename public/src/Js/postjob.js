document.addEventListener("DOMContentLoaded", () => {
    const jobForm = document.getElementById("jobForm");

    jobForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the form from reloading the page

        const token = localStorage.getItem("token");  // Get the token from localStorage
        if (!token) {
            alert("⚠️ You need to log in first!");
            window.location.href = '/login.html';  // Redirect to login page
            return;
        }

        const jobTitle = document.getElementById("jobTitle").value;
        const companyName = document.getElementById("companyName").value;
        const location = document.getElementById("location").value;
        const category = document.getElementById("category").value;
        const salary = document.getElementById("salary").value;
        const description = document.getElementById("description").value;
        const fileUpload = document.getElementById("fileUpload").files[0];

        const formData = new FormData();
        formData.append("jobTitle", jobTitle);
        formData.append("companyName", companyName);
        formData.append("location", location);
        formData.append("category", category);
        formData.append("salary", salary);
        formData.append("description", description);
        if (fileUpload) {
            formData.append("fileUpload", fileUpload);
        }

        try {
            const response = await fetch("https://jobportalapi-0gfs.onrender.com/api/jobs", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,  // Send the token for authorization
                },
                body: formData,  // Send the form data including the file
            });

            const result = await response.json();
            if (response.ok) {
                alert("✔️ Job posted successfully!");
                jobForm.reset();  // Reset form after successful submission
            } else {
                alert(`❌ Error: ${result.error}`);
            }
        } catch (error) {
            console.error("🚨 Error posting job:", error);
            alert("⚠️ Failed to post the job.");
        }
    });
});
