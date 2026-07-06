// Custom Cursor
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');
let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

// Only enable custom cursor on non-touch devices
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Move dot immediately
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth outline following
    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects for interactive elements
    const hoverElements = document.querySelectorAll('a, button, .skill-card, .stat-card, .tech-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('active'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('active'));
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Fade-in animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    document.getElementById('scrollProgress').style.width = progress + '%';
    
    // Back to top button visibility
    const backToTop = document.getElementById('backToTop');
    if (scrollTop > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Back to top click
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Typing Effect for Hero - cycles through words
const typingWords = ['code', 'design', 'conversations'];
const typingText = document.querySelector('.typing-text');
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = typingWords[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
        typeSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeEffect, typeSpeed);
}

setTimeout(typeEffect, 500);

// Mouse Glow Effect on Cards
document.querySelectorAll('.skill-card, .stat-card, .tech-item').forEach(card => {
    card.classList.add('glow-card');
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Dynamic days alive counter
const birthDate = new Date('2026-07-06');
const today = new Date();
const diffTime = Math.abs(today - birthDate);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
document.getElementById('days-alive').textContent = `Day ${diffDays}`;
