// Signup JS
import { showErrorMessage, showSuccessMessage } from './errorHandler.js';

document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const API_BASE_URL = "http://localhost:5000/api/users/signup";

    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        // 🛠️ Input Validation
        if (name.length < 3) {
            showErrorMessage('jobSearchMessage', '⚠️ Full name must be at least 3 characters.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showErrorMessage('jobSearchMessage', '⚠️ Please enter a valid email address.');
            return;
        }
        if (!/^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/.test(password)) {
            showErrorMessage('jobSearchMessage', '⚠️ Password must be at least 6 characters long and contain both letters and numbers.');
            return;
        }
        const userData = { name, email, password };
        console.log(userData); 
        try {
            const response = await fetch(API_BASE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (response.ok) {
                showSuccessMessage('jobSearchMessage', '✅ Signup successful! Redirecting to login...');
                window.location.href = "login.html";
            } else {
                showErrorMessage('jobSearchMessage', `🛑 Error: ${result.error || "Signup failed. Please try again."}`);
            }
        } catch (error) {
            console.error("❌ Signup Error:", error);
            showErrorMessage('jobSearchMessage', '🚨 Network error! Please check your connection.');
        }
    });
});