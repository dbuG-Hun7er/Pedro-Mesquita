/**
 * Animations for the lawyer portfolio website
 * Handles scroll animations, reveal effects, and interactive elements
 */

// Reveal elements on scroll
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.section-header, .about-content, .service-card, .timeline-item, .expertise-item, .contact-content');
  
  // Observer options
  const options = {
    root: null, // viewport
    threshold: 0.1, // 10% of element visible
    rootMargin: '0px 0px -50px 0px'
  };
  
  // Create intersection observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        // Stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  // Add initial class and observe elements
  revealElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// Animate timeline items with staggered effect
function initTimelineAnimation() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  // Add staggered animation delay to timeline items
  timelineItems.forEach((item, index) => {
    const delay = index * 0.2; // 200ms between each item
    item.style.transitionDelay = `${delay}s`;
  });
}

// Service cards hover animation
function initServiceCardAnimation() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.querySelector('.service-icon').classList.add('bounce');
    });
    
    card.addEventListener('mouseleave', function() {
      this.querySelector('.service-icon').classList.remove('bounce');
    });
  });
}

// Add CSS for animations
function addAnimationStyles() {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    /* Reveal Animation Base */
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .reveal-visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Staggered animations for service cards */
    .service-card {
      transition: transform 0.3s ease, border-bottom-color 0.3s ease;
    }
    
    /* Bounce animation for icons */
    .bounce {
      animation: bounce 0.5s ease;
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    /* Fade in animation for timeline */
    .timeline-item {
      opacity: 0;
      transform: translateX(-30px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .timeline-item:nth-child(even) {
      transform: translateX(30px);
    }
    
    .timeline-item.reveal-visible {
      opacity: 1;
      transform: translateX(0);
    }
    
    /* Hero content animation */
    .hero-content {
      animation: fadeInUp 1s ease;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Expertise item hover effect */
    .expertise-item {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .expertise-item:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    /* Prevent animation on page load for users who prefer reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .reveal, .timeline-item, .hero-content {
        transition: none;
        animation: none;
      }
    }
  `;
  
  document.head.appendChild(styleSheet);
}

// Initialize all animation functions when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  addAnimationStyles();
  initScrollReveal();
  initTimelineAnimation();
  initServiceCardAnimation();
});