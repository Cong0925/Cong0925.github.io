/**
 * Vue3 管理系统 - 深色科技风交互脚本
 * 性能优化版：使用 Intersection Observer + 最小化 DOM 操作
 */

document.addEventListener('DOMContentLoaded', function () {
    // ═══════════════════════════════════════════
    // 导航栏滚动效果
    // ═══════════════════════════════════════════
    const navbar = document.querySelector('.navbar');
    let lastScrollY = 0;

    function handleNavbarScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // ═══════════════════════════════════════════
    // 平滑滚动
    // ═══════════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ═══════════════════════════════════════════
    // 功能卡片滚动动画（Intersection Observer）
    // ═══════════════════════════════════════════
    const featureCards = document.querySelectorAll('.feature-card');

    if ('IntersectionObserver' in window) {
        const cardObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * 100);
                        cardObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        featureCards.forEach(card => {
            cardObserver.observe(card);
        });
    } else {
        // 降级方案：直接显示
        featureCards.forEach(card => {
            card.classList.add('visible');
        });
    }

    // ═══════════════════════════════════════════
    // 代码复制功能
    // ═══════════════════════════════════════════
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const code = this.getAttribute('data-code');
            if (!code) return;

            navigator.clipboard.writeText(code).then(() => {
                const icon = this.querySelector('i');
                this.classList.add('copied');
                icon.classList.remove('fa-copy');
                icon.classList.add('fa-check');

                setTimeout(() => {
                    this.classList.remove('copied');
                    icon.classList.remove('fa-check');
                    icon.classList.add('fa-copy');
                }, 2000);
            }).catch(() => {
                // 降级方案：使用传统方法
                const textarea = document.createElement('textarea');
                textarea.value = code;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand('copy');
                    const icon = this.querySelector('i');
                    this.classList.add('copied');
                    icon.classList.remove('fa-copy');
                    icon.classList.add('fa-check');
                    setTimeout(() => {
                        this.classList.remove('copied');
                        icon.classList.remove('fa-check');
                        icon.classList.add('fa-copy');
                    }, 2000);
                } catch (err) {
                    console.error('复制失败:', err);
                }
                document.body.removeChild(textarea);
            });
        });
    });

    // ═══════════════════════════════════════════
    // 技术栈项目悬停效果
    // ═══════════════════════════════════════════
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            const logo = this.querySelector('.tech-logo');
            if (logo) {
                logo.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });

        item.addEventListener('mouseleave', function () {
            const logo = this.querySelector('.tech-logo');
            if (logo) {
                logo.style.transform = '';
            }
        });
    });

    // ═══════════════════════════════════════════
    // 初始化完成
    // ═══════════════════════════════════════════
    console.log('Vue3 管理系统主页加载完成');
});
