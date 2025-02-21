document.addEventListener("DOMContentLoaded", () => {
    let user = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    if (user.profileImage) {
        document.getElementById("profileImage").src = user.profileImage;
    }

    document.getElementById("userName").value = user.name || "";
    document.getElementById("userEmail").value = user.email || "";
    document.getElementById("userAge").value = user.age || "";
    document.getElementById("userLocation").value = user.location || "";
    document.getElementById("userGroupLink").value = user.groupLink || "";
    document.getElementById("userDescription").value = user.description || "";

    document.getElementById("uploadPhoto").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById("profileImage").src = e.target.result;
                user.profileImage = e.target.result;
                localStorage.setItem("loggedInUser", JSON.stringify(user));
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById("saveProfile").addEventListener("click", () => {
        user.name = document.getElementById("userName").value;
        user.email = document.getElementById("userEmail").value;
        user.age = document.getElementById("userAge").value;
        user.location = document.getElementById("userLocation").value;
        user.groupLink = document.getElementById("userGroupLink").value;
        user.description = document.getElementById("userDescription").value;

        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Profile Updated Successfully!");

        setTimeout(() => {
            window.location.href = "profile-view.html";  // ✅ Redirect to Profile View
        }, 500);
    });
});
