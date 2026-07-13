// Hugo 基础示例主页脚本 - 优雅编辑风格

document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 导航栏滚动效果
    var navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 元素入场动画（Intersection Observer）
    var animateElements = document.querySelectorAll('.animate-in');
    var observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    };

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(function(el) {
        observer.observe(el);
    });

    // 技术栈项目悬停效果
    var techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            this.style.borderColor = '#D4AF37';
        });
        item.addEventListener('mouseleave', function() {
            this.style.borderColor = '';
        });
    });

    console.log('Hugo 基础示例主页加载完成');
});
