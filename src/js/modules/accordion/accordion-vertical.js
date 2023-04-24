const tabs = document.querySelectorAll(".tab");

// Functions
const toggleTab = (event) => {
    event.currentTarget.classList.toggle("active");
};

// Event Listeners
tabs.forEach((tab) => {
    tab.addEventListener("click", toggleTab);
});
