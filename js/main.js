"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.header__menu');
    const grid = document.querySelector('.projects__grid');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    const themeBtn = document.getElementById("theme-btn");
    const backToTopBtn = document.getElementById("back-to-top");
    const navLinks = document.querySelectorAll('.header__nav-link');
    const contactBtn = document.getElementById("contact-btn");
    const contactModal = document.getElementById("contact-modal");
    const modalClose = document.querySelector(".modal__close");
    const sliderTransition = 'transform 0.4s ease-in-out';
    const savedTheme = localStorage.getItem("theme");

    let isSliderAnimating = false;
    let autoScrollTimer;
    let isDragging = false;
    let startX;
    let currentTranslate = 0;

    function toggleMenu() {
        burger.classList.toggle('burger--active');
        nav.classList.toggle('header__menu--open');
    }

    function startSliderAutoScroll() {
        autoScrollTimer = setInterval(() => {
            slideToTheLeft();
        }, 5000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollTimer);
    }

    function resetAutoScroll() {
        stopAutoScroll();
        startSliderAutoScroll();
    }

    function slideToTheRight() {
        if (isSliderAnimating) return;
        isSliderAnimating = true;

        const moveDistance = getMoveDistance();
        const centerClone = grid.children[2].cloneNode(true);

        grid.prepend(centerClone);
        grid.style.transition = 'none';
        grid.style.transform = `translateX(${- moveDistance + currentTranslate}px)`;
        grid.lastElementChild.remove();
        grid.offsetHeight;
        grid.style.transition = sliderTransition;
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

        grid.style.transition = sliderTransition;
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
        localStorage.setItem("theme", newTheme);
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

    function handleNavLinkClick(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            if (nav.classList.contains('header__menu--open')) {
                toggleMenu();
            }

            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    function openModal() {
        contactModal.classList.add('modal--open');
    }

    function closeModal() {
        contactModal.classList.remove('modal--open');
    }

    function handleModalClick(e) {
        if (e.target === contactModal) {
            closeModal();
        }
    }

    function handleDragStart(e) {
        if (isSliderAnimating) return;
        stopAutoScroll();
        isDragging = true;
        startX = (e.type === 'touchstart') ? e.touches[0].clientX : e.clientX;
        grid.style.transition = 'none';
    }

    function handleDragMove(e) {
        if (!isDragging) return;
        const x = (e.type === 'touchmove') ? e.touches[0].clientX : e.clientX;
        currentTranslate = x - startX;
        grid.style.transform = `translateX(${currentTranslate}px)`;
    }

    function handleDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        const moveDistance = getMoveDistance();

        if (currentTranslate < -moveDistance / 2) {
            slideToTheLeft();
        } else if (currentTranslate > moveDistance / 2) {
            slideToTheRight();
        } else {
            grid.style.transition = 'transform 0.3s ease-out';
            grid.style.transform = 'translateX(0)';
            resetAutoScroll();
        }
        currentTranslate = 0;
    }

    burger.addEventListener('click', toggleMenu);
    nextBtn.addEventListener('click', slideToTheLeft);
    prevBtn.addEventListener('click', slideToTheRight);

    grid.addEventListener('mousedown', handleDragStart);
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);

    grid.addEventListener('touchstart', handleDragStart, { passive: true });
    window.addEventListener('touchmove', handleDragMove, { passive: true });
    window.addEventListener('touchend', handleDragEnd);

    themeBtn.addEventListener('click', changeTheme);
    window.addEventListener('scroll', handleScroll);

    backToTopBtn.addEventListener('click', scrollToTop);
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });
    contactBtn.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    contactModal.addEventListener('click', handleModalClick);
    
    startSliderAutoScroll();
    if (savedTheme === "dark") {
        changeTheme();
    }
});



