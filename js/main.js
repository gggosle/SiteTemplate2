document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.header__menu');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('burger--active');
            nav.classList.toggle('header__menu--open');
        });
    }
});


const themeBtn = document.getElementById("theme-btn");
themeBtn.onclick = () => {
    themeBtn.classList.toggle("fa-sun");
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
}
