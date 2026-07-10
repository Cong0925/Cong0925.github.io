// 项目类型配置
const PROJECT_TYPES = {
    desktop: { name: '桌面软件', icon: 'fas fa-desktop' },
    miniprogram: { name: '小程序', icon: 'fab fa-weixin' },
    mobile: { name: '移动应用', icon: 'fas fa-mobile-alt' },
    web: { name: '网页应用', icon: 'fas fa-globe' },
    cli: { name: '终端工具', icon: 'fas fa-terminal' },
    library: { name: '开源库', icon: 'fas fa-book' },
    template: { name: '模版类', icon: 'fas fa-clone' },
    article: { name: '文章管理', icon: 'fas fa-newspaper' },
    other: { name: '其他', icon: 'fas fa-ellipsis-h' }
};

// 项目状态配置
const PROJECT_STATUS = {
    completed: { name: '已完成', class: 'status-completed' },
    development: { name: '进行中', class: 'status-development' },
    stopped: { name: '停工', class: 'status-stopped' },
    practice: { name: '练习项目', class: 'status-practice' }
};

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
        type: 'desktop',  // 项目类型
        // 项目按钮配置
        repo: '',  // 私有仓库，不公开
        repoPrivate: true,  // 标记为私有仓库
        homepage: '../write-helper/',  // 项目页面
        demo: '../write-helper/demo/',  // 使用演示
        lastUpdated: '2026-07-09',  // 最后修改时间（私有仓库，无法自动获取）
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
        type: 'miniprogram',  // 项目类型
        // 项目按钮配置
        repo: 'https://github.com/Cong0925/SpendNote',  // 开源仓库
        homepage: '../spend-note/',  // 项目页面
        demo: '../spend-note/demo/',  // 使用演示
        lastUpdated: '2026-07-08',  // GitHub 仓库最后修改时间
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
        type: 'web',  // 项目类型
        // 项目按钮配置
        repo: 'https://github.com/Cong0925/nodejs_mysql_Sequelize',  // 开源仓库
        homepage: '../nodejs-mysql-sequelize/',  // 项目页面
        demo: '../nodejs-mysql-sequelize/demo/',  // 使用演示
        lastUpdated: '2026-05-06',  // GitHub 仓库最后修改时间
    },
    {
        id: 4,
        name: 'aj-report-mine',
        title: 'AJ-Report 数据大屏',
        description: '基于 aj-report v1.4 版本进行二次开发的数据可视化大屏项目，支持前后端分离部署。集成多种数据源，提供丰富的图表组件和拖拽式设计。',
        status: 'completed',
        statusText: '已完成',
        tags: ['数据可视化', 'Java', 'Vue', '大数据屏'],
        icon: 'fas fa-chart-line',
        type: 'web',  // 项目类型
        // 项目按钮配置
        repo: 'https://github.com/Cong0925/aj-report-mine',  // 开源仓库
        homepage: '../aj-report-mine-page/',  // 项目页面
        demo: '../aj-report-mine-page/demo/',  // 使用演示
        lastUpdated: '2024-12-27',  // GitHub 仓库最后修改时间
    },
    {
        id: 5,
        name: 'jquery-svg-d3-demo',
        title: 'jQuery SVG D3 Demo',
        description: '基于 jQuery、SVG 和 D3.js 力导向图实现的交互式节点画布编辑器，支持多种图形形状、节点拖拽、框选、网格吸附、连线样式配置等功能。',
        status: 'stopped',
        statusText: '停工',
        tags: ['jQuery', 'SVG', 'D3.js', '力导向图', '图编辑器'],
        icon: 'fas fa-project-diagram',
        type: 'web',
        repo: 'https://github.com/Cong0925/jquery-svg-d3-demo',
        homepage: '../jquery-svg-d3-demo/',
        demo: '',
        lastUpdated: '2025-01-15',
    },
    {
        id: 6,
        name: 'vue3-ts-model',
        title: 'Vue3 TS Model',
        description: 'Vue3 + TypeScript 项目模板，集成 Element Plus 组件库、Pinia 状态管理、富文本编辑器（TinyMCE/Vditor），包含登录系统、仪表盘、用户管理等基础模块，快速搭建中后台应用。',
        status: 'practice',
        statusText: '练习项目',
        tags: ['Vue3', 'TypeScript', 'Element Plus', 'Pinia', '项目模板'],
        icon: 'fas fa-cubes',
        type: 'template',
        repo: 'https://github.com/Cong0925/vue3-ts-model',
        homepage: '../vue3-ts-model/',
        demo: '',
        lastUpdated: '2024-12-20',
    },
    {
        id: 7,
        name: 'hugoBasicExample',
        title: 'Hugo Blog',
        description: '基于 Hugo Clarity 主题的个人博客系统，支持中英文双语切换、用户登录（含验证码和RSA加密）、文章发布、深色模式、响应式设计，采用玻璃拟态风格登录弹窗。',
        status: 'practice',
        statusText: '练习项目',
        tags: ['Hugo', '博客', '双语支持', 'Glassmorphism', '静态网站'],
        icon: 'fas fa-blog',
        type: 'web',
        repo: 'https://github.com/Cong0925/hugoBasicExample',
        homepage: '../hugoBasicExample/',
        demo: '',
        lastUpdated: '2024-11-15',
    },
    {
        id: 8,
        name: 'student_club',
        title: 'Student Club',
        description: '学生社团管理系统，包含前台展示和后台管理两大模块。前台支持社团列表、活动展示、新闻通知、成员风采；后台提供社团管理、成员审核、内容发布等功能。',
        status: 'practice',
        statusText: '练习项目',
        tags: ['Vue3', 'Element Plus', '社团管理', '全栈应用', '内容管理'],
        icon: 'fas fa-users',
        type: 'web',
        repo: 'https://github.com/Cong0925/student_club',
        homepage: '../student_club/',
        demo: '',
        lastUpdated: '2024-10-25',
    }
    // 后续添加新项目在这里
];

// DOM元素
const projectsGrid = document.getElementById('projectsGrid');
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');

// 当前搜索状态
let currentSearch = '';

// 当前筛选状态
let currentStatusFilter = 'all';
let currentTypeFilter = 'all';

// GitHub Stars 缓存
const starsCache = {};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    initEventListeners();
    initGiscus();
    fetchAllStars();  // 异步获取所有项目的 stars

    // 隐藏骨架屏，显示实际内容
    setTimeout(() => {
        const skeleton = document.getElementById('skeleton-screen');
        const mainContent = document.getElementById('main-content');
        if (skeleton && mainContent) {
            skeleton.classList.add('skeleton-hidden');
            mainContent.classList.remove('skeleton-hidden');
            mainContent.classList.add('fade-in');
        }
    }, 300); // 短暂延迟确保渲染完成
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

// 获取 GitHub Stars
async function fetchAllStars() {
    for (const project of projects) {
        if (project.repo && !project.repoPrivate) {
            // 从 repo URL 提取 owner/repo
            const match = project.repo.match(/github\.com\/([^/]+\/[^/]+)/);
            if (match) {
                const repoPath = match[1];
                // 检查缓存
                if (starsCache[repoPath] !== undefined) {
                    updateStarsDisplay(project.id, starsCache[repoPath]);
                    continue;
                }
                try {
                    const response = await fetch(`https://api.github.com/repos/${repoPath}`);
                    if (response.ok) {
                        const data = await response.json();
                        starsCache[repoPath] = data.stargazers_count;
                        updateStarsDisplay(project.id, data.stargazers_count);
                    } else {
                        starsCache[repoPath] = '***';
                        updateStarsDisplay(project.id, '***');
                    }
                } catch (error) {
                    console.error(`获取 ${repoPath} stars 失败:`, error);
                    starsCache[repoPath] = '***';
                    updateStarsDisplay(project.id, '***');
                }
            }
        }
    }
}

// 更新卡片上的 Stars 显示
function updateStarsDisplay(projectId, stars) {
    const starsEl = document.querySelector(`[data-project-id="${projectId}"] .stars-count`);
    if (starsEl) {
        starsEl.textContent = stars;
    }
}

// 获取项目的 Stars 显示文本
function getStarsText(project) {
    // 私有仓库直接显示 ***
    if (project.repoPrivate || !project.repo) {
        return '***';
    }
    // 从 repo URL 提取 owner/repo
    const match = project.repo.match(/github\.com\/([^/]+\/[^/]+)/);
    if (match) {
        const repoPath = match[1];
        // 返回缓存的值，如果没有则显示加载中
        return starsCache[repoPath] !== undefined ? starsCache[repoPath] : '--';
    }
    return '***';
}

// 创建项目卡片
function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.projectId = project.id;
    card.style.animationDelay = `${index * 0.1}s`;

    const statusClass = `status-${project.status}`;

    // 获取项目类型配置
    const typeConfig = PROJECT_TYPES[project.type] || PROJECT_TYPES.other;

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

    // 格式化最后修改时间
    let lastUpdatedHtml = '';
    if (project.lastUpdated) {
        const date = new Date(project.lastUpdated);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        lastUpdatedHtml = `<span class="last-updated"><i class="fas fa-clock"></i> ${formattedDate}</span>`;
    }

    // 获取 Stars 文本
    const starsText = getStarsText(project);

    card.innerHTML = `
        <div class="project-header">
            <h3 class="project-title">
                <i class="${project.icon}"></i>
                ${project.title}
            </h3>
            <span class="project-status ${statusClass}">${project.statusText}</span>
        </div>
        <div class="project-type">
            <i class="${typeConfig.icon}"></i>
            ${typeConfig.name}
        </div>
        <p class="project-description">${project.description}</p>
        <div class="project-tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="project-meta">
            <span class="stars-info">
                <i class="fas fa-star"></i>
                <span class="stars-count">${starsText}</span>
            </span>
            ${lastUpdatedHtml}
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
        const matchesStatus = currentStatusFilter === 'all' || project.status === currentStatusFilter;
        const matchesType = currentTypeFilter === 'all' || project.type === currentTypeFilter;
        return matchesSearch && matchesStatus && matchesType;
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

    // 筛选按钮点击
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filterType = btn.dataset.filter;
            const value = btn.dataset.value;

            // 更新同组按钮的 active 状态
            btn.closest('.filter-group').querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 更新筛选状态
            if (filterType === 'status') {
                currentStatusFilter = value;
            } else if (filterType === 'type') {
                currentTypeFilter = value;
            }

            renderProjects();
        });
    });

    // 卡片悬停效果已通过 CSS :hover 实现，无需 JavaScript
}

// 初始化 Giscus 留言系统
// Giscus 通过 HTML 中的 <script> 标签自动加载
// 配置项在 index.html 的 giscus script 标签中
function initGiscus() {
    // Giscus 配置已移至 index.html 的 <script> 标签
    // 无需额外的 JS 初始化代码
    console.log('Giscus 留言系统已加载');
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

// 添加滚动事件监听（使用防抖优化性能）
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(() => {
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
        scrollTimeout = null;
    }, 100);
}, { passive: true });

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

    // 检查设备性能，移动端减少粒子数量
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const PARTICLE_COUNT = isMobile ? 15 : 25; // 减少粒子数量
    const TARGET_FPS = isMobile ? 30 : 45; // 降低帧率目标
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    // 移动设备直接隐藏 Canvas，不运行动画
    if (isMobile) {
        canvas.style.display = 'none';
        return;
    }

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();

    // 使用防抖处理 resize 事件
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resize, 100);
    });

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

    let lastFrameTime = 0;
    let animationId = null;
    let isRunning = true;

    function animate(currentTime) {
        if (!isRunning) return;
        animationId = requestAnimationFrame(animate);

        // 帧率控制
        const deltaTime = currentTime - lastFrameTime;
        if (deltaTime < FRAME_INTERVAL) return;
        lastFrameTime = currentTime - (deltaTime % FRAME_INTERVAL);

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
    }

    // 页面可见性检测 - 页面不可见时停止动画
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            isRunning = false;
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        } else {
            isRunning = true;
            lastFrameTime = 0;
            animationId = requestAnimationFrame(animate);
        }
    });

    animationId = requestAnimationFrame(animate);
})();

// ========== 鼠标跟随光晕 ==========
(function initMouseGlow() {
    const glow = document.querySelector('.mouse-glow');
    if (!glow) return;

    // 检查是否为移动设备，移动设备禁用光晕效果
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        glow.style.display = 'none';
        return;
    }

    let mouseX = -500, mouseY = -500;
    let glowX = -500, glowY = -500;
    let isAnimating = false;
    let isPageVisible = true;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.classList.add('active');

        // 使用 CSS transform 替代 left/top 性能更好
        if (!isAnimating && isPageVisible) {
            isAnimating = true;
            requestAnimationFrame(updateGlow);
        }
    });

    document.addEventListener('mouseleave', () => {
        glow.classList.remove('active');
        isAnimating = false;
    });

    // 页面可见性检测 - 页面不可见时停止动画
    document.addEventListener('visibilitychange', () => {
        isPageVisible = !document.hidden;
        if (!isPageVisible) {
            glow.classList.remove('active');
            isAnimating = false;
        }
    });

    function updateGlow() {
        if (!isPageVisible) {
            isAnimating = false;
            return;
        }

        // 使用 CSS transform 性能更好
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.transform = `translate(calc(${glowX}px - 50%), calc(${glowY}px - 50%))`;

        // 当接近目标时停止动画
        if (Math.abs(mouseX - glowX) > 0.5 || Math.abs(mouseY - glowY) > 0.5) {
            requestAnimationFrame(updateGlow);
        } else {
            isAnimating = false;
        }
    }
})();
