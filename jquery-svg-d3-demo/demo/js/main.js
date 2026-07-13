// jQuery SVG D3 Demo 演示页面脚本

document.addEventListener('DOMContentLoaded', function() {
    initMethodTabs();
    initCodeCopy();
    initSidebar();
    initSidebarNav();
    console.log('jQuery SVG D3 Demo 演示页面已加载');
});

/**
 * 初始化启动方式选项卡切换
 */
function initMethodTabs() {
    var tabs = document.querySelectorAll('.method-tab');
    var contents = document.querySelectorAll('.method-content');

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            var method = this.getAttribute('data-method');

            tabs.forEach(function(t) {
                t.classList.remove('active');
            });
            contents.forEach(function(c) {
                c.classList.remove('active');
            });

            this.classList.add('active');
            var target = document.getElementById('method-' + method);
            if (target) {
                target.classList.add('active');
            }
        });
    });
}

/**
 * 初始化代码复制按钮
 */
function initCodeCopy() {
    var copyButtons = document.querySelectorAll('.code-copy');

    copyButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var code = this.getAttribute('data-code');
            if (!code) {
                var codeBlock = this.closest('.code-block');
                var codeElement = codeBlock.querySelector('code');
                code = codeElement ? codeElement.textContent : '';
            }

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(code).then(function() {
                    showCopySuccess(btn);
                }).catch(function() {
                    fallbackCopy(code, btn);
                });
            } else {
                fallbackCopy(code, btn);
            }
        });
    });
}

/**
 * 降级复制方案
 */
function fallbackCopy(text, btn) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showCopySuccess(btn);
    } catch (err) {
        console.error('复制失败', err);
    }
    document.body.removeChild(textarea);
}

/**
 * 显示复制成功状态
 */
function showCopySuccess(btn) {
    var originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> 已复制';
    btn.classList.add('copied');

    setTimeout(function() {
        btn.innerHTML = originalHTML;
        btn.classList.remove('copied');
    }, 2000);
}

/**
 * 初始化侧边栏切换
 */
function initSidebar() {
    var toggle = document.getElementById('sidebarToggle');
    var sidebar = document.getElementById('sidebar');
    var close = document.getElementById('sidebarClose');

    if (!toggle || !sidebar) return;

    // 创建遮罩层
    var overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    toggle.addEventListener('click', openSidebar);
    if (close) {
        close.addEventListener('click', closeSidebar);
    }
    overlay.addEventListener('click', closeSidebar);
}

/**
 * 初始化侧边栏导航高亮
 */
function initSidebarNav() {
    var navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    var sections = [];

    navLinks.forEach(function(link) {
        var href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            var section = document.getElementById(href.substring(1));
            if (section) {
                sections.push({ el: section, link: link });
            }
        }
    });

    if (sections.length === 0) return;

    function updateActiveLink() {
        var scrollPos = window.scrollY + 100;
        var activeSection = null;

        for (var i = sections.length - 1; i >= 0; i--) {
            if (sections[i].el.offsetTop <= scrollPos) {
                activeSection = sections[i];
                break;
            }
        }

        navLinks.forEach(function(link) {
            link.classList.remove('active');
        });

        if (activeSection) {
            activeSection.link.classList.add('active');
        }
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}
