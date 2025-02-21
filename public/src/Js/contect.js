// Import functions
import { showErrorMessage, clearErrorMessage, showSuccessMessage } from '../Js/errorHandler.js';

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("jobForm1");
    if (!form) {
        console.error("Form with ID 'jobForm1' not found!");
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name")?.value.trim();
        let email = document.getElementById("email")?.value.trim();
        let phone = document.getElementById("phone")?.value.trim();
        let position = document.getElementById("position")?.value.trim();
        let message = document.getElementById("message")?.value.trim();

        // Check for empty fields
        if (!name || !email || !phone || !position || !message) {
            showErrorMessage('form', "⚠ Please fill in all fields.");
            return;
        }

        // Validate email format
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            showErrorMessage('email', "⚠ Please enter a valid email address.");
            return;
        }

        // Validate phone number (10 digits)
        if (!/^\d{10}$/.test(phone)) {
            showErrorMessage('phone', "⚠ Please enter a valid 10-digit phone number.");
            return;
        }

        // If everything is valid
        console.log("✅ Form Data:", { name, email, phone, position, message });

        showSuccessMessage('form', "🎉 Application submitted successfully!");
        form.reset(); // Clear the form after successful submission
    });
});
