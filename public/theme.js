// Improved theme toggle, navbar, and dropdown logic

// Helper to set theme and update DOM/localStorage/icons
function setTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('color-theme', theme);

    themeToggleDarkIcon.classList.toggle('hidden', isDark);
    themeToggleLightIcon.classList.toggle('hidden', !isDark);
}

// Theme toggle logic
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const themeToggleBtn = document.getElementById('theme-toggle');

// Initialize theme icons based on current setting
(function initializeTheme() {
    let theme = localStorage.getItem('color-theme');
    if (!theme) {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    setTheme(theme);
})();

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
}

// Navbar collapse toggle (on DOMContentLoaded)
document.addEventListener("DOMContentLoaded", function () {
    // Navbar toggle
    const toggleBtn = document.querySelector('[data-collapse-toggle="navbar-default"]');
    const navbar = document.getElementById("navbar-default");
    if (toggleBtn && navbar) {
        toggleBtn.addEventListener("click", function () {
            navbar.classList.toggle("hidden");
            const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
            toggleBtn.setAttribute("aria-expanded", (!expanded).toString());
        });
    }

    // Dropdown menu toggle (single event delegation for better performance)
    const dropdownToggle = document.getElementById("dropdownNavbarLink");
    const dropdownMenu = document.getElementById("dropdownNavbar");

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener("click", function (e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle("hidden");
        });

        // Hide dropdown if clicking outside
        document.addEventListener("click", function (e) {
            if (!dropdownMenu.contains(e.target) && !dropdownToggle.contains(e.target)) {
                dropdownMenu.classList.add("hidden");
            }
        });
    }
});