// 项目数据
const projects = [
    {
        id: 1,
        name: 'write-helper',
        title: 'Write Helper',
        description: '一款为创作者打造的桌面写作软件，主打自主写作与本地留档，AI 轻度辅助创作。重量级宠物模块支持领养专属像素宠物，陪伴你的每一次创作。',
        status: 'completed',
        statusText: '已完成',
        tags: ['桌面软件', '自主写作', '像素宠物', '本地留档'],
        icon: 'fas fa-pen-fancy',
        // 项目按钮配置
        repo: '',  // 私有仓库，不公开
        repoPrivate: true,  // 标记为私有仓库
        homepage: '../write-helper/',  // 项目页面
        demo: '',  // 演示，暂未制作
    },
    {
        id: 2,
        name: 'SpendNote',
        title: 'Spend Note',
        description: '智能记账笔记应用，帮助你轻松管理个人财务，追踪支出，分析消费习惯。',
        status: 'completed',
        statusText: '已完成',
        tags: ['记账', '财务工具', '个人管理'],
        icon: 'fas fa-wallet',
        // 项目按钮配置
        repo: 'https://github.com/Cong0925/SpendNote',  // 开源仓库
        homepage: '../spend-note/',  // 项目页面
        demo: '',  // 演示，暂未制作
    },
    {
        id: 3,
        name: 'nodejs_mysql_Sequelize',
        title: 'Node.js MySQL Sequelize 代码生成器',
        description: '使用 Vue3 前端以及 Node + WebSocket 自动生成 Node.js + MySQL + Sequelize 的后端接口项目，快速搭建 RESTful API。',
        status: 'completed',
        statusText: '已完成',
        tags: ['代码生成', 'Node.js', 'MySQL', 'Vue3'],
        icon: 'fas fa-code',
        // 项目按钮配置
        repo: 'https://github.com/Cong0925/nodejs_mysql_Sequelize',  // 开源仓库
        homepage: '../nodejs-mysql-sequelize/',  // 项目页面
        demo: '',  // 演示，暂未制作
    }
    // 后续添加新项目在这里
];

// DOM元素
const projectsGrid = document.getElementById('projectsGrid');
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');

// 当前搜索状态
let currentSearch = '';

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    initEventListeners();
    initGitalk();
});

// 渲染项目
function renderProjects() {
    const filteredProjects = filterProjects();
    projectsGrid.innerHTML = '';

    // 更新项目数量
    const projectCountEl = document.getElementById('projectCount');
    if (projectCountEl) {
        projectCountEl.textContent = projects.length;
    }

    if (filteredProjects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>未找到匹配的项目</h3>
                <p>试试其他关键词</p>
            </div>
        `;
        return;
    }

    filteredProjects.forEach((project, index) => {
        const card = createProjectCard(project, index);
        projectsGrid.appendChild(card);
    });
}

// 创建项目卡片
function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${index * 0.1}s`;

    const statusClass = `status-${project.status}`;

    // 生成按钮HTML - 三个按钮都显示
    let buttonsHtml = '';

    // 项目地址按钮
    if (project.repoPrivate) {
        buttonsHtml += `<button class="card-btn btn-repo btn-private" onclick="showPrivateNotice()"><i class="fas fa-lock"></i> 项目地址</button>`;
    } else if (project.repo) {
        buttonsHtml += `<a href="${project.repo}" target="_blank" class="card-btn btn-repo"><i class="fab fa-github"></i> 项目地址</a>`;
    } else {
        buttonsHtml += `<span class="card-btn btn-repo disabled"><i class="fas fa-lock"></i> 未开源</span>`;
    }

    // 网址首页按钮
    if (project.homepage) {
        buttonsHtml += `<a href="${project.homepage}" target="_blank" class="card-btn btn-homepage"><i class="fas fa-globe"></i> 网址首页</a>`;
    } else {
        buttonsHtml += `<span class="card-btn btn-homepage disabled"><i class="fas fa-globe"></i> 网址首页</span>`;
    }

    // 演示按钮
    if (project.demo) {
        buttonsHtml += `<a href="${project.demo}" target="_blank" class="card-btn btn-demo"><i class="fas fa-desktop"></i> 演示</a>`;
    } else {
        buttonsHtml += `<span class="card-btn btn-demo disabled"><i class="fas fa-desktop"></i> 演示</span>`;
    }

    card.innerHTML = `
        <div class="project-header">
            <h3 class="project-title">
                <i class="${project.icon}"></i>
                ${project.title}
            </h3>
            <span class="project-status ${statusClass}">${project.statusText}</span>
        </div>
        <p class="project-description">${project.description}</p>
        <div class="project-tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="project-buttons">
            ${buttonsHtml}
        </div>
    `;

    return card;
}

// 筛选项目
function filterProjects() {
    return projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
                            project.description.toLowerCase().includes(currentSearch.toLowerCase()) ||
                            project.tags.some(tag => tag.toLowerCase().includes(currentSearch.toLowerCase()));
        return matchesSearch;
    });
}

// 初始化事件监听
function initEventListeners() {
    // 搜索功能
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        clearSearch.style.display = currentSearch ? 'block' : 'none';
        renderProjects();
    });

    // 清除搜索
    clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        currentSearch = '';
        clearSearch.style.display = 'none';
        renderProjects();
    });

    // 点赞按钮：未登录时自动触发登录流程
    document.addEventListener('click', (e) => {
        const likeBtn = e.target.closest('.gt-comment-like, .gt-btn-like, [class*="like"]');
        if (!likeBtn) return;

        // 检查是否已登录（Gitalk 登录后会移除登录按钮）
        const loginBtn = document.querySelector('#gitalk-container .gt-btn-login');
        if (loginBtn) {
            e.preventDefault();
            e.stopPropagation();
            const gitalk = document.getElementById('gitalk-container').gitalk;
            if (gitalk && typeof gitalk.login === 'function') {
                gitalk.login();
            }
        }
    }, true);

    // 添加项目卡片悬停效果
    document.addEventListener('mouseover', (e) => {
        const card = e.target.closest('.project-card');
        if (card) {
            card.style.transform = 'translateY(-6px)';
            card.style.boxShadow = '0 16px 40px rgba(37, 99, 235, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04)';
            card.style.background = 'rgba(255, 255, 255, 0.72)';
            card.style.borderColor = 'rgba(37, 99, 235, 0.3)';
        }
    });

    document.addEventListener('mouseout', (e) => {
        const card = e.target.closest('.project-card');
        if (card) {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.04)';
            card.style.background = 'rgba(255, 255, 255, 0.5)';
            card.style.borderColor = 'rgba(255, 255, 255, 0.6)';
        }
    });

    // 移动端触摸支持
    let activeCard = null;

    document.addEventListener('touchstart', (e) => {
        const card = e.target.closest('.project-card');
        if (card) {
            // 移除其他卡片的激活状态
            if (activeCard && activeCard !== card) {
                activeCard.style.transform = 'translateY(0)';
                activeCard.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.04)';
                activeCard.style.background = 'rgba(255, 255, 255, 0.5)';
                activeCard.style.borderColor = 'rgba(255, 255, 255, 0.6)';
            }
            // 激活当前卡片
            card.style.transform = 'translateY(-4px)';
            card.style.boxShadow = '0 12px 32px rgba(37, 99, 235, 0.1)';
            card.style.background = 'rgba(255, 255, 255, 0.65)';
            card.style.borderColor = 'rgba(37, 99, 235, 0.25)';
            activeCard = card;
        }
    }, { passive: true });

    document.addEventListener('touchend', () => {
        if (activeCard) {
            setTimeout(() => {
                activeCard.style.transform = 'translateY(0)';
                activeCard.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.04)';
                activeCard.style.background = 'rgba(255, 255, 255, 0.5)';
                activeCard.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                activeCard = null;
            }, 150);
        }
    }, { passive: true });
}

// 初始化Gitalk留言系统
function initGitalk() {
    // Gitalk配置
    // 注意：你需要创建一个GitHub OAuth App来获取Client ID
    // 1. 访问 https://github.com/settings/developers
    // 2. 点击 "New OAuth App"
    // 3. 填写应用信息
    // 4. 获取 Client ID 和 Client Secret

    const gitalkConfig = {
        clientID: 'Ov23liOexhleMGPD9to6',
        clientSecret: 'e9750c6504d42a31f94247b96c65522504ea7393',
        repo: 'Cong0925.github.io',
        owner: 'Cong0925',
        admin: ['Cong0925'],
        id: location.pathname,
        distractionFreeMode: false,
        language: 'zh-CN',
        labels: ['留言'],
        perPage: 20,
        pagerDirection: 'last',
        createIssueManually: false,
        proxy: 'https://cong0925.2207156200.workers.dev', // Cloudflare Worker CORS代理
        flipMovementUp: false
    };

    // 检查配置是否已设置
    if (gitalkConfig.clientID === 'YOUR_CLIENT_ID') {
        console.warn('请配置Gitalk的Client ID和Client Secret');
        document.getElementById('gitalk-container').innerHTML = `
            <div style="text-align: center; padding: 40px; color: #475569;">
                <i class="fas fa-comments" style="font-size: 3rem; margin-bottom: 20px; color: #4a90e2;"></i>
                <h3>留言功能配置中</h3>
                <p>请配置GitHub OAuth App以启用留言功能</p>
            </div>
        `;
        return;
    }

    try {
        const gitalk = new Gitalk(gitalkConfig);
        gitalk.render('gitalk-container');
    } catch (error) {
        console.error('Gitalk初始化失败:', error);
        document.getElementById('gitalk-container').innerHTML = `
            <div style="text-align: center; padding: 40px; color: #475569;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 20px; color: #f59e0b;"></i>
                <h3>留言功能暂时不可用</h3>
                <p>请稍后再试或联系管理员</p>
            </div>
        `;
    }
}

// 添加新项目的函数（供未来使用）
function addProject(project) {
    projects.push(project);
    renderProjects();
}

// 项目数据导出（供未来使用）
function exportProjects() {
    return JSON.stringify(projects, null, 2);
}

// 项目数据导入（供未来使用）
function importProjects(jsonString) {
    try {
        const newProjects = JSON.parse(jsonString);
        projects.push(...newProjects);
        renderProjects();
        return true;
    } catch (error) {
        console.error('导入失败:', error);
        return false;
    }
}

// 私有仓库提示
function showPrivateNotice() {
    // 移除已有toast
    const old = document.querySelector('.toast-notice');
    if (old) old.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notice';
    toast.innerHTML = '<i class="fas fa-lock"></i> 该仓库为私有仓库，如需源码请联系作者';
    document.body.appendChild(toast);

    // 触发动画
    requestAnimationFrame(() => toast.classList.add('toast-show'));

    // 3秒后消失
    setTimeout(() => {
        toast.classList.remove('toast-show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 平滑滚动到顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 添加滚动事件监听
window.addEventListener('scroll', () => {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    }
});

// 控制台输出欢迎信息
console.log(`
%c Welcome to Cong0925's Project Hub! 🚀

%c 项目导航首页已加载
%c 如需添加新项目，请编辑 js/main.js 中的 projects 数组

`, 'color: #667eea; font-size: 20px; font-weight: bold;', 'color: #a0aec0;', 'color: #718096;');

// ========== 粒子系统 ==========
(function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const PARTICLE_COUNT = 40;
    const particles = [];

    // 粒子颜色调色板 - 与背景光球协调
    const colors = [
        'rgba(37, 99, 235, 0.35)',   // primary blue
        'rgba(14, 165, 233, 0.3)',    // accent cyan
        'rgba(139, 92, 246, 0.25)',   // purple
        'rgba(59, 130, 246, 0.3)',    // lighter blue
        'rgba(6, 182, 212, 0.25)',    // teal
    ];

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 80,
            radius: Math.random() * 2.2 + 0.6,
            speedY: -(Math.random() * 0.35 + 0.1),
            speedX: (Math.random() - 0.5) * 0.2,
            opacity: Math.random() * 0.5 + 0.2,
            color: colors[Math.floor(Math.random() * colors.length)],
            wobbleSpeed: Math.random() * 0.01 + 0.005,
            wobbleAmplitude: Math.random() * 25 + 10,
            wobbleOffset: Math.random() * Math.PI * 2,
            age: 0,
        };
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = createParticle();
        p.y = Math.random() * canvas.height; // 初始随机分布
        p.age = Math.random() * 200;
        particles.push(p);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const p of particles) {
            p.age++;
            p.y += p.speedY;
            p.x += p.speedX + Math.sin(p.age * p.wobbleSpeed + p.wobbleOffset) * 0.3;

            // 超出屏幕则重置到底部
            if (p.y < -20) {
                Object.assign(p, createParticle());
            }

            // 渐入渐出
            let alpha = p.opacity;
            if (p.age < 60) {
                alpha *= p.age / 60;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha})`);
            ctx.fill();
        }

        requestAnimationFrame(animate);
    }
    animate();
})();

// ========== 鼠标跟随光晕 ==========
(function initMouseGlow() {
    const glow = document.querySelector('.mouse-glow');
    if (!glow) return;

    let mouseX = -500, mouseY = -500;
    let glowX = -500, glowY = -500;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
        glow.classList.remove('active');
    });

    function updateGlow() {
        // 平滑插值跟随
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(updateGlow);
    }
    updateGlow();
})();
