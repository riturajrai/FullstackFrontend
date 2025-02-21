document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOM Loaded: Checking login status...");

    const mainContainer = document.getElementById("main-container");

    if (!mainContainer) {
        console.warn("⚠️ #main-container not found.");
        return;
    }

    const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    console.log("🔹 isLoggedIn:", isLoggedIn);
    console.log("🔹 loggedInUser:", loggedInUser);

    if (isLoggedIn && loggedInUser && loggedInUser.userId) {
        console.log(`👋 Welcome back, ${loggedInUser.email}!`);

        mainContainer.innerHTML = `
            <div class="dashboard fade-in bg-white shadow-lg rounded-xl p-8 max-w-lg w-full mx-auto mt-10 text-center border border-gray-300">
                <h1 class="text-3xl font-bold text-gray-900 mb-4">📊 Employers Dashboard</h1>
                <p class="text-gray-600 mb-6">🚀 Welcome, <span class="font-semibold">${loggedInUser.name || 'User'}</span>!</p>
                
                <button id="logout-btn" class="w-full px-6 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition-all transform hover:scale-105">
                    🚪 Log Out
                </button>
            </div>
        `;

        // 🚪 Logout functionality
        document.getElementById("logout-btn")?.addEventListener("click", () => {
            localStorage.clear();
            alert("✅ Logout successful!");
            window.location.href = "./login.html";
        });

    } else {
        console.warn("⚠️ User not logged in or invalid user data.");
        mainContainer.innerHTML = `
            <div class="login-warning fade-in bg-yellow-50 text-center shadow-md rounded-lg p-6 max-w-md w-full mx-auto mt-10 border border-yellow-300">
                <h2 class="text-2xl font-bold text-yellow-800 mb-2">⚠️ Access Denied!</h2>
                <p class="text-gray-700">You must log in to access the dashboard.</p>
                <a href="./login.html" class="inline-block mt-4 px-5 py-3 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition-all transform hover:scale-105">
                    🔑 Login here
                </a>
            </div>
        `;
    }
});
