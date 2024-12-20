// Apply typing effect to each page's header
window.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("pageHeader");
    if (header) {
        const text = header.textContent; 
        header.textContent = ""; 
        typeEffect(header, text); 
    }
});



