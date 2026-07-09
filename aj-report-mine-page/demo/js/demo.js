/**
 * AJ-Report 安装部署指南脚本
 */

document.addEventListener('DOMContentLoaded', function() {
  // FAQ 折叠功能
  window.toggleFaq = function(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');

    // 关闭所有 FAQ
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
    });

    // 如果当前不是激活状态，则展开
    if (!isActive) {
      faqItem.classList.add('active');
    }
  };

  // 代码复制功能
  window.copyCode = function(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code').textContent;

    navigator.clipboard.writeText(code).then(() => {
      const originalText = button.textContent;
      button.textContent = '已复制 ✓';
      button.style.background = 'rgba(16, 185, 129, 0.3)';
      button.style.color = '#10b981';

      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.style.color = '';
      }, 2000);
    }).catch(err => {
      console.error('复制失败:', err);
      // 降级方案
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      const originalText = button.textContent;
      button.textContent = '已复制 ✓';
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    });
  };

  // 侧边导航高亮
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-item');

  function updateActiveNav() {
    let currentSection = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === '#' + currentSection) {
        item.classList.add('active');
      }
    });
  }

  // 节流函数
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  window.addEventListener('scroll', throttle(updateActiveNav, 100));

  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // 步骤动画
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.step-item').forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'translateX(-20px)';
    step.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(step);
  });

  // 卡片悬停效果
  document.querySelectorAll('.content-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.08)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.boxShadow = '';
    });
  });

  // 链接卡片悬停效果
  document.querySelectorAll('.link-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // 文件树展开效果
  document.querySelectorAll('.tree-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.background = 'rgba(59, 130, 246, 0.05)';
    });

    item.addEventListener('mouseleave', function() {
      this.style.background = '';
    });
  });

  // 代码块点击复制
  document.querySelectorAll('.code-content').forEach(block => {
    block.style.cursor = 'pointer';
    block.title = '点击复制代码';

    block.addEventListener('click', function() {
      const code = this.querySelector('code');
      if (code) {
        const text = code.textContent;
        navigator.clipboard.writeText(text).then(() => {
          // 显示复制成功提示
          const toast = document.createElement('div');
          toast.className = 'copy-toast';
          toast.textContent = '代码已复制到剪贴板';
          document.body.appendChild(toast);

          setTimeout(() => {
            toast.classList.add('show');
          }, 10);

          setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
          }, 2000);
        });
      }
    });
  });

  // 添加复制提示样式
  const style = document.createElement('style');
  style.textContent = `
    .copy-toast {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: #1e293b;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 0.9rem;
      opacity: 0;
      transition: all 0.3s ease;
      z-index: 1000;
    }
    .copy-toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  `;
  document.head.appendChild(style);

  // 控制台输出
  console.log(`
    %c📊 AJ-Report 安装部署指南
    %c页面已加载

    包含内容:
    - 资源获取（下载链接）
    - 环境准备（JDK/Maven/MySQL/Node.js）
    - 数据库配置
    - 部署方式（整体打包/前后端分离）
    - 常见问题

    Made with ❤️ by Cong0925
  `,
    'color: #3b82f6; font-size: 16px; font-weight: bold;',
    'color: #6b7280; font-size: 12px;'
  );
});
