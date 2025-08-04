let heroSlideIndex = 1;
let slideInterval;

let productSlideIndex = 0;
let cardsToShow = 3;
const totalCards = 6;

function updateCardsToShow() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
        cardsToShow = 1.2;
    } else if (screenWidth <= 1024) {
        cardsToShow = 2;
    } else {
        cardsToShow = 3;
    }
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("nav-dot");

    if (n > slides.length) { heroSlideIndex = 1; }
    if (n < 1) { heroSlideIndex = slides.length; }

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[heroSlideIndex - 1].classList.add("active");
    dots[heroSlideIndex - 1].classList.add("active");
}

function currentSlide(n) {
    clearInterval(slideInterval);
    heroSlideIndex = n;
    showSlides(heroSlideIndex);
    startAutoSlide();
}

function nextSlide() {
    heroSlideIndex++;
    showSlides(heroSlideIndex);
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 4000);
}

function slideProducts(direction) {
    updateCardsToShow();
    const slider = document.getElementById('productsSlider');
    const indicators = document.querySelectorAll('.slider-indicators .indicator');

    if (!slider) return;

    const totalSlides = Math.max(1, totalCards - Math.floor(cardsToShow) + 1);

    productSlideIndex += direction;

    if (productSlideIndex >= totalSlides) {
        productSlideIndex = 0;
    } else if (productSlideIndex < 0) {
        productSlideIndex = totalSlides - 1;
    }

    const cardWidth = 100 / cardsToShow;
    const translateX = -productSlideIndex * cardWidth;
    slider.style.transform = `translateX(${translateX}%)`;

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === productSlideIndex);
    });
}

function goToSlide(slideIndex) {
    updateCardsToShow();
    const slider = document.getElementById('productsSlider');
    const indicators = document.querySelectorAll('.slider-indicators .indicator');

    if (!slider) return;

    productSlideIndex = slideIndex;

    const cardWidth = 100 / cardsToShow;
    const translateX = -productSlideIndex * cardWidth;
    slider.style.transform = `translateX(${translateX}%)`;

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === productSlideIndex);
    });
}

let productSlideInterval;

function startProductAutoSlide() {
    productSlideInterval = setInterval(() => {
        slideProducts(1);
    }, 4000);
}

function stopProductAutoSlide() {
    clearInterval(productSlideInterval);
}

window.addEventListener('resize', () => {
    updateCardsToShow();
    goToSlide(productSlideIndex);
});

window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const aboutUsBtn = document.querySelector('.contact-btn');
    if (aboutUsBtn) {
        aboutUsBtn.addEventListener('click', function () {
        window.location.href = 'about.html';
        });
    }

    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function () {
        window.location.href = 'contact.html';
        });
    }

    updateCardsToShow();
    showSlides(heroSlideIndex);
    startAutoSlide();

    const productSection = document.querySelector('.products-section');
    if (productSection) {
        goToSlide(0);
        startProductAutoSlide();

        productSection.addEventListener('mouseenter', stopProductAutoSlide);
        productSection.addEventListener('mouseleave', startProductAutoSlide);
    }

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    const sections = document.querySelectorAll('section');
        sections.forEach(section => {
        section.classList.add('fade-in-up');
        observer.observe(section);
    });

    const statItems = document.querySelectorAll('.stat-item');
    const serviceCards = document.querySelectorAll('.service-card');
    const featureItems = document.querySelectorAll('.feature-item');

    statItems.forEach((item, index) => {
        setTimeout(() => observer.observe(item), index * 100);
    });

    serviceCards.forEach((card, index) => {
        setTimeout(() => observer.observe(card), index * 150);
    });

    featureItems.forEach((item, index) => {
        setTimeout(() => observer.observe(item), index * 100);
    });
});

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-to-cart-btn') || e.target.closest('.add-to-cart-btn')) {
        const button = e.target.closest('.add-to-cart-btn');
        const originalText = button.innerHTML;

        button.innerHTML = '<i class="fas fa-check"></i> Added!';
        button.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
        button.disabled = true;

        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }
});

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('quick-view-btn') || e.target.closest('.quick-view-btn')) {
        const productCard = e.target.closest('.product-card');
        if (productCard) {
            const productName = productCard.querySelector('h3').textContent;
            alert(`Quick View: ${productName}\n\nThis would open a detailed product view modal in a real application.`);
        }
    }
});

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const numericTarget = parseInt(target.replace(/[^0-9]/g, ''));
        let current = 0;
        const increment = numericTarget / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                current = numericTarget;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
        }, 30);
    });
}

const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;

    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }

    const productsSection = document.querySelector('.products-section');
    if (productsSection) {
        const rate = scrolled * -0.1;
        productsSection.style.backgroundPosition = `center ${rate}px`;
    }
});

window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});
