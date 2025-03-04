document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("theme-toggle");
    const darkIcon = document.getElementById("theme-toggle-dark-icon");
    const lightIcon = document.getElementById("theme-toggle-light-icon");
  
    function updateTheme() {
      if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark");
        darkIcon.classList.add("hidden");
        lightIcon.classList.remove("hidden");
      } else {
        document.documentElement.classList.remove("dark");
        darkIcon.classList.remove("hidden");
        lightIcon.classList.add("hidden");
      }
    }
  
    toggleButton.addEventListener("click", function () {
      if (document.documentElement.classList.contains("dark")) {
        localStorage.setItem("theme", "light");
      } else {
        localStorage.setItem("theme", "dark");
      }
      updateTheme();
    });
  
    updateTheme();
  });
  