/**
 * SpendNote - GitHub Pages 交互脚本
 * 轻松记账，智慧生活
 */

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 平滑滚动
  initSmoothScroll();

  // 导航栏滚动效果
  initNavbarScroll();

  // 元素滚动动画
  initScrollAnimation();

  // 移动端导航菜单
  initMobileNav();
});

/**
 * 平滑滚动到锚点
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // 移动端点击链接后关闭菜单
        closeMobileNav();
      }
    });
  });
}

/**
 * 导航栏滚动效果
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
}

/**
 * 移动端导航菜单
 */
function initMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  if (!navToggle || !navLinks) return;

  // 切换菜单
  navToggle.addEventListener('click', function() {
    const isActive = navLinks.classList.contains('active');

    if (isActive) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  // 点击遮罩关闭菜单
  if (navOverlay) {
    navOverlay.addEventListener('click', function() {
      closeMobileNav();
    });
  }

  // ESC 键关闭菜单
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      closeMobileNav();
    }
  });

  // 窗口大小变化时重置菜单状态
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      closeMobileNav();
    }
  });
}

/**
 * 打开移动端导航菜单
 */
function openMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  navToggle.classList.add('active');
  navLinks.classList.add('active');
  if (navOverlay) {
    navOverlay.style.display = 'block';
    // 触发重绘后添加 active 类以实现淡入
    requestAnimationFrame(function() {
      navOverlay.classList.add('active');
    });
  }
  document.body.style.overflow = 'hidden';
}

/**
 * 关闭移动端导航菜单
 */
function closeMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  navToggle.classList.remove('active');
  navLinks.classList.remove('active');
  if (navOverlay) {
    navOverlay.classList.remove('active');
    setTimeout(function() {
      navOverlay.style.display = 'none';
    }, 300);
  }
  document.body.style.overflow = '';
}

/**
 * 元素滚动动画
 */
function initScrollAnimation() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 观察需要动画的元素
  const animateElements = document.querySelectorAll('.feature-card, .screenshot-card');
  animateElements.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

/**
 * 添加动画类
 */
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

/**
 * 控制台输出
 */
console.log('%c SpendNote - 轻松记账，智慧生活', 'color: #10b981; font-size: 20px; font-weight: bold;');
