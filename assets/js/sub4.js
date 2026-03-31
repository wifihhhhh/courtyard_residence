// 定义全局自定义颜色数组
const customColorPalette = ['#76635A', '#805E45', '#997C5E', '#514036', '#D1B296'];

// 获取DOM元素
const menu1 = document.getElementById('menu1');
const menu2 = document.getElementById('menu2');
const subMenu = document.getElementById('subMenu');
const subMenuItems = document.querySelectorAll('.sub-menu-item');

// 1. 跳转逻辑：点击“典型民居图鉴”跳转到gallery.html
menu1.addEventListener('click', () => {
    window.location.href = 'gallery.html';
});

// 2. 子菜单跳转逻辑
subMenuItems.forEach(item => {
    item.addEventListener('click', () => {
        // 激活当前子菜单
        subMenuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        // 根据类型跳转
        const type = item.dataset.type;
        switch(type) {
            case 'history': 
                window.location.href = 'sub1_history.html';
                break;
            case 'adaptation':
                window.location.href = 'sub2_adaptation.html';
                break;
            case 'wisdom':
                window.location.href = 'sub3_wisdom.html';
                break;
            case 'culture':
                // 当前页面，无需跳转
                break;
            case 'modern':
                window.location.href = 'sub5_modern.html';
                break;
        }
    });
});

// 3. 初始化文化关联分析图表
function initCultureCharts() {
    // ---------------------- 1. 旭日图（建筑布局与家族规模） ----------------------
    var familySizeData = [
        {
            name: '华北四合院',
            itemStyle: { color: customColorPalette[0] }, // #76635A
            totalArea: '260㎡',
            children: [
                { name: '正房', value: 27.7, itemStyle: { color: customColorPalette[0] }, area: '72㎡', desc:'堂屋+卧室2间' },
                { name: '东厢房', value: 20.4, itemStyle: { color: customColorPalette[0] }, area: '54㎡', desc:'卧室2间+储物间' },
                { name: '西厢房', value: 20.4, itemStyle: { color: customColorPalette[0] }, area: '52㎡', desc:'卧室2间+储物间' },
                { name: '倒座房', value: 17.3, itemStyle: { color: customColorPalette[0] }, area: '45㎡', desc:'门房+厨房+杂物间' },
                { name: '中央庭院', value: 12.3, itemStyle: { color: customColorPalette[0] }, area: '32㎡', desc:'含石板铺地' },
                { name: '廊下通道', value: 1.9, itemStyle: { color: customColorPalette[0] }, area: '5㎡', desc:'连接各房屋的檐廊' }
            ]
        },
        {
            name: '徽派民居',
            itemStyle: { color: customColorPalette[1] }, // #805E45
            totalArea: '220㎡',
            children: [
                { name: '堂屋', value: 12.7, itemStyle: { color: customColorPalette[1] }, area: '28㎡', desc:'家族礼仪空间，两层通高' },
                { name: '东次间', value: 16.4, itemStyle: { color: customColorPalette[1] }, area: '(18+18)㎡', desc:'上下层均为卧室，带阁楼' },
                { name: '西次间', value: 14.5, itemStyle: { color: customColorPalette[1] }, area: '(16+16)㎡', desc:'上下层均为卧室，带阁楼' },
                { name: '东厢房', value: 13.6, itemStyle: { color: customColorPalette[1] }, area: '(15+15)㎡', desc:'一层厨房，二层储物' },
                { name: '西厢房', value: 12.7, itemStyle: { color: customColorPalette[1] }, area: '(14+14)㎡', desc:'一层杂物，二层储物' },
                { name: '门前场地', value: 11.4, itemStyle: { color: customColorPalette[1] }, area: '25㎡', desc:'带排水系统' },
                { name: '天井', value: 10, itemStyle: { color: customColorPalette[1] }, area: '22㎡', desc:'青石板铺地，连接院门' },
                { name: '楼梯间', value: 4.5, itemStyle: { color: customColorPalette[1] }, area: '(5+5)㎡', desc:'东厢房北侧窄梯' },
                { name: '廊下', value: 3.6, itemStyle: { color: customColorPalette[1] }, area: '(4+4)㎡', desc:'围绕天井的檐廊' }
            ]
        },
        {
            name: '广府镬耳屋',
            itemStyle: { color: customColorPalette[2] }, // #997C5E
            totalArea: '160㎡',
            children: [
                { name: '正厅（三间）', value: 30, itemStyle: { color: customColorPalette[2] }, area: '48㎡', desc:'明间（厅堂）+次间2间' },
                { name: '东廊屋', value: 20, itemStyle: { color: customColorPalette[2] }, area: '32㎡', desc:'厨房+卫生间+储物' },
                { name: '西廊屋', value: 18.8, itemStyle: { color: customColorPalette[2] }, area: '30㎡', desc:'卧室+杂物间' },
                { name: '天井', value: 11.2, itemStyle: { color: customColorPalette[2] }, area: '18㎡', desc:'通风采光' },
                { name: '青云巷', value: 7.5, itemStyle: { color: customColorPalette[2] }, area: '12㎡', desc:'西侧通道，单户独立使用' },
                { name: '门廊', value: 5, itemStyle: { color: customColorPalette[2] }, area: '8㎡', desc:'入口檐廊连接院门与正厅' },
                { name: '后院小场地', value: 7.5, itemStyle: { color: customColorPalette[2] }, area: '12㎡', desc:'东廊屋后方，用于晾晒' }
            ]
        },
        {
            name: '云南一颗印',
            itemStyle: { color: customColorPalette[3] }, // #514036
            totalArea: '180㎡',
            children: [
                { name: '正房（三间）', value: 50, itemStyle: { color: customColorPalette[3] }, area: '(45+45)㎡', desc:'明间+次间两间' },
                { name: '东耳房（两间）', value: 20, itemStyle: { color: customColorPalette[3] }, area: '(18+18)㎡', desc:'一层卧室，二层储物' },
                { name: '西耳房（两间）', value: 20, itemStyle: { color: customColorPalette[3] }, area: '(18+18)㎡', desc:'一层卧室，二层储物' },
                { name: '倒座房（八尺）', value: 13.3, itemStyle: { color: customColorPalette[3] }, area: '(12+12)㎡', desc:'一层门房，二层储物' },
                { name: '天井', value: 15.6, itemStyle: { color: customColorPalette[3] }, area: '28㎡', desc:'带石板地漏' },
                { name: '楼梯间', value: 4.4, itemStyle: { color: customColorPalette[3] }, area: '(4+4)㎡', desc:'西耳房与倒座房之间' },
                { name: '散水（屋檐下）', value: 3.3, itemStyle: { color: customColorPalette[3] }, area: '6㎡', desc:'围绕建筑的排水区域' }
            ]
        },
        {
            name: '西北窑洞',
            itemStyle: { color: customColorPalette[4] }, // #D1B296
            totalArea: '200㎡',
            children: [
                { name: '主窑', value: 15, itemStyle: { color: customColorPalette[4] }, area: '30㎡', desc:'堂屋兼卧室' },
                { name: '东一窑', value: 12.5, itemStyle: { color: customColorPalette[4] }, area: '25㎡', desc:'卧室' },
                { name: '东二窑', value: 11, itemStyle: { color: customColorPalette[4] }, area: '22㎡', desc:'储物间' },
                { name: '西一窑', value: 12.5, itemStyle: { color: customColorPalette[4] }, area: '25㎡', desc:'卧室' },
                { name: '西二窑', value: 11, itemStyle: { color: customColorPalette[4] }, area: '22㎡', desc:'厨房' },
                { name: '中央院落', value: 38, itemStyle: { color: customColorPalette[4] }, area: '76㎡', desc:'主要活动空间' },
                { name: '入口坡道', value: 4, itemStyle: { color: customColorPalette[4] }, area: '8㎡', desc:'连接地面与地坑' },
                { name: '厕所', value: 2, itemStyle: { color: customColorPalette[4] }, area: '4㎡', desc:'院落东南角，简易结构' },
                { name: '储物棚', value: 4, itemStyle: { color: customColorPalette[4] }, area: '8㎡', desc:'院落西北角，石棉瓦顶' }
            ]
        }
    ];

    const familySizeChart = echarts.init(document.getElementById('familySizeChart'));
    const familySizeOption = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                let content = `<div class="custom-tooltip">`;
                if (params.data.totalArea) {
                    content += `<div class="tooltip-name">${params.data.name}</div>`;
                    content += `<div class="tooltip-location">总面积：${params.data.totalArea}</div>`;
                } else {
                    content += `<div class="tooltip-name">${params.data.name}</div>`;
                    content += `<div class="tooltip-location">面积：${params.data.area}</div>`;
                    content += `<div class="tooltip-location">占比：${params.data.value}%</div>`;
                    content += `<div class="tooltip-location">${params.data.desc}</div>`;
                }
                content += `</div>`;
                return content;
            }
        },
        series: [
            {
                type: 'sunburst',
                data: familySizeData,
                radius: [0, '85%'],
                center: ['50%', '50%'],
                sort: null,
                label: {
                    rotate: 'radial',
                    color: '#ffffff',
                    fontSize: 14,
                    fontWeight: 600
                },
                itemStyle: {
                    borderColor: '#F7EFE9',
                    borderWidth: 2,
                    borderRadius: 4
                },
                emphasis: {
                    focus: 'descendant',
                    itemStyle: {
                        shadowBlur: 8,
                        shadowColor: 'rgba(118, 99, 90, 0.2)', // 对应 #76635A 的透明色
                        borderWidth: 3
                    },
                    label: {
                        fontSize: 12,
                        formatter: params => params.name
                    }
                }
            }
        ],
        backgroundColor: 'transparent'
    };
    familySizeChart.setOption(familySizeOption);

    // ---------------------- 2. 堆叠柱状图（功能分区的等级差异） ----------------------
    const functionalAreaData = [
        { region: '华北四合院', 主要活动区域: 12.3, 起居区域: 68.5, 其它区域: 19.2 },
        { region: '安徽徽派民居', 主要活动区域: 34.2, 起居区域: 31.1, 其它区域: 34.7 },
        { region: '广府镬耳屋',    主要活动区域: 41.2, 起居区域: 18.8, 其它区域: 40 },
        { region: '云南一颗印',    主要活动区域: 12.3, 起居区域: 71.1, 其它区域: 16.7 },
        { region: '西北窑洞',    主要活动区域: 34.5, 起居区域: 36.4, 其它区域: 29.1 }
    ];

    const functionalAreaChart = echarts.init(document.getElementById('functionalAreaChart'));
    const regions = functionalAreaData.map(d => d.region);
    const areaTypes = ['主要活动区域', '起居区域', '其它区域'];
    const colorMap = {
        '主要活动区域': customColorPalette[0], // #76635A
        '起居区域': customColorPalette[2],     // #997C5E
        '其它区域': customColorPalette[3]      // #514036
    };
    const stackData = areaTypes.map(type => {
        return {
            name: type,
            type: 'bar',
            stack: '总量',
            data: functionalAreaData.map(d => d[type]),
            itemStyle: { color: colorMap[type] },
            label: {
                show: false
            }
        };
    });
    const functionalAreaOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: function (params) {
                let content = `<div class="custom-tooltip">`;
                content += `<div class="tooltip-name">${params[0].axisValue}</div>`;
                params.forEach(p => {
                    if (p.value > 0) {
                        content += `<div class="tooltip-location">${p.seriesName}：${p.value}%</div>`;
                    }
                });
                content += `</div>`;
                return content;
            }
        },
        legend: {
            data: areaTypes,
            top: 0,
            left: 'center',
            textStyle: {
                color: '#5d4037',
                fontSize: 11
            }
        },
        xAxis: {
            type: 'category',
            data: regions,
            axisLabel: { 
                rotate: 15,
                color: '#5d4037',
                fontSize: 10
            },
            axisLine: {
                lineStyle: {
                    color: customColorPalette[4] // #D1B296
                }
            }
        },
        yAxis: { 
            type: 'value', 
            name: '面积占比（%）',
            max: 100,
            nameTextStyle: {
                color: '#5d4037',
                fontSize: 11
            },
            axisLabel: {
                color: '#5d4037',
                fontSize: 10
            },
            axisLine: {
                lineStyle: {
                    color: customColorPalette[4] // #D1B296
                }
            },
            splitLine: {
                lineStyle: {
                    color: `rgba(209, 178, 150, 0.2)` // #D1B296 的透明色
                }
            }
        },
        grid: {
            top: '30px',
            left: '40px',
            right: '30px',
            bottom: '40px'
        },
        series: stackData,
        backgroundColor: 'transparent'
    };
    functionalAreaChart.setOption(functionalAreaOption);

    // ---------------------- 3. 文化符号轮播图逻辑 ----------------------
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slides = document.querySelectorAll('.carousel-slide');
    let currentIndex = 0;
    const slideWidth = 100; // 百分比

    // 匀速滚动函数
    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    }

    // 按钮控制
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });

    // 自动匀速轮播
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }, 5000); // 每5秒滚动一次

    // 跟随光标弹窗逻辑
    const followTooltip = document.getElementById('followTooltip');
    const imageItems = document.querySelectorAll('.image-item');
    
    // 鼠标移入显示弹窗
    imageItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const tooltipText = item.dataset.tooltip;
            followTooltip.textContent = tooltipText;
            // 弹窗位置跟随光标（偏移10px避免遮挡）
            followTooltip.style.left = `${e.clientX + 10}px`;
            followTooltip.style.top = `${e.clientY + 10}px`;
            followTooltip.style.opacity = '1';
            followTooltip.style.visibility = 'visible';
        });

        // 鼠标移出隐藏弹窗
        item.addEventListener('mouseleave', () => {
            followTooltip.style.opacity = '0';
            followTooltip.style.visibility = 'hidden';
        });
    });

    // 窗口大小变化时适配所有图表
    window.addEventListener('resize', () => {
        familySizeChart.resize();
        functionalAreaChart.resize();
    });
}

// 页面加载完成后初始化图表
window.addEventListener('load', initCultureCharts);