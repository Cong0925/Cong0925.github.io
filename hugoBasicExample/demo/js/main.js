// Hugo 演示界面脚本 - 优雅编辑风格

document.addEventListener('DOMContentLoaded', function() {
    // 选项卡切换
    window.switchTab = function(event, tabId) {
        document.querySelectorAll('.tab-btn').forEach(function(btn) {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(function(content) {
            content.classList.remove('active');
        });

        event.target.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    };

    // 复制代码
    window.copyCode = function(btn) {
        var codeBlock = btn.closest('.code-block');
        var code = codeBlock.querySelector('code').textContent;

        navigator.clipboard.writeText(code).then(function() {
            var originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> 已复制';
            btn.style.color = '#D4AF37';
            btn.style.borderColor = '#D4AF37';

            setTimeout(function() {
                btn.innerHTML = originalText;
                btn.style.color = '';
                btn.style.borderColor = '';
            }, 2000);
        }).catch(function(err) {
            console.error('复制失败：', err);
        });
    };

    // 导航高亮
    var sections = document.querySelectorAll('.step-section');
    var navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        var current = '';

        sections.forEach(function(section) {
            var sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 120) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
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

    console.log('Hugo 基础示例演示界面加载完成');
});
