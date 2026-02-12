/**
 * Portfolio - Main JavaScript
 * Handles: sticky nav, mobile menu, smooth scroll, testimonials carousel,
 * form validation, scroll reveal, skill bar animation
 */

(function () {
  'use strict';

  // ---------- DOM Elements ----------
  const header = document.getElementById('header');
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav__link');
  const contactForm = document.getElementById('contact-form');
  const testimonialTrack = document.getElementById('testimonial-track');
  const testimonialPrev = document.getElementById('testimonial-prev');
  const testimonialNext = document.getElementById('testimonial-next');
  const testimonialDotsContainer = document.getElementById('testimonial-dots');
  const currentYearEl = document.getElementById('current-year');

  // ---------- Sticky header on scroll ----------
  function updateHeaderOnScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
  updateHeaderOnScroll();

  // ---------- Mobile hamburger menu ----------
  function toggleMenu() {
    navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-active');
    document.body.style.overflow = navMenu.classList.contains('is-open') ? 'hidden' : '';
  }

  function closeMenu() {
    navMenu.classList.remove('is-open');
    navToggle.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ---------- Testimonials carousel ----------
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const totalSlides = testimonialCards.length;
  let currentSlide = 0;

  function buildDots() {
    if (!testimonialDotsContainer || totalSlides <= 1) return;
    testimonialDotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'testimonials__dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      dot.addEventListener('click', function () {
        goToSlide(i);
      });
      testimonialDotsContainer.appendChild(dot);
    }
  }

  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    if (testimonialTrack) {
      const offset = -currentSlide * 100;
      testimonialTrack.style.transform = 'translateX(' + offset + '%)';
    }
    document.querySelectorAll('.testimonials__dot').forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === currentSlide);
    });
  }

  if (testimonialPrev) {
    testimonialPrev.addEventListener('click', function () {
      goToSlide(currentSlide - 1);
    });
  }
  if (testimonialNext) {
    testimonialNext.addEventListener('click', function () {
      goToSlide(currentSlide + 1);
    });
  }

  buildDots();

  // ---------- Contact form validation ----------
  function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    if (input) input.classList.add('error');
    if (errorEl) errorEl.textContent = message;
  }

  function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    if (input) input.classList.remove('error');
    if (errorEl) errorEl.textContent = '';
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateForm() {
    let valid = true;
    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const message = document.getElementById('contact-message');

    clearError('contact-name', 'error-name');
    clearError('contact-email', 'error-email');
    clearError('contact-message', 'error-message');

    if (!name || !name.value.trim()) {
      showError('contact-name', 'error-name', 'Please enter your name.');
      valid = false;
    }

    if (!email || !email.value.trim()) {
      showError('contact-email', 'error-email', 'Please enter your email.');
      valid = false;
    } else if (!validateEmail(email.value.trim())) {
      showError('contact-email', 'error-email', 'Please enter a valid email address.');
      valid = false;
    }

    if (!message || !message.value.trim()) {
      showError('contact-message', 'error-message', 'Please enter a message.');
      valid = false;
    }

    return valid;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm()) {
        // In production: send form data to server
        alert('Thank you! Your message has been sent. (This is a demo – form is not connected to a backend.)');
        contactForm.reset();
        clearError('contact-name', 'error-name');
        clearError('contact-email', 'error-email');
        clearError('contact-message', 'error-message');
      }
    });

    // Clear errors on input
    ['contact-name', 'contact-email', 'contact-message'].forEach(function (id) {
      const el = document.getElementById(id);
      const errorId = 'error-' + id.replace('contact-', '');
      if (el) {
        el.addEventListener('input', function () {
          clearError(id, errorId);
        });
      }
    });
  }

  // ---------- Scroll reveal animation ----------
  const revealElements = document.querySelectorAll(
    '.about__content, .about__visual, .timeline__item, .exp-card, .skills__group, ' +
    '.project-card, .testimonial-card, .service-card, .cert-card, .contact__info, .contact-form'
  );

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    revealElements.forEach(function (el) {
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight - revealPoint) {
        el.classList.add('revealed');
      }
    });

    // Animate skill bars when in view
    const skillFills = document.querySelectorAll('.skill-bar__fill');
    skillFills.forEach(function (fill) {
      const top = fill.getBoundingClientRect().top;
      if (top < windowHeight - 100) {
        const level = fill.getAttribute('data-level') || '0';
        fill.style.setProperty('--level', level + '%');
        fill.classList.add('animated');
      }
    });
  }

  revealElements.forEach(function (el) {
    el.classList.add('reveal');
  });

  window.addEventListener('scroll', revealOnScroll, { passive: true });
  window.addEventListener('load', revealOnScroll);
  revealOnScroll();

  // ---------- Footer year ----------
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
})();
