/**
 * AJ-Report 部署指南 — Dark Observatory Theme Script
 */

document.addEventListener('DOMContentLoaded', function () {

  // ── FAQ toggle ──
  window.toggleFaq = function (el) {
    const item = el.closest('.faq-item');
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
  };

  // ── Code copy ──
  window.copyCode = function (btn) {
    const block = btn.closest('.code-block');
    const code = block.querySelector('code').textContent;
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = '已复制 ✓';
      btn.style.background = 'rgba(16, 185, 129, 0.2)';
      btn.style.color = '#10b981';
      btn.style.borderColor = 'rgba(16, 185, 129, 0.3)';
      setTimeout(() => {
        btn.textContent = '复制';
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 2000);
    }).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = code;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      btn.textContent = '已复制 ✓';
      setTimeout(() => btn.textContent = '复制', 2000);
    });
  };

  // ── Scroll-reveal ──
  const reveals = document.querySelectorAll('.section, .content-card, .step-item, .faq-item, .link-card, .deploy-section');
  reveals.forEach(el => el.classList.add('reveal'));

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  reveals.forEach(el => revealObs.observe(el));

  // ── Sidebar scroll-spy ──
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-item');

  function throttle(fn, ms) {
    let last = 0;
    return function () {
      const now = Date.now();
      if (now - last >= ms) { last = now; fn(); }
    };
  }

  function updateActiveNav() {
    let current = '';
    const pos = window.scrollY + 100;
    sections.forEach(s => {
      if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight) {
        current = s.getAttribute('id');
      }
    });
    navItems.forEach(item => {
      item.classList.toggle('active', item.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', throttle(updateActiveNav, 80), { passive: true });
  updateActiveNav();

  // ── Smooth scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
      }
    });
  });

  // ── Click-to-copy on code blocks ──
  document.querySelectorAll('.code-content').forEach(block => {
    block.style.cursor = 'pointer';
    block.title = '点击复制代码';
    block.addEventListener('click', function () {
      const code = this.querySelector('code');
      if (!code) return;
      navigator.clipboard.writeText(code.textContent).then(() => {
        showToast('代码已复制到剪贴板');
      });
    });
  });

  function showToast(msg) {
    const t = document.createElement('div');
    t.textContent = msg;
    Object.assign(t.style, {
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%) translateY(12px)',
      background: '#1e293b',
      color: '#f1f5f9',
      padding: '10px 22px',
      borderRadius: '10px',
      fontSize: '0.85rem',
      border: '1px solid rgba(0,240,255,0.15)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      opacity: '0',
      transition: 'all 0.3s',
      zIndex: '9999',
    });
    document.body.appendChild(t);
    requestAnimationFrame(() => {
      t.style.opacity = '1';
      t.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateX(-50%) translateY(12px)';
      setTimeout(() => t.remove(), 300);
    }, 2000);
  }

  // ── Console branding ──
  console.log(
    '%c📊 AJ-Report 部署指南 %c— Dark Observatory Theme',
    'color: #00f0ff; font-size: 16px; font-weight: bold;',
    'color: #64748b; font-size: 12px;'
  );
});
