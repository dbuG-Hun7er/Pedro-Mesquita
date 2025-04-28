/**
 * Navigation functionality for the lawyer portfolio website
 * Handles mobile menu toggle and smooth scrolling
 */

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Toggle Mobile Menu
function initMobileMenu() {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Prevent body scrolling when menu is open
    document.body.classList.toggle('menu-open');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('active') && 
      !navLinks.contains(e.target) && 
      !menuToggle.contains(e.target)
    ) {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });

  // Close menu when window is resized to desktop size
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
}

// Smooth Scrolling for Navigation Links
function initSmoothScroll() {
  navLinksItems.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
      
      // Get target section
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Calculate header height for offset
        const headerHeight = document.getElementById('header').offsetHeight;
        
        // Scroll to section with offset for fixed header
        window.scrollTo({
          top: targetSection.offsetTop - headerHeight,
          behavior: 'smooth'
        });
        
        // Update URL without page reload
        history.pushState(null, null, targetId);
      }
    });
  });
}

// Initialize navigation functions when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSmoothScroll();
});