// 导航栏切换
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // 点击链接后关闭菜单
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  // 滚动时导航栏样式变化
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(240, 246, 255, 0.95)';
    } else {
      navbar.style.background = 'rgba(240, 246, 255, 0.9)';
    }
  });

  // 平滑滚动
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

  // 图片懒加载
  const images = document.querySelectorAll('.phone-screenshot');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '1';
        img.style.transform = 'translateY(0)';
        observer.unobserve(img);
      }
    });
  }, { threshold: 0.1 });

  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'translateY(20px)';
    img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    imageObserver.observe(img);
  });

  // 手机框架动画
  const phones = document.querySelectorAll('.phone-frame');
  const phoneObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  phones.forEach(phone => {
    phone.style.opacity = '0';
    phone.style.transform = 'translateY(30px)';
    phone.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    phoneObserver.observe(phone);
  });

  // 步骤卡片动画
  const cards = document.querySelectorAll('.step-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
  });
});

// 控制台输出欢迎信息
console.log(`
%c 💰 开销随手记 SpendNote - 完整使用演示

%c 27 张手机截图，8 大章节详解全部功能
%c 感谢使用开销随手记

`, 'color: #3b82f6; font-size: 18px; font-weight: bold;', 'color: #64748b;', 'color: #94a3b8;');
