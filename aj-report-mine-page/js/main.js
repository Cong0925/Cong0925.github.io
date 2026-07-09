/**
 * AJ-Report 数据大屏 — Dark Observatory Theme Script
 */

document.addEventListener('DOMContentLoaded', function () {

  // ── Mobile menu ──
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      navOverlay.classList.toggle('active');
    });
    if (navOverlay) {
      navOverlay.addEventListener('click', function () {
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
      });
    }
  }

  // ── Smooth scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navLinks) navLinks.classList.remove('active');
      }
    });
  });

  // ── Navbar scroll effect ──
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // ── Scroll reveal (IntersectionObserver) ──
  const revealElements = document.querySelectorAll(
    '.feature-card, .screenshot-card, .arch-card, .step, .section-header, .step-connector, .download-actions'
  );
  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger by sibling index
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let idx = 0;
        siblings.forEach((s, j) => { if (s === entry.target) idx = j; });
        entry.target.style.transitionDelay = (idx * 0.08) + 's';
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Hero particles ──
  const particleContainer = document.getElementById('heroParticles');
  if (particleContainer) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'hero-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDuration = (Math.random() * 12 + 8) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      p.style.width = p.style.height = (Math.random() * 2 + 1) + 'px';
      p.style.opacity = Math.random() * 0.5 + 0.2;
      particleContainer.appendChild(p);
    }
  }

  // ── Screen mockup: live clock ──
  const screenTime = document.getElementById('screenTime');
  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    if (screenTime) screenTime.textContent = h + ':' + m + ':' + s;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // ── Screen mockup: simulated data updates ──
  const mockup = document.querySelector('.screen-mockup');
  if (mockup) {
    // Animate bar heights
    setInterval(() => {
      mockup.querySelectorAll('.bar').forEach(bar => {
        bar.style.height = (Math.random() * 50 + 30) + '%';
      });
    }, 3000);

    // Animate KPI values
    const kpiRevenue = document.getElementById('kpiRevenue');
    const kpiOrders = document.getElementById('kpiOrders');
    const kpiUsers = document.getElementById('kpiUsers');

    setInterval(() => {
      if (kpiRevenue) kpiRevenue.textContent = '¥ ' + (Math.floor(Math.random() * 80000) + 80000).toLocaleString();
      if (kpiOrders) kpiOrders.textContent = (Math.floor(Math.random() * 2000) + 2000).toLocaleString();
      if (kpiUsers) kpiUsers.textContent = (Math.floor(Math.random() * 10000) + 12000).toLocaleString();
    }, 4000);

    // Animate table data
    const dataEast = document.getElementById('dataEast');
    const dataNorth = document.getElementById('dataNorth');
    const dataSouth = document.getElementById('dataSouth');

    setInterval(() => {
      if (dataEast) dataEast.textContent = '¥ ' + (Math.floor(Math.random() * 50000) + 100000).toLocaleString();
      if (dataNorth) dataNorth.textContent = '¥ ' + (Math.floor(Math.random() * 40000) + 80000).toLocaleString();
      if (dataSouth) dataSouth.textContent = '¥ ' + (Math.floor(Math.random() * 40000) + 90000).toLocaleString();
    }, 5000);
  }

  // ── Feature card tilt on hover ──
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -3;
      const rotateY = (x - centerX) / centerX * 3;
      this.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ── Console branding ──
  console.log(
    '%c📊 AJ-Report 数据大屏 %c— Dark Observatory Theme',
    'color: #00f0ff; font-size: 18px; font-weight: bold;',
    'color: #64748b; font-size: 12px;'
  );
});
