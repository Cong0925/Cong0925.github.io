/**
 * AJ-Report 数据大屏 - 项目展示页面脚本
 */

document.addEventListener('DOMContentLoaded', function() {
  // 移动端菜单切换
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      navOverlay.classList.toggle('active');
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', function() {
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
      });
    }
  }

  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // 关闭移动菜单
        if (navLinks) {
          navLinks.classList.remove('active');
        }
      }
    });
  });

  // 滚动时导航栏效果
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // 元素进入视口动画
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // 观察需要动画的元素
  document.querySelectorAll('.feature-card, .screenshot-card, .arch-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // 大屏模型动画
  const screenMockup = document.querySelector('.screen-mockup');
  if (screenMockup) {
    // 模拟数据更新
    setInterval(() => {
      const bars = screenMockup.querySelectorAll('.bar');
      bars.forEach(bar => {
        const newHeight = Math.random() * 50 + 30;
        bar.style.height = newHeight + '%';
      });
    }, 3000);

    // 模拟实时数据
    const dataValues = screenMockup.querySelectorAll('.data-value');
    setInterval(() => {
      dataValues.forEach(value => {
        const baseValue = Math.floor(Math.random() * 100000) + 50000;
        value.textContent = '¥ ' + baseValue.toLocaleString();
      });
    }, 5000);
  }

  // 特性卡片悬停效果
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.15)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '';
    });
  });

  // 截图卡片悬停效果
  document.querySelectorAll('.screenshot-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      const preview = this.querySelector('.screenshot-preview');
      if (preview) {
        preview.style.background = 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)';
        preview.style.transform = 'scale(1.02)';
      }
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      const preview = this.querySelector('.screenshot-preview');
      if (preview) {
        preview.style.transform = 'scale(1)';
      }
    });
  });

  // 按钮点击效果
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mousedown', function() {
      this.style.transform = 'scale(0.98)';
    });

    btn.addEventListener('mouseup', function() {
      this.style.transform = 'scale(1)';
    });

    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // 控制台输出
  console.log(`
    %c📊 AJ-Report 数据大屏
    %c项目展示页面已加载

    技术栈：Java + Vue + MySQL
    仓库地址：https://github.com/Cong0925/aj-report-mine

    Made with ❤️ by Cong0925
  `,
    'color: #3b82f6; font-size: 20px; font-weight: bold;',
    'color: #6b7280; font-size: 12px;'
  );
});
