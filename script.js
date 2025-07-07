const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const yearSpan = document.getElementById('year');

function setTheme(mode) {
    body.classList.toggle('dark-mode', mode === 'dark');
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
}

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        const newMode = body.classList.contains('dark-mode') ? 'light' : 'dark';
        setTheme(newMode);
        localStorage.setItem('theme', newMode);
    });
}

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
