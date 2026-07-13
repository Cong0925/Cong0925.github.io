/**
 * 社团管理系统 - 演示界面脚本
 * 青春活力风格交互效果
 */
(function () {
    'use strict';

    // FAQ 折叠/展开
    window.toggleFaq = function (el) {
        var faqItem = el.parentElement;
        var isOpen = faqItem.classList.contains('open');

        // 关闭所有 FAQ
        var allItems = document.querySelectorAll('.faq-item');
        allItems.forEach(function (item) {
            item.classList.remove('open');
        });

        // 如果当前不是打开状态，则打开
        if (!isOpen) {
            faqItem.classList.add('open');
        }
    };

    // 侧边栏导航高亮
    function initSidebarNav() {
        var navItems = document.querySelectorAll('.sidebar-nav .nav-item');
        var sections = document.querySelectorAll('.section');

        if (!navItems.length || !sections.length) return;

        window.addEventListener('scroll', function () {
            var scrollPos = window.scrollY + 100;

            sections.forEach(function (section) {
                var top = section.offsetTop;
                var bottom = top + section.offsetHeight;

                if (scrollPos >= top && scrollPos < bottom) {
                    var id = section.getAttribute('id');
                    navItems.forEach(function (item) {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === '#' + id) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // 移动端菜单
    function initMobileMenu() {
        var menuBtn = document.getElementById('mobileMenuBtn');
        var sidebar = document.getElementById('sidebar');

        if (!menuBtn || !sidebar) return;

        // 创建遮罩层
        var overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);

        menuBtn.addEventListener('click', function () {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('show');
        });

        overlay.addEventListener('click', function () {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
        });

        // 点击导航项后关闭侧边栏（移动端）
        var navItems = sidebar.querySelectorAll('.nav-item');
        navItems.forEach(function (item) {
            item.addEventListener('click', function () {
                if (window.innerWidth <= 992) {
                    sidebar.classList.remove('open');
                    overlay.classList.remove('show');
                }
            });
        });
    }

    // 滚动进入动画
    function initScrollAnimations() {
        var elements = document.querySelectorAll('.step-card, .feature-detail-card, .faq-item, .config-block, .func-module-card');

        if (!elements.length) return;

        if (!('IntersectionObserver' in window)) {
            elements.forEach(function (el) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        elements.forEach(function (el, index) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(16px)';
            el.style.transition = 'opacity 0.4s ease ' + (index % 4) * 0.08 + 's, transform 0.4s ease ' + (index % 4) * 0.08 + 's';
            observer.observe(el);
        });
    }

    // 平滑滚动到锚点
    function initSmoothScroll() {
        var links = document.querySelectorAll('a[href^="#"]');
        links.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;
                var target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // 初始化
    document.addEventListener('DOMContentLoaded', function () {
        initSidebarNav();
        initMobileMenu();
        initScrollAnimations();
        initSmoothScroll();
        console.log('社团管理系统演示页面已加载');
    });
})();
