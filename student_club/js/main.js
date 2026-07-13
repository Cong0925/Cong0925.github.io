/**
 * 社团管理系统 - 主脚本文件
 * 活力多彩风交互效果 v3.0
 */
(function () {
    'use strict';

    // 导航栏滚动效果
    function initNavbarScroll() {
        var navbar = document.getElementById('navbar');
        if (!navbar) return;

        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 移动端菜单按钮
    function initMobileMenu() {
        var menuBtn = document.getElementById('mobileMenuBtn');
        var sidebar = document.getElementById('sidebar');
        if (!menuBtn || !sidebar) return;

        menuBtn.addEventListener('click', function () {
            sidebar.classList.toggle('open');
        });

        // 点击菜单项后关闭侧边栏
        var navItems = sidebar.querySelectorAll('.nav-item');
        navItems.forEach(function (item) {
            item.addEventListener('click', function () {
                if (window.innerWidth <= 1024) {
                    sidebar.classList.remove('open');
                }
            });
        });

        // 点击主内容区域关闭侧边栏
        var mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.addEventListener('click', function () {
                if (window.innerWidth <= 1024 && sidebar.classList.contains('open')) {
                    sidebar.classList.remove('open');
                }
            });
        }
    }

    // 滚动动画（Intersection Observer）
    function initScrollAnimations() {
        var elements = document.querySelectorAll('.feature-card, .tech-item, .timeline-item, .member-card');

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
            rootMargin: '0px 0px -40px 0px'
        });

        elements.forEach(function (el, index) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.5s ease ' + (index % 3) * 0.1 + 's, transform 0.5s ease ' + (index % 3) * 0.1 + 's';
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

    // 侧边栏导航高亮（演示页面）
    function initSidebarNav() {
        var navItems = document.querySelectorAll('.sidebar-nav .nav-item');
        var sections = document.querySelectorAll('.section');

        if (!navItems.length || !sections.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.getAttribute('id');
                    navItems.forEach(function (item) {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === '#' + id) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -50% 0px'
        });

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    // FAQ 折叠切换
    window.toggleFaq = function (element) {
        var answer = element.nextElementSibling;
        if (!answer) return;

        var isOpen = answer.classList.contains('show');

        // 关闭所有 FAQ
        var allAnswers = document.querySelectorAll('.faq-answer');
        allAnswers.forEach(function (a) {
            a.classList.remove('show');
        });

        var allQuestions = document.querySelectorAll('.faq-question');
        allQuestions.forEach(function (q) {
            q.classList.remove('active');
        });

        // 如果当前是关闭状态，则打开
        if (!isOpen) {
            answer.classList.add('show');
            element.classList.add('active');
        }
    };

    // 初始化
    document.addEventListener('DOMContentLoaded', function () {
        initNavbarScroll();
        initMobileMenu();
        initScrollAnimations();
        initSmoothScroll();
        initSidebarNav();
        console.log('社团管理系统已加载');
    });
})();
