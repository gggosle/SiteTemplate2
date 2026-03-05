document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.header__menu');
    const grid = document.querySelector('.projects__grid');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    const themeBtn = document.getElementById("theme-btn");
    const backToTopBtn = document.getElementById("back-to-top");

    let isSliderAnimating = false;
    let autoScrollTimer;

    function openMenu() {
        burger.classList.toggle('burger--active');
        nav.classList.toggle('header__menu--open');
    }

    function startAutoScroll() {
        autoScrollTimer = setInterval(() => {
            slideToTheLeft();
        }, 5000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollTimer);
    }

    function resetAutoScroll() {
        stopAutoScroll();
        startAutoScroll();
    }

    function slideToTheRight() {
        if (isSliderAnimating) return;
        isSliderAnimating = true;

        const moveDistance = getMoveDistance();
        const centerClone = grid.children[2].cloneNode(true);

        grid.prepend(centerClone);
        grid.style.transition = 'none';
        grid.style.transform = `translateX(-${moveDistance}px)`;
        grid.lastElementChild.remove();
        grid.offsetHeight;
        grid.style.transition = 'transform 0.4s ease-in-out';
        grid.style.transform = 'translateX(0)';

        grid.addEventListener('transitionend', function cleanupWrapper() {
            grid.removeEventListener('transitionend', cleanupWrapper);
            handlePrev();
        });
    }

    function handlePrev() {
        grid.removeEventListener('transitionend', handlePrev);
        isSliderAnimating = false;
        resetAutoScroll();
    }

    function slideToTheLeft() {
        if (isSliderAnimating) return;
        isSliderAnimating = true;

        const moveDistance = getMoveDistance();
        const centerClone = grid.children[1].cloneNode(true);

        grid.style.transition = 'transform 0.4s ease-in-out';
        grid.style.transform = `translateX(-${moveDistance}px)`;

        grid.addEventListener('transitionend', function cleanupWrapper() {
            grid.removeEventListener('transitionend', cleanupWrapper);
            handleNext(centerClone);
        });
    }

    function handleNext(elementToAdd) {
        grid.appendChild(elementToAdd);
        grid.firstElementChild.remove();
        grid.style.transition = 'none';
        grid.style.transform = 'translateX(0)';
        isSliderAnimating = false;
        resetAutoScroll();
    }

    function getMoveDistance() {
        const cardWidth = grid.children[0].offsetWidth;
        const gap = parseFloat(window.getComputedStyle(grid).gap) || 0;
        return cardWidth + gap;
    }

    function changeTheme() {
        themeBtn.classList.toggle("fa-sun");
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
    }

    function handleScroll() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('back-to-top--show');
        } else {
            backToTopBtn.classList.remove('back-to-top--show');
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    burger.addEventListener('click', openMenu);

    nextBtn.addEventListener('click', slideToTheLeft);

    prevBtn.addEventListener('click', slideToTheRight);

    themeBtn.addEventListener('click', changeTheme);

    window.addEventListener('scroll', handleScroll);

    backToTopBtn.addEventListener('click', scrollToTop);

    startAutoScroll();
});



