// 项目数据
const projects = [
    {
        id: 1,
        name: 'write-helper-index',
        title: 'Write Helper',
        description: '一款为创作者打造的桌面写作助手，集成 AI 智能写作、多类型创作模板，还有可爱的桌面宠物陪伴你的每一次创作。',
        status: 'completed',
        statusText: '已完成',
        tags: ['AI写作', '桌面应用', '创作者工具'],
        link: 'https://github.com/Cong0925/write-helper-index',
        icon: 'fas fa-pen-fancy'
    },
    {
        id: 2,
        name: 'spend-note-index',
        title: 'Spend Note',
        description: '智能记账笔记应用，帮助你轻松管理个人财务，追踪支出，分析消费习惯。',
        status: 'planning',
        statusText: '规划中',
        tags: ['记账', '财务工具', '个人管理'],
        link: 'https://github.com/Cong0925/spend-note-index',
        icon: 'fas fa-wallet'
    }
    // 后续添加新项目在这里
];

// DOM元素
const projectsGrid = document.getElementById('projectsGrid');
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const filterButtons = document.querySelectorAll('.filter-btn');

// 当前筛选状态
let currentFilter = 'all';
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

    if (filteredProjects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>未找到匹配的项目</h3>
                <p>试试其他关键词或筛选条件</p>
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
        <a href="${project.link}" target="_blank" class="project-link">
            查看项目 <i class="fas fa-arrow-right"></i>
        </a>
    `;

    return card;
}

// 筛选项目
function filterProjects() {
    return projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
                            project.description.toLowerCase().includes(currentSearch.toLowerCase()) ||
                            project.tags.some(tag => tag.toLowerCase().includes(currentSearch.toLowerCase()));
        const matchesFilter = currentFilter === 'all' || project.status === currentFilter;
        return matchesSearch && matchesFilter;
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

    // 筛选按钮
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.status;
            renderProjects();
        });
    });

    // 添加项目卡片悬停效果
    document.addEventListener('mouseover', (e) => {
        const card = e.target.closest('.project-card');
        if (card) {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(74, 144, 226, 0.2)';
        }
    });

    document.addEventListener('mouseout', (e) => {
        const card = e.target.closest('.project-card');
        if (card) {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        }
    });
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
        clientID: 'YOUR_CLIENT_ID', // 替换为你的Client ID
        clientSecret: 'YOUR_CLIENT_SECRET', // 替换为你的Client Secret
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
        proxy: 'https://cors-anywhere.herokuapp.com/', // CORS代理
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
