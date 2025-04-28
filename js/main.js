/**
 * Main JavaScript file for the lawyer portfolio website
 * Handles theme toggle, scroll effects, and general interactivity
 */

// DOM Elements
const body = document.body;
const header = document.getElementById('header');
const themeToggle = document.getElementById('themeToggle');
const backToTopButton = document.getElementById('backToTop');

// Theme Toggle Functionality
function initThemeToggle() {
  // Check if user has previously selected dark mode
  if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
  }

  // Toggle dark mode
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Save preference to local storage
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
  });
}

// Header Scroll Effect
function initHeaderScroll() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });
}

// Back to Top Button
function initBackToTop() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  });

  backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Active Navigation Link based on scroll position
function initScrollSpy() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

// Initialize all functions when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHeaderScroll();
  initBackToTop();
  initScrollSpy();
});