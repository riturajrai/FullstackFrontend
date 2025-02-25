document.getElementById("jobForm").addEventListener("submit", async (event) => {
    event.preventDefault();


    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.userId) {
        document.getElementById("postedBy").value = loggedInUser.userId;
    } else {
        console.error("⚠️ No logged-in user found!");
    }
    const formData = new FormData(event.target);
    const jsonObject = {};
    formData.forEach((value, key) => {
        jsonObject[key] = value;
    });

    console.log("🚀 Job Data Before Sending:", jsonObject);

    const token = localStorage.getItem("authToken");
 
    
    if (!token) {
        alert("Unauthorized! Please login first.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/jobs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(jsonObject),
        });

        // ✅ Debug Response Content
        const textResponse = await response.text();
        console.log("📢 Raw Server Response:", textResponse);

        try {
            const data = JSON.parse(textResponse); // Parse JSON manually
            console.log("📢 Parsed JSON Response:", data);

            if (response.ok) {
                alert("✅ Job Posted Successfully!");
                event.target.reset();
            } else {
                alert(`⚠️ Error: ${data.error}`);
            }
        } catch (jsonError) {
            console.error("❌ JSON Parse Error:", jsonError);
            alert("⚠️ Server did not return valid JSON. Check console for details.");
        }
    } catch (error) {
        console.error("❌ Error posting job:", error);
    }
});
