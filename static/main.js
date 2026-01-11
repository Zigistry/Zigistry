function setTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('color-theme', theme);
    document.getElementById('theme-toggle-dark-icon').classList.toggle('hidden', theme === 'dark');
    document.getElementById('theme-toggle-light-icon').classList.toggle('hidden', theme !== 'dark');
}

const savedTheme = localStorage.getItem('color-theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

document.getElementById('theme-toggle')?.addEventListener('click', () => {
    setTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark');
});

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector('[data-collapse-toggle="navbar-default"]');
    const navbar = document.getElementById("navbar-default");
    toggleBtn?.addEventListener("click", () => {
        navbar.classList.toggle("hidden");
        toggleBtn.setAttribute("aria-expanded", !navbar.classList.contains("hidden"));
    });

    const dropdownToggle = document.getElementById("dropdownNavbarLink");
    const dropdownMenu = document.getElementById("dropdownNavbar");
    dropdownToggle?.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle("hidden");
    });
    document.addEventListener("click", (e) => {
        if (!dropdownMenu?.contains(e.target) && e.target !== dropdownToggle) {
            dropdownMenu?.classList.add("hidden");
        }
    });

    fetch("https://api.github.com/repos/zigistry/zigistry")
        .then(res => res.json())
        .then(json => document.getElementById("star_count").innerHTML = json.stargazers_count);
});