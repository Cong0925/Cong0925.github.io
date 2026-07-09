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
      navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
      navbar.style.background = 'rgba(15, 23, 42, 0.85)';
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
});

// 复制代码功能
function copyCode() {
  const codeBlock = document.querySelector('.code-block code');
  if (codeBlock) {
    const code = codeBlock.textContent;
    navigator.clipboard.writeText(code).then(() => {
      const copyBtn = document.querySelector('.copy-btn');
      const originalText = copyBtn.textContent;
      copyBtn.textContent = '已复制!';
      copyBtn.style.background = 'var(--primary)';
      copyBtn.style.color = 'white';

      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '';
        copyBtn.style.color = '';
      }, 2000);
    }).catch(err => {
      console.error('复制失败:', err);
    });
  }
}

// 控制台输出欢迎信息
console.log(`
%c ⚡ Node.js MySQL Sequelize 代码生成器

%c 快速搭建 RESTful API
%c 开源项目，欢迎贡献

`, 'color: #10b981; font-size: 18px; font-weight: bold;', 'color: #94a3b8;', 'color: #64748b;');
