// ═══════════════════════════════════════════════════════
// jQuery SVG D3 流程图编辑器 - 几何艺术风交互脚本
// 功能：动态几何背景生成、连线装饰、滚动动画
// ═══════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {
    console.log('[几何艺术风] 页面加载完成，初始化动态背景');
    generateGeometryBackground();
    createConnectionLines();
    initScrollAnimations();
    createHeroDecoration();
});

/**
 * 生成随机几何图形背景
 * 每次访问视觉效果不同
 */
function generateGeometryBackground() {
    var container = document.getElementById('geometry-bg');
    if (!container) {
        console.warn('[几何艺术风] 未找到 geometry-bg 容器');
        return;
    }

    var svg = createSvgElement('svg', {
        width: '100%',
        height: '100%',
        xmlns: 'http://www.w3.org/2000/svg'
    });

    var colors = ['#FF6B35', '#004E89', '#FFD166', '#06B6D4', '#8B5CF6', '#10B981'];
    var shapeTypes = ['circle', 'rect', 'polygon', 'line'];

    // 生成随机几何图形
    for (var i = 0; i < 35; i++) {
        var shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        var color = colors[Math.floor(Math.random() * colors.length)];
        var x = Math.random() * 100;
        var y = Math.random() * 100;
        var size = 15 + Math.random() * 80;
        var opacity = 0.02 + Math.random() * 0.06;
        var rotation = Math.random() * 360;

        var element = null;

        switch (shapeType) {
            case 'circle':
                element = createSvgElement('circle', {
                    cx: x + '%',
                    cy: y + '%',
                    r: size,
                    fill: color,
                    opacity: opacity
                });
                break;

            case 'rect':
                element = createSvgElement('rect', {
                    x: x + '%',
                    y: y + '%',
                    width: size,
                    height: size * (0.5 + Math.random()),
                    rx: Math.random() > 0.5 ? 4 : 0,
                    fill: 'none',
                    stroke: color,
                    'stroke-width': 1.5,
                    opacity: opacity,
                    transform: 'rotate(' + rotation + ' ' + x + '% ' + y + '%)'
                });
                break;

            case 'polygon':
                var s = size;
                var cx = x;
                var cy = y;
                var sides = 3 + Math.floor(Math.random() * 4);
                var points = [];
                for (var j = 0; j < sides; j++) {
                    var angle = (j / sides) * Math.PI * 2 - Math.PI / 2;
                    var px = cx + (s / 2) * Math.cos(angle);
                    var py = cy + (s / 2) * Math.sin(angle);
                    points.push(px + '% ' + py + '%');
                }
                element = createSvgElement('polygon', {
                    points: points.join(', '),
                    fill: 'none',
                    stroke: color,
                    'stroke-width': 1,
                    opacity: opacity,
                    transform: 'rotate(' + rotation + ' ' + x + '% ' + y + '%)'
                });
                break;

            case 'line':
                var x2 = x + (Math.random() - 0.5) * 15;
                var y2 = y + (Math.random() - 0.5) * 15;
                element = createSvgElement('line', {
                    x1: x + '%',
                    y1: y + '%',
                    x2: x2 + '%',
                    y2: y2 + '%',
                    stroke: color,
                    'stroke-width': 1,
                    opacity: opacity * 1.5
                });
                break;
        }

        if (element) {
            svg.appendChild(element);
        }
    }

    container.appendChild(svg);
    console.log('[几何艺术风] 背景几何图形生成完成');
}

/**
 * 创建动态连线装饰
 */
function createConnectionLines() {
    var container = document.querySelector('.connection-lines');
    if (!container) {
        console.warn('[几何艺术风] 未找到 connection-lines 容器');
        return;
    }

    var svg = createSvgElement('svg', {
        width: '100%',
        height: '100%',
        xmlns: 'http://www.w3.org/2000/svg'
    });

    var colors = ['#FF6B35', '#004E89', '#FFD166', '#06B6D4'];

    // 生成装饰连线
    for (var i = 0; i < 8; i++) {
        var startX = Math.random() * window.innerWidth;
        var startY = Math.random() * window.innerHeight;
        var endX = startX + (Math.random() - 0.5) * 500;
        var endY = startY + (Math.random() - 0.5) * 500;
        var ctrlX1 = (startX + endX) / 2 + (Math.random() - 0.5) * 300;
        var ctrlY1 = (startY + endY) / 2 + (Math.random() - 0.5) * 300;

        var d = 'M ' + startX + ' ' + startY + ' Q ' + ctrlX1 + ' ' + ctrlY1 + ' ' + endX + ' ' + endY;

        var path = createSvgElement('path', {
            d: d,
            stroke: colors[i % colors.length],
            'stroke-width': 1.5,
            fill: 'none',
            opacity: 0.12,
            'stroke-dasharray': '8 4'
        });

        // 添加动画
        var animate = createSvgElement('animate', {
            attributeName: 'stroke-dashoffset',
            from: '48',
            to: '0',
            dur: (3 + Math.random() * 4) + 's',
            repeatCount: 'indefinite'
        });

        path.appendChild(animate);
        svg.appendChild(path);
    }

    // 生成装饰节点
    var nodeColors = ['#FF6B35', '#004E89', '#FFD166'];
    for (var j = 0; j < 12; j++) {
        var nx = Math.random() * 100;
        var ny = Math.random() * 100;
        var nr = 3 + Math.random() * 6;
        var nColor = nodeColors[Math.floor(Math.random() * nodeColors.length)];

        var circle = createSvgElement('circle', {
            cx: nx + '%',
            cy: ny + '%',
            r: nr,
            fill: nColor,
            opacity: 0.2
        });

        // 脉动动画
        var pulseAnim = createSvgElement('animate', {
            attributeName: 'opacity',
            values: '0.15;0.35;0.15',
            dur: (2 + Math.random() * 3) + 's',
            repeatCount: 'indefinite'
        });

        circle.appendChild(pulseAnim);
        svg.appendChild(circle);
    }

    container.appendChild(svg);
    console.log('[几何艺术风] 连线装饰生成完成');
}

/**
 * 创建英雄区域右侧 SVG 装饰
 */
function createHeroDecoration() {
    var heroRight = document.querySelector('.hero-svg-decoration');
    if (!heroRight) return;

    var svg = createSvgElement('svg', {
        viewBox: '0 0 400 360',
        xmlns: 'http://www.w3.org/2000/svg',
        width: '100%',
        height: '100%'
    });

    // 定义渐变
    var defs = createSvgElement('defs', {});

    var grad1 = createSvgElement('linearGradient', { id: 'grad-orange', x1: '0%', y1: '0%', x2: '100%', y2: '100%' });
    grad1.appendChild(createSvgElement('stop', { offset: '0%', 'stop-color': '#FF6B35' }));
    grad1.appendChild(createSvgElement('stop', { offset: '100%', 'stop-color': '#FFD166' }));
    defs.appendChild(grad1);

    var grad2 = createSvgElement('linearGradient', { id: 'grad-blue', x1: '0%', y1: '0%', x2: '100%', y2: '100%' });
    grad2.appendChild(createSvgElement('stop', { offset: '0%', 'stop-color': '#004E89' }));
    grad2.appendChild(createSvgElement('stop', { offset: '100%', 'stop-color': '#06B6D4' }));
    defs.appendChild(grad2);

    var filter = createSvgElement('filter', { id: 'glow', x: '-50%', y: '-50%', width: '200%', height: '200%' });
    var feGaussian = createSvgElement('feGaussianBlur', { stdDeviation: '4', result: 'coloredBlur' });
    filter.appendChild(feGaussian);
    var feMerge = createSvgElement('feMerge', {});
    feMerge.appendChild(createSvgElement('feMergeNode', { in: 'coloredBlur' }));
    feMerge.appendChild(createSvgElement('feMergeNode', { in: 'SourceGraphic' }));
    filter.appendChild(feMerge);
    defs.appendChild(filter);

    svg.appendChild(defs);

    // 中心大圆
    var mainCircle = createSvgElement('circle', {
        cx: 200, cy: 180, r: 80,
        fill: 'none',
        stroke: 'url(#grad-orange)',
        'stroke-width': 2,
        opacity: 0.6,
        filter: 'url(#glow)'
    });
    svg.appendChild(mainCircle);

    // 旋转动画装饰圆
    var rotGroup = createSvgElement('g', { transform: 'translate(200, 180)' });
    for (var i = 0; i < 6; i++) {
        var angle = (i / 6) * 360;
        var rad = (angle * Math.PI) / 180;
        var ox = Math.cos(rad) * 110;
        var oy = Math.sin(rad) * 110;

        var smallCircle = createSvgElement('circle', {
            cx: ox, cy: oy, r: 8,
            fill: i % 2 === 0 ? '#FF6B35' : '#FFD166',
            opacity: 0.7
        });
        rotGroup.appendChild(smallCircle);
    }
    var rotateAnim = createSvgElement('animateTransform', {
        attributeName: 'transform',
        type: 'rotate',
        from: '0 200 180',
        to: '360 200 180',
        dur: '20s',
        repeatCount: 'indefinite'
    });
    rotGroup.appendChild(rotateAnim);
    svg.appendChild(rotGroup);

    // 节点连线
    var nodes = [
        { x: 60, y: 80, r: 20, color: '#004E89' },
        { x: 340, y: 100, r: 16, color: '#FF6B35' },
        { x: 80, y: 280, r: 14, color: '#FFD166' },
        { x: 320, y: 260, r: 18, color: '#06B6D4' },
        { x: 200, y: 320, r: 12, color: '#8B5CF6' },
        { x: 200, y: 60, r: 10, color: '#10B981' }
    ];

    // 连线
    for (var j = 0; j < nodes.length; j++) {
        var next = (j + 1) % nodes.length;
        var line = createSvgElement('line', {
            x1: nodes[j].x, y1: nodes[j].y,
            x2: nodes[next].x, y2: nodes[next].y,
            stroke: 'rgba(255,255,255,0.15)',
            'stroke-width': 1.5,
            'stroke-dasharray': '4 4'
        });
        var lineAnim = createSvgElement('animate', {
            attributeName: 'stroke-dashoffset',
            from: '16', to: '0',
            dur: '2s',
            repeatCount: 'indefinite'
        });
        line.appendChild(lineAnim);
        svg.appendChild(line);
    }

    // 节点
    for (var k = 0; k < nodes.length; k++) {
        var node = createSvgElement('circle', {
            cx: nodes[k].x, cy: nodes[k].y, r: nodes[k].r,
            fill: nodes[k].color,
            opacity: 0.8,
            filter: 'url(#glow)'
        });
        var nodeAnim = createSvgElement('animate', {
            attributeName: 'r',
            values: (nodes[k].r) + ';' + (nodes[k].r + 3) + ';' + (nodes[k].r),
            dur: (2 + k * 0.3) + 's',
            repeatCount: 'indefinite'
        });
        node.appendChild(nodeAnim);
        svg.appendChild(node);
    }

    heroRight.appendChild(svg);
    console.log('[几何艺术风] 英雄区域装饰生成完成');
}

/**
 * 滚动动画初始化
 */
function initScrollAnimations() {
    var cards = document.querySelectorAll('.feature-card, .tech-card');
    if (!cards.length) {
        console.warn('[几何艺术风] 未找到需要动画的卡片');
        return;
    }

    if (!('IntersectionObserver' in window)) {
        console.warn('[几何艺术风] 浏览器不支持 IntersectionObserver，跳过滚动动画');
        cards.forEach(function (card) {
            card.style.opacity = '1';
            card.style.transform = 'none';
        });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(function (card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) ' + (index * 0.08) + 's';
        observer.observe(card);
    });

    console.log('[几何艺术风] 滚动动画初始化完成，共 ' + cards.length + ' 个卡片');
}

/**
 * 创建 SVG 元素的辅助函数
 * @param {string} tagName - SVG 元素标签名
 * @param {Object} attrs - 属性对象
 * @returns {SVGElement}
 */
function createSvgElement(tagName, attrs) {
    var ns = 'http://www.w3.org/2000/svg';
    var element = document.createElementNS(ns, tagName);

    if (attrs) {
        Object.keys(attrs).forEach(function (key) {
            element.setAttribute(key, attrs[key]);
        });
    }

    return element;
}
