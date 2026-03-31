// 获取DOM元素
const menu1 = document.getElementById('menu1');
const menu2 = document.getElementById('menu2');
const subMenu = document.getElementById('subMenu');
const imgDisplay = document.getElementById('imgDisplay');
const infoSwitchBtns = document.querySelectorAll('.switch-btn[data-info-type]');
const basicInfo = document.getElementById('basicInfo');
const cultureScene = document.getElementById('cultureScene');
const cultureSceneImgTag = document.getElementById('cultureSceneImgTag');
const cultureDesc = document.getElementById('cultureDesc');
const wordcloudImg = document.getElementById('wordcloudImg');
const wordcloudTitle = document.getElementById('wordcloudTitle');

// ECharts实例
let radarChart, pieChart;

// 省份列表
const regions = [
    "北京市", "天津市", "河北省", "山西省", "江苏省",
    "浙江省", "安徽省", "江西省", "山东省", "河南省", 
    "广东省", "云南省", "青海省", "台湾省"
];

// 初始化图表
function initCharts() {
    radarChart = echarts.init(document.getElementById('radarChart'));
    radarChart.setOption({
        radar: {
            indicator: [
                { name: '气候适应性', max: 10 },
                { name: '资源可得性', max: 10 },
                { name: '地形适应性', max: 10 },
                { name: '文化独特性', max: 10 },
                { name: '技术传承度', max: 10 },
                { name: '经济实用性', max: 10 }
            ],
            radius: '60%',
            splitLine: { color: '#000' },
            axisLine: { color: '#000' },
            axisName: {
                color: '#625645',
                fontSize: 14,
            },
            nameTextStyle: { color: '#333', fontSize: 11 }
        },
        series: [{
            type: 'radar',
            lineStyle: { color: '#76635A', width: 4 },
            areaStyle: { color: '#B4A59A' },
            itemStyle: { color: '#76635A' },
            symbolSize: 8,
            data: [{ value: regionChartData.default.radar.value, name: regionChartData.default.radar.name }]
        }],
        tooltip: { trigger: 'item' },
        backgroundColor: 'transparent'
    });

    pieChart = echarts.init(document.getElementById('pieChart'));
    pieChart.setOption({
        tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
        legend: { bottom: '5%', left: 'center', textStyle: { fontSize: 14, color: '#333' } },
        color: ['#76635A', '#805E45', '#997C5E', '#514036', '#D1B296'],
        series: [{
            name: '用材占比',
            type: 'pie',
            radius: ['40%', '70%'],
            itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
            label: { show: false },
            emphasis: { label: { show: true, fontSize: 16, fontWeight: 'bold' } },
            data: regionChartData.default.pie
        }],
        backgroundColor: 'transparent'
    });

    window.addEventListener('resize', () => {
        radarChart.resize();
        pieChart.resize();
    });
}

// 更新右侧内容
function updateRightContent(region) {
    // 1. 全景图
    const imgUrl = regionImgMap[region]?.['pic'] || 'assets/data/images/默认全景.jpg';
    imgDisplay.style.backgroundImage = `url('${imgUrl}')`;
    
    // 2. 基本信息和文化场景
    const info = regionInfoMap[region] || {};
    basicInfo.innerHTML = info.basic || '暂无该地区详细信息';
    cultureSceneImgTag.src = info.cultureImg || 'assets/data/images/文化场景/默认.jpg';
    cultureDesc.textContent = info.desc || '暂无该地区文化场景描述';
    
    // 3. 词云图
    const houseName = info.houseName || '默认';
    wordcloudTitle.textContent = `文化关键词`;
    wordcloudImg.src = `assets/data/images/词云图/${houseName}.png`;
    wordcloudImg.onerror = function() {
        this.src = '词云图/默认.png';
    };
    
    // 4. 标题更新
    document.getElementById('region-build-title').textContent = `${region} · ${houseName}`;
    
    // 5. 重置切换按钮
    infoSwitchBtns.forEach(btn => btn.classList.remove('active'));
    infoSwitchBtns[0].classList.add('active');
    basicInfo.style.display = 'block';
    cultureScene.style.display = 'none';
    
    // 6. 更新图表
    if (radarChart && pieChart) {
        const chartData = regionChartData[region] || regionChartData.default;
        radarChart.setOption({
            series: [{ data: [{ value: chartData.radar.value, name: chartData.radar.name }] }]
        });
        pieChart.setOption({
            series: [{ name: `${region} - 用材占比`, data: chartData.pie }]
        });
    }
}

// 渲染子菜单
function renderSubMenu() {
    subMenu.innerHTML = regions.map((region, index) => 
        `<button class="sub-menu-item ${index === 0 ? 'active' : ''}" data-region="${region}">${region}</button>`
    ).join('');
    bindSubMenuClick();
}

// 绑定子菜单点击
function bindSubMenuClick() {
    document.querySelectorAll('.sub-menu-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.sub-menu-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            updateRightContent(item.dataset.region);
        });
    });
}

// 主菜单切换
menu1.addEventListener('click', () => {
    menu1.classList.add('active');
    menu2.classList.remove('active');
    renderSubMenu();
    updateRightContent('北京市');
});

menu2.addEventListener('click', () => {
    window.location.href = 'sub1_history.html';
});

// 信息切换
infoSwitchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        infoSwitchBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const isBasic = btn.dataset.infoType === 'basic';
        basicInfo.style.display = isBasic ? 'block' : 'none';
        cultureScene.style.display = isBasic ? 'none' : 'block';
    });
});

// 初始化
window.addEventListener('load', () => {
    initCharts();
    renderSubMenu();
    updateRightContent('北京市');
});