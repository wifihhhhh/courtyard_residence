const customColorPalette = ['#76635A', '#805E45', '#997C5E', '#514036', '#D1B296'];

// 核心优化：将DOM操作包裹在DOMContentLoaded中，确保元素加载后再执行
document.addEventListener('DOMContentLoaded', () => {
    // 1. 获取DOM元素（此时元素已存在）
    const menu1 = document.getElementById('menu1');
    const menu2 = document.getElementById('menu2');
    const subMenu = document.getElementById('subMenu');
    const subMenuItems = document.querySelectorAll('.sub-menu-item');

    // 2. 跳转逻辑：点击“典型民居图鉴”跳转到gallery.html
    if (menu1) { // 增加判空，避免元素不存在时报错
        menu1.addEventListener('click', () => {
            window.location.href = 'gallery.html';
        });
    }

    // 3. 子菜单跳转逻辑（修复switch穿透问题）
    if (subMenuItems.length > 0) {
        subMenuItems.forEach(item => {
            item.addEventListener('click', () => {
                // 激活当前子菜单
                subMenuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                
                // 根据类型跳转
                const type = item.dataset.type;
                switch(type) {
                    case 'history': 
                        // 当前页面，无需跳转
                        break;
                    case 'adaptation':
                        window.location.href = 'sub2_adaptation.html';
                        break; // 关键：补充break，避免穿透
                    case 'wisdom':
                        window.location.href = 'sub3_wisdom.html';
                        break;
                    case 'culture':
                        window.location.href = 'sub4_culture.html';
                        break;
                    case 'modern':
                        window.location.href = 'sub5_modern.html';
                        break;
                    default:
                        break; // 增加默认分支，提升鲁棒性
                }
            });
        });
    }

    // 4. 初始化空间分类筛选
    initSpaceFilter();
    
    // 5. 初始化hover提示框
    initSpaceTooltip();
    
    // 6. 初始化时间轴
    initTimeline();
});

// 核心数据保持不变
const timelineData = [
    {
        "year": "先秦前",
        "title": "起源雏形 · 格局确立",
        "desc": "起源于黄河流域，完成从圆到方建筑形态演变，形成中轴对称、前堂后室格局，西周正式形成合院，春秋趋于规范化定型化。",
        "img": "assets/data/images/时间轴/先秦.jpg"
    },
    {
        "year": "汉唐-宋元",
        "title": "形制发展 · 技艺升级",
        "desc": "汉代规制整然，唐分阶层发展合院，宋融合园林并升级装饰技艺，元代都城规划为合院发展奠定布局基础。",
        "img": "assets/data/images/时间轴/汉唐.jpg"
    },
    {
        "year": "明清时期",
        "title": "定型成熟 · 礼制规范",
        "desc": "合院在全国完全定型，建筑工艺臻于完善，明清制定严格建筑等级制度，北京四合院成为典型代表。",
        "img": "assets/data/images/时间轴/明清.jpeg"
    },
    {
        "year": "近代时期",
        "title": "中西融合 · 建筑遭损",
        "desc": "受欧式风格影响出现中西融合特征，解放后合院多户共用，改革开放后旧城改造致大量合院被拆除。",
        "img": "assets/data/images/时间轴/近代.png"
    },
    {
        "year": "当代",
        "title": "保护传承 · 创新融合",
        "desc": "打造类四合院适配现代生活，国外借鉴合院内涵设计住宅，合院文化在创新中延续升华。",
        "img": "assets/data/images/时间轴/当代.jpg"
    }
];

// 修复时间轴初始化逻辑，确保强制渲染
function initTimeline() {
    // 强制获取DOM并初始化
    const chartDom = document.getElementById('timelineChart');
    if (!chartDom) {
        console.error('时间轴DOM元素未找到');
        return;
    }

    // 强制设置DOM样式
    chartDom.style.width = '100%';
    chartDom.style.height = '100%';
    chartDom.style.display = 'block';

    const myChart = echarts.init(chartDom);

    // 简化时间轴配置，确保显示
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            formatter: (params) => {
                const item = timelineData[params.dataIndex];
                return `
                    <div style="padding:8px 12px;background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                        <div style="font-weight:600;color:#5D4037;">${item.year}</div>
                        <div style="font-size:12px;color:#8B7D6B;margin-top:4px;">${item.title}</div>
                    </div>
                `;
            },
            textStyle: { fontSize: 14 }
        },
        grid: {
            left: '5%',
            right: '5%',
            top: '30%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: timelineData.map(item => item.year),
            axisLine: {
                lineStyle: { color: customColorPalette[2], width: 2 }
            },
            axisLabel: {
                color: '#5D4037',
                fontSize: 16, // 放大字体
                fontWeight: 500,
                margin: 15 // 标签下移，避免重叠
            },
        },
        yAxis: {
            show: false
        },
        series: [
            {
                type: 'scatter',
                data: timelineData.map((item, index) => ({
                    value: [index, 0],
                    itemStyle: {
                        color: customColorPalette[index % 5],
                        shadowBlur: 8,
                        shadowColor: 'rgba(93,64,55,0.2)'
                    },
                    symbolSize: 15 // 放大圆点
                })),
                emphasis: {
                    symbolSize: 35,
                    itemStyle: { color: '#D1B296' }
                }
            }
        ]
    };

    // 强制设置配置并渲染
    myChart.setOption(option, true);

    // 初始化显示第一个数据
    updateDetail(0);

    // 点击交互：选中点发光
    myChart.on('click', (params) => {
        const index = params.dataIndex;
        // 更新选中点样式（发光效果）
        myChart.setOption({
            series: [{
                data: timelineData.map((item, i) => ({
                    value: [i, 0],
                    itemStyle: {
                        color: customColorPalette[i % 5],
                        borderColor: i === index ? '#fff' : '#c8b9ac',
                        borderWidth: i === index ? 3 : 0,
                        shadowBlur: i === index ? 20 : 8,
                        shadowColor: i === index ? 'rgba(209,178,150,0.8)' : 'rgba(93,64,55,0.2)'
                    },
                    symbolSize: i === index ? 20 : 15
                }))
            }]
        });
        updateDetail(index);
    });

    // 窗口自适应
    window.addEventListener('resize', () => {
        myChart.resize();
    });

    // 强制触发一次resize，确保显示
    setTimeout(() => {
        myChart.resize();
    }, 100);
}

// 更新详情区域（保持大字体+美观布局）
function updateDetail(index) {
    const item = timelineData[index];
    
    const textHtml = `
        <div class="timeline-year fade-in">${item.year}</div>
        <div class="timeline-title fade-in">${item.title}</div>
        <div class="timeline-desc fade-in">${item.desc}</div>
    `;
    const detailText = document.getElementById('detailText');
    if (detailText) detailText.innerHTML = textHtml;

    const imgHtml = `
        <img src="${item.img}" alt="${item.year}" class="fade-in">
    `;
    const detailImg = document.getElementById('detailImg');
    if (detailImg) detailImg.innerHTML = imgHtml;
}

// ===== 空间分类筛选功能 =====
function initSpaceFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const spaceElements = document.querySelectorAll('[class*="space-"]');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 切换按钮激活状态
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            // 重置所有空间样式
            spaceElements.forEach(el => {
                el.classList.remove('space-highlight', 'yard-highlight');
                
                // 筛选高亮
                if (category !== 'all' && el.classList.contains(`space-${category}`)) {
                    if (el.classList.contains('yard')) {
                        el.classList.add('yard-highlight');
                    } else {
                        el.classList.add('space-highlight');
                    }
                }
            });
        });
    });
}

// ===== 新增：hover提示框功能 =====
function initSpaceTooltip() {
    const tooltip = document.getElementById('spaceTooltip');
    const spaceElements = document.querySelectorAll('[data-name]');
    
    spaceElements.forEach(el => {
        // 鼠标移入
        el.addEventListener('mouseenter', (e) => {
            const name = el.dataset.name;
            const desc = el.dataset.desc || '无详细说明';
            tooltip.innerHTML = `<strong>${name}</strong><br>${desc}`;
            
            // 定位提示框
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = `${rect.left + window.scrollX + 10}px`;
            tooltip.style.top = `${rect.top + window.scrollY - 10}px`;
            tooltip.style.opacity = '1';
            
            // 临时高亮
            if (el.classList.contains('yard')) {
                el.classList.add('yard-highlight');
            } else {
                el.classList.add('space-highlight');
            }
        });
        
        // 鼠标移出
        el.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            // 保留筛选的高亮，只移除临时高亮
            const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
            if (activeCategory === 'all') {
                el.classList.remove('space-highlight', 'yard-highlight');
            }
        });
        
        // 鼠标跟随
        el.addEventListener('mousemove', (e) => {
            tooltip.style.left = `${e.pageX + 10}px`;
            tooltip.style.top = `${e.pageY - 10}px`;
        });
    });
}

// 额外保障：避免重复初始化
let timelineInited = false;
window.addEventListener('load', () => {
    if (!timelineInited) {
        setTimeout(() => {
            initTimeline();
            timelineInited = true;
        }, 200);
    }
});