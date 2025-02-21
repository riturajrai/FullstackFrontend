// ✅ Show Error Message for Input Fields
export function showErrorMessage(inputId, message) {
    let existingMessage = document.querySelector('.centered-message');
    if (existingMessage) existingMessage.remove();

    const messageDiv = document.createElement('div');
    messageDiv.className = 'centered-message';
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// ✅ Clear Error Message
export function clearErrorMessage(inputId) {
    const errorElement = document.getElementById(`${inputId}-error`);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// ✅ Show Success Message (e.g., on button click)
export function showSuccessMessage(buttonId, message) {
    sessionStorage.setItem('successMessage', message); // 👈 Back ke liye message store karna
    let existingMessage = document.querySelector('.centered-message');
    if (existingMessage) existingMessage.remove();

    const messageDiv = document.createElement('div');
    messageDiv.className = 'centered-message success-message';
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
        sessionStorage.removeItem('successMessage'); // 👈 3 sec baad remove bhi kar dena
    }, 3000);
}

// ✅ Clear Success Message
export function clearSuccessMessage(buttonId) {
    const successElement = document.getElementById(`${buttonId}-success`);
    if (successElement) {
        successElement.textContent = '';
    }
}

// ✅ Check and show success message when user returns to the page
document.addEventListener('DOMContentLoaded', () => {
    const successMessage = sessionStorage.getItem('successMessage');
    if (successMessage) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'centered-message success-message';
        messageDiv.textContent = successMessage;
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.remove();
            sessionStorage.removeItem('successMessage');
        }, 3000);
    }
});
