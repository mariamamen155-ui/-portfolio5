/* =============================================
   Mariam Amen — Flutter Developer Portfolio
   Premium Interactions
   ============================================= */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // 1. CUSTOM CURSOR
  // =============================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const cursorGlow = document.getElementById('cursorGlow');

  if (cursorDot && cursorRing && cursorGlow) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function smoothCursor() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      glowX += (mouseX - glowX) * 0.05;
      glowY += (mouseY - glowY) * 0.05;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(smoothCursor);
    }
    smoothCursor();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .btn-primary, .btn-outline, .social-link, .project-card, .service-card, .contact-card');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
      cursorGlow.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
      cursorGlow.style.opacity = '1';
    });
  }

  // =============================================
  // 2. SCROLL PROGRESS BAR
  // =============================================
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = progress + '%';
    });
  }

  // =============================================
  // 3. NAVBAR SCROLL EFFECT
  // =============================================
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
    // Check initial state
    if (window.scrollY > 60) navbar.classList.add('scrolled');
  }

  // =============================================
  // 4. NAVBAR ACTIVE LINK HIGHLIGHT
  // =============================================
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section[id]');

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 200;
      const bottom = top + section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  // =============================================
  // 5. MOBILE NAV TOGGLE
  // =============================================
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navLinks');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navList.classList.toggle('open');
    });

    // Close nav on link click
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navList.classList.remove('open');
      });
    });
  }

  // =============================================
  // 6. THEME TOGGLE
  // =============================================
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    }

    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const newTheme = isLight ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // =============================================
  // 7. TYPING ANIMATION
  // =============================================
  const typingEl = document.getElementById('typingText');
  if (typingEl) {
    const words = [
      'Flutter Developer',
      'Mobile Application Developer',
      'Software Engineer'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function typeEffect() {
      const currentWord = words[wordIndex];
      if (!isDeleting) {
        typingEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentWord.length) {
          isPaused = true;
          setTimeout(() => { isPaused = false; isDeleting = true; }, 2000);
        }
      } else {
        typingEl.textContent = currentWord.substring(0, charIndex);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      const delay = isDeleting ? 40 : 80;
      if (!isPaused) {
        setTimeout(typeEffect, delay);
      } else {
        setTimeout(typeEffect, 100);
      }
    }
    typeEffect();
  }

  // =============================================
  // 8. MAGNETIC BUTTONS
  // =============================================
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const strength = parseInt(btn.dataset.strength) || 15;
      btn.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // =============================================
  // 9. RIPPLE EFFECT
  // =============================================
  const rippleBtns = document.querySelectorAll('.btn-primary, .btn-outline, .btn-small, .btn-contact, .btn-download');
  rippleBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // =============================================
  // 10. COUNTER ANIMATION
  // =============================================
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target);
      const duration = 1500;
      const step = Math.max(1, Math.floor(target / 60));
      let current = 0;
      const updateCounter = () => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          return;
        }
        counter.textContent = current;
        requestAnimationFrame(updateCounter);
      };
      updateCounter();
    });
  }

  // =============================================
  // 11. SKILL BAR ANIMATION
  // =============================================
  const skillFills = document.querySelectorAll('.skill-fill');
  let skillsAnimated = false;

  function animateSkills() {
    if (skillsAnimated) return;
    skillsAnimated = true;
    skillFills.forEach(fill => {
      const width = parseInt(fill.dataset.width);
      setTimeout(() => {
        fill.style.width = width + '%';
      }, 200);
    });
  }

  // =============================================
  // 12. REVEAL ON SCROLL (IntersectionObserver)
  // =============================================
  const revealEls = document.querySelectorAll('.reveal');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealEls.forEach(el => revealObserver.observe(el));

  // =============================================
  // 13. INTERSECTION OBSERVER for counters & skills
  // =============================================
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        aboutObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const aboutSection = document.querySelector('.about-section');
  if (aboutSection) aboutObserver.observe(aboutSection);

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const skillsSection = document.querySelector('.skills-section');
  if (skillsSection) skillsObserver.observe(skillsSection);

  // =============================================
  // 14. CARD TILT EFFECT
  // =============================================
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // =============================================
  // 15. TESTIMONIAL CAROUSEL
  // =============================================
  const carouselTrack = document.getElementById('carouselTrack');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let carouselInterval;

  function goToSlide(index) {
    if (!carouselTrack) return;
    currentSlide = index;
    const slideWidth = carouselTrack.querySelector('.testimonial-card').offsetWidth;
    carouselTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  }

  function nextSlide() {
    const totalSlides = dots.length;
    goToSlide((currentSlide + 1) % totalSlides);
  }

  // Dot clicks
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetCarouselInterval();
    });
  });

  function startCarousel() {
    carouselInterval = setInterval(nextSlide, 4000);
  }

  function resetCarouselInterval() {
    clearInterval(carouselInterval);
    startCarousel();
  }

  if (carouselTrack && dots.length) {
    startCarousel();
    // Pause on hover
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
      carousel.addEventListener('mouseleave', startCarousel);
    }
  }

  // =============================================
  // 16. PARTICLE GRID BACKGROUND
  // =============================================
  const particleGrid = document.getElementById('particleGrid');
  if (particleGrid) {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
    particleGrid.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    function resizeCanvas() {
      const rect = particleGrid.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    function createParticles() {
      particles = [];
      const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 2 + 1,
          o: Math.random() * 0.4 + 0.1
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 140, 255, ${p.o})`;
        ctx.fill();

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(79, 140, 255, ${0.05 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(drawParticles);
    }

    function initParticles() {
      resizeCanvas();
      createParticles();
      if (animId) cancelAnimationFrame(animId);
      drawParticles();
    }

    initParticles();
    window.addEventListener('resize', initParticles);
  }

  // =============================================
  // 17. MOUSE PARALLAX SPOTLIGHT
  // =============================================
  const homeSection = document.getElementById('home');
  if (homeSection) {
    homeSection.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      const shapes = homeSection.querySelectorAll('.shape');
      shapes.forEach((shape, i) => {
        const speed = (i + 1) * 5;
        shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });

      const blobs = homeSection.querySelectorAll('.floating-blob');
      blobs.forEach((blob, i) => {
        const speed = (i + 1) * 8;
        blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });
  }

  // =============================================
  // 18. SMOOTH SCROLL for nav links
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // =============================================
  // 19. DOWNLOAD CV BUTTON
  // =============================================
  const downloadBtn = document.getElementById('downloadCV');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Placeholder — user can replace with actual CV file
      alert('CV download will be available soon. Replace this placeholder with your actual CV file.');
    });
  }

  // =============================================
  // 20. RESPONSIVE CAROUSEL FIX
  // =============================================
  window.addEventListener('resize', () => {
    if (carouselTrack && dots.length) {
      goToSlide(currentSlide);
    }
  });

  console.log('%c MARIAM AMEN ',
    'background: linear-gradient(135deg, #4F8CFF, #73B3FF); color: #fff; font-size: 1.2rem; font-weight: bold; padding: 8px 16px; border-radius: 4px;');
  console.log('%c Flutter Developer Portfolio ',
    'color: #73B3FF; font-size: 0.9rem;');
});
