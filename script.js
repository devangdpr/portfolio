// =============================================
// BASE CANVAS - solid dark background
// =============================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

ctx.fillStyle = '#050510';
ctx.fillRect(0, 0, canvas.width, canvas.height);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 30, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 15, 30, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 1);
        } else {
            counter.innerText = target + '+';
        }
    });
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Trigger counter animation
            if (entry.target.classList.contains('stats')) {
                animateCounters();
            }
            
            // Trigger skill bar animation
            if (entry.target.classList.contains('skill-item')) {
                const progress = entry.target.querySelector('.skill-progress');
                const targetWidth = progress.getAttribute('data-progress');
                progress.style.width = targetWidth + '%';
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.about-content, .project-card, .skill-card, .stats').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Animate skill rings on scroll
const ringObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const circle = entry.target.querySelector('.ring-progress');
            if (circle) {
                const progress = parseFloat(circle.getAttribute('data-progress')) / 100;
                const circumference = 314;
                const offset = circumference - (progress * circumference);
                setTimeout(() => { circle.style.strokeDashoffset = offset; }, 200);
            }
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.5s ease ${i * 0.1}s`;
    ringObserver.observe(card);
});

// Timeline items - animate in with stagger on scroll
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-item').forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = `all 0.5s ease ${i * 0.12}s`;
    timelineObserver.observe(item);
});

// 3D Tilt Effect for Project Cards
const cards = document.querySelectorAll('[data-tilt]');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Contact form handled inline in index.html

// Mouse Follower + Cursor Trail
const mouseFollower = document.createElement('div');
mouseFollower.style.cssText = `
    position: fixed; width: 20px; height: 20px; border-radius: 50%;
    background: rgba(102, 126, 234, 0.5); pointer-events: none;
    z-index: 9999; transition: transform 0.2s ease; display: none;
`;
document.body.appendChild(mouseFollower);

document.addEventListener('mousemove', (e) => {
    mouseFollower.style.display = 'block';
    mouseFollower.style.left = e.clientX - 10 + 'px';
    mouseFollower.style.top = e.clientY - 10 + 'px';
});

document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => { mouseFollower.style.transform = 'scale(2)'; });
    el.addEventListener('mouseleave', () => { mouseFollower.style.transform = 'scale(1)'; });
});

// Parallax Effect on Scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.hero-content').forEach(el => {
        el.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Cursor trail effect

function animateTrail() {
    let x = mouseX;
    let y = mouseY;
    
    trail.forEach((dot, index) => {
        dot.style.display = 'block';
        dot.style.left = x - 2.5 + 'px';
        dot.style.top = y - 2.5 + 'px';
        
        const nextDot = trail[index + 1] || trail[0];
        x += (parseFloat(nextDot.style.left) - x) * 0.3;
        y += (parseFloat(nextDot.style.top) - y) * 0.3;
    });
    
    requestAnimationFrame(animateTrail);
}

animateTrail();

// Timeline animation
document.querySelectorAll('.timeline-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.15}s`;
    observer.observe(item);
});

// Override observer to also handle timeline items
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-item').forEach(item => timelineObserver.observe(item));

// Multi-text typewriter
const roles = [
  'CS Student @ JECRC University',
  'Intern @ ISRO LEOS 🚀',
  'Full-Stack Developer',
  'Android Developer'
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typeEl = document.querySelector('.typewriter');
if (typeEl) {
  typeEl.style.borderRight = '3px solid #667eea';
  typeEl.style.animation = 'none';
  typeEl.style.whiteSpace = 'nowrap';
  typeEl.style.overflow = 'hidden';
  typeEl.style.width = 'auto';
  function typeLoop() {
    const current = roles[roleIndex];
    if (isDeleting) {
      typeEl.textContent = current.substring(0, charIndex--);
      if (charIndex < 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeLoop, 400); return; }
    } else {
      typeEl.textContent = current.substring(0, charIndex++);
      if (charIndex > current.length) { isDeleting = true; setTimeout(typeLoop, 1800); return; }
    }
    setTimeout(typeLoop, isDeleting ? 40 : 80);
  }
  typeLoop();
}

console.log('Portfolio loaded successfully! 🚀');
