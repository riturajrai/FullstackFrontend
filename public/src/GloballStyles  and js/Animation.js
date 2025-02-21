// 🌟 Scroll Animation Trigger on Up & Down
document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in, .fade-left, .fade-right, .fade-scale");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible"); // 🌟 Element visible hote hi animation chalega
            } else {
                entry.target.classList.remove("visible"); // 🌟 Scroll up karne par animation reset hoga
            }
        });
    }, { threshold: 0.3 }); // 30% element dikhai de toh trigger hoga

    fadeElements.forEach(element => observer.observe(element));
});
