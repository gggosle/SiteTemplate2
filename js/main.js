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


//gets the button by ID from your HTML element
const themeBtn = document.getElementById("theme-btn");
//when you click that button
themeBtn.onclick = () => {
    //the default class "fa-moon" switches to "fa-sun" on toggle
    themeBtn.classList.toggle("fa-sun");
    //after the switch on toggle, if your button contains "fa-sun" class
    if (themeBtn.classList.contains("fa-sun")) {
        //onclicking themeBtn, the changeTheme styling will be applied to the body of your HTML
        document.body.classList.add("changeTheme");
    } else {
        // onclicking themeBtn, applied changeTheme styling will be removed
        document.body.classList.remove("changeTheme");
    }
}
