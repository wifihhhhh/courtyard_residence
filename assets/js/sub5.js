// 定义全局自定义颜色数组（复用原有五色）
const customColorPalette = ['#76635A', '#805E45', '#997C5E', '#514036', '#D1B296'];

// 获取DOM元素（保持原有菜单逻辑）
const menu1 = document.getElementById('menu1');
const menu2 = document.getElementById('menu2');
const subMenu = document.getElementById('subMenu');
const subMenuItems = document.querySelectorAll('.sub-menu-item');

// 1. 跳转逻辑：点击“典型民居图鉴”跳转到gallery.html
menu1.addEventListener('click', () => {
    window.location.href = 'gallery.html';
});

// 2. 子菜单跳转逻辑（保持不变）
subMenuItems.forEach(item => {
    item.addEventListener('click', () => {
        subMenuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
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
                window.location.href = 'sub4_culture.html';
                break;
            case 'modern':
                // 当前页面，无需跳转
                break;
        }
    });
});

// 3. 初始化所有图表
function initAllCharts() {
    // ---------------------- 1. 时间轴柱状图（古建经济价值） ----------------------
    const timelineBarChart = echarts.init(document.getElementById('timelineBarChart'));
    // 定义六批数据 [北京市, 安徽省, 广东省, 云南省, 河南省]
    const timelineData = {
        '2014': [16, 111, 126, 502, 99],
        '2016': [21, 163, 160, 615, 124],
        '2019': [22, 400, 266, 708, 205],
        '2023': [26, 470, 295, 776, 275],
    };

    const years = ['2014', '2016', '2019', '2023'];

    const timelineOption = {
        baseOption: {
            timeline: {
                axisType: 'category',
                autoPlay: true,
                playInterval: 1500,
                data: years,
                label: { 
                    color: '#5d4037',
                    fontSize: 14,
                    fontWeight: 'bold'
                },
                lineStyle: { 
                    color: '#D4C8BE', 
                    width: 2 
                },
                itemStyle: { 
                    color: '#997C5E' 
                },
                checkpointStyle: { 
                    color: '#514036', 
                    borderColor: '#D1B296',
                    borderWidth: 3
                },
                controlStyle: {
                    itemSize: 25,
                    color: '#76635A',
                    borderColor: '#76635A'
                },
                emphasis: {
                    itemStyle: { color: '#805E45' },
                    label: { color: '#514036' }
                },
                left: 80,
                right: 80,
                bottom: 10
            },
            xAxis: {
                type: 'value',
                max: 'dataMax',
                axisLabel: { show: false },
                splitLine: { 
                    show: true,
                    lineStyle: {
                        color: '#D1B296',
                        type: 'dashed'
                    }
                }
            },
            yAxis: {
                type: 'category',
                inverse: true,
                data: ['北京市', '安徽省', '广东省', '云南省', '河南省'],
                axisLabel: {
                    fontSize: 16,
                    color: '#5d4037',
                    fontWeight: 'bold',
                    margin: 20
                },
                axisLine: { show: false },
                axisTick: { show: false }
            },
            grid: {
                top: 30,
                bottom: 50,
                left: 150,
                right: 100
            },
            series: [{
                type: 'bar',
                realtimeSort: true,
                seriesLayoutBy: 'column',
                itemStyle: {
                    borderRadius: [0, 25, 25, 0],
                    color: function(params) {
                        return ['#D1B296', '#514036', '#997C5E', '#805E45', '#76635A'][params.dataIndex];
                    },
                    shadowBlur: 8,
                    shadowColor: 'rgba(0,0,0,0.2)',
                    shadowOffsetY: 5
                },
                encode: { x: 'value', y: 'name' },
                label: {
                    show: true,
                    position: 'right',
                    valueAnimation: true,
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#5d4037',
                    formatter: '{c}',
                    offset: [10, 0]
                },
                barWidth: 40
            }],
            graphic: [{
                type: 'text',
                right: 50,
                bottom: 60,
                style: {
                    text: '单位：个',
                    fontSize: 14,
                    fill: '#997C5E',
                    fontFamily: 'Microsoft YaHei'
                }
            }]
        },
        options: years.map(year => ({
            series: [{
                data: timelineData[year].map((value, index) => ({
                    value: value,
                    name: ['西北窑洞', '云南一颗印', '广府镬耳屋', '徽派民居', '北京四合院'][index]
                }))
            }]
        }))
    };
    timelineBarChart.setOption(timelineOption);

    // ---------------------- 2. 客流量趋势折线图 ----------------------
    const flowLineChart = echarts.init(document.getElementById('flowLineChart'));
    // 构造客流量数据
    const countries = ['北京四合院', '徽派民居', '镬耳屋', '一颗印', '西北窑洞'];
    const rawData = [
        ['Year', 'Country', 'Income', 'Population'],
        [2014, '北京四合院', 1000, 1000],
        [2016, '北京四合院', 1095, 1095],
        [2019, '北京四合院', 800, 800],
        [2023, '北京四合院', 600, 600],
        [2014, '徽派民居', 280, 280],
        [2016, '徽派民居', 300, 300],
        [2019, '徽派民居', 350, 350],
        [2023, '徽派民居', 450, 450],
        [2014, '镬耳屋', 150, 150],
        [2016, '镬耳屋', 180, 180],
        [2019, '镬耳屋', 200, 200],
        [2023, '镬耳屋', 250, 250],
        [2014, '一颗印', 100, 100],
        [2016, '一颗印', 150, 150],
        [2019, '一颗印', 200, 200],
        [2023, '一颗印', 1460, 1460],
        [2014, '西北窑洞', 300, 300],
        [2016, '西北窑洞', 520, 520],
        [2019, '西北窑洞', 700, 700],
        [2023, '西北窑洞', 800, 800]
    ];

    const datasetWithFilters = [];
    const seriesList = [];
    echarts.util.each(countries, function (country) {
        var datasetId = 'dataset_' + country;
        datasetWithFilters.push({
            id: datasetId,
            fromDatasetId: 'dataset_raw',
            transform: {
                type: 'filter',
                config: {
                    and: [
                        { dimension: 'Year', gte: 2014 },
                        { dimension: 'Country', '=': country }
                    ]
                }
            }
        });
        seriesList.push({
            type: 'line',
            datasetId: datasetId,
            showSymbol: true,
            symbolSize: 8,
            name: country,
            smooth: true,
            lineStyle: { width: 3 },
            endLabel: {
                show: true,
                formatter: function (params) {
                    return params.value[1] + ': ' + params.value[2];
                }
            },
            labelLayout: { moveOverlap: 'shiftY' },
            emphasis: { focus: 'series' },
            encode: {
                x: 'Year',
                y: 'Income',
                label: ['Country', 'Income'],
                itemName: 'Year',
                tooltip: ['Income']
            }
        });
    });

    const flowOption = {
        animationDuration: 10000,
        dataset: [
            { id: 'dataset_raw', source: rawData },
            ...datasetWithFilters
        ],
        // tooltip: {
        //     order: 'valueDesc',
        //     trigger: 'axis',
        //     backgroundColor: 'rgba(0,0,0,0.8)',
        //     textStyle: { color: '#fff', fontSize: 12 },
        //     padding: 10,
        //     formatter: function (params) {
        //         let result = '<strong>' + params[0].axisValue + '年</strong><br/>';
        //         params.sort((a, b) => b.value[0] - a.value[0]);
        //         params.forEach(item => {
        //             result += item.marker + ' ' + item.seriesName + ': ' + item.value[2] + '万人次<br/>';
        //         });
        //         return result;
        //     }
        // },
        legend: {
            data: countries,
            bottom: '0%',
            orient: 'horizontal',
            left: 'center',
            textStyle: { fontSize: 12, color: '#5d4037' }
        },
        xAxis: {
            type: 'category',
            name: '年份',
            nameLocation: 'end',
            axisLabel: { fontSize: 14, color: '#5d4037' },
            axisLine: { lineStyle: { color: customColorPalette[4] } }
        },
        yAxis: {
            name: '客流量（万人次）',
            nameTextStyle: { fontSize: 14, color: customColorPalette[0], padding: [0, 0, 0, 50] },
            axisLabel: { fontSize: 12, color: '#5d4037' },
            splitLine: { lineStyle: { color: 'rgba(209, 178, 150, 0.2)' } }
        },
        grid: { left: '10%', right: '15%', top: '15%', bottom: '20%' },
        color: customColorPalette,
        series: seriesList,
        backgroundColor: 'transparent'
    };
    flowLineChart.setOption(flowOption);

    // ---------------------- 徽派民居 · 三个仪表盘图表 ----------------------
    const chart2 = echarts.init(document.getElementById('chart2'));
    const huiOption = {
        title: {
            text: '西溪南镇活化“千年古村落”，守护“千亩枫杨林”，激活“千名乡创客”',
            left: 'center',
            textStyle: { fontSize: 15, color: '#5d4037',fontWeight:'bold' }
        },
        series: [
            // 游客量
            {
                type: 'gauge',
                center: ['25%', '55%'],
                radius: '55%',
                min: 0, max: 280,
                startAngle: 180, endAngle: 0,
                itemStyle: { color: '#805E45' },
                progress: { show: true, width: 20 },
                pointer: { show: true, length: '70%', width: 8 },
                axisLine: { lineStyle: { width: 20, color: [[1, '#E8E0D8']] } },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                title: { offsetCenter: [0, '40%'], fontSize: 14, color: '#5d4037', fontWeight: 'bold' },
                detail: {
                    valueAnimation: true, fontSize: 16,
                    offsetCenter: [0, '-35%'],
                    formatter: '{value}',
                    color: '#805E45', fontWeight: 'bold'
                },
                data: [{ value: 190, name: '游客接待量\n（万人）' }]
            },
            // 新业态
            {
                type: 'gauge',
                center: ['50%', '55%'],
                radius: '55%',
                min: 0, max: 50,
                startAngle: 180, endAngle: 0,
                itemStyle: { color: '#997C5E' },
                progress: { show: true, width: 20 },
                pointer: { show: true, length: '70%', width: 8 },
                axisLine: { lineStyle: { width: 20, color: [[1, '#E8E0D8']] } },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                title: { offsetCenter: [0, '40%'], fontSize: 14, color: '#5d4037', fontWeight: 'bold' },
                detail: {
                    valueAnimation: true, fontSize: 16,
                    offsetCenter: [0, '-35%'],
                    formatter: '{value}',
                    color: '#997C5E', fontWeight: 'bold'
                },
                data: [{ value: 42, name: '新业态\n（个）' }]
            },
            // 古建筑
            {
                type: 'gauge',
                center: ['75%', '55%'],
                radius: '55%',
                min: 0, max: 220,
                startAngle: 180, endAngle: 0,
                itemStyle: { color: '#514036' },
                progress: { show: true, width: 20 },
                pointer: { show: true, length: '70%', width: 8 },
                axisLine: { lineStyle: { width: 20, color: [[1, '#E8E0D8']] } },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                title: { offsetCenter: [0, '40%'], fontSize: 14, color: '#5d4037', fontWeight: 'bold' },
                detail: {
                    valueAnimation: true, fontSize: 16,
                    offsetCenter: [0, '-35%'],
                    formatter: '{value}',
                    color: '#514036', fontWeight: 'bold'
                },
                data: [{ value: 200, name: '古建筑\n（幢）' }]
            }
        ]
    };
    chart2.setOption(huiOption);
    
    // ---------------------- 广府镬耳屋 · 矩形树图 ----------------------
    const chart3 = echarts.init(document.getElementById('chart3'));
    const guangfuOption = {
        title: {
            text: '广东各地典型镬耳屋村落流芳百世',
            left: 'center',
            textStyle: { fontSize: 15, color: '#5d4037',fontWeight:'bold' }
        },
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(247, 239, 233, 0.95)',
            borderColor: '#D4C8BE',
            textStyle: { color: '#5d4037' },
            formatter: function(params) {
                return `
                    ${params.data.name}<br/>
                    ${params.data.value} 座<br/>
                    ${params.data.desc || '无'}
                `;
            }
        },
        series: [
            {
                type: 'treemap',
                width: '90%',
                height: '70%',
                top: 30,
                roam: false,
                nodeClick: false,
                breadcrumb: { show: false },
                label: {
                    show: true,
                    formatter: '{b}\n{c}座',
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#fff'
                },
                itemStyle: {
                    borderColor: '#F5F0EB',
                    borderWidth: 1,
                    gapWidth: 1
                },
                data: [
                    { name: '佛山大旗头村', value: 200, itemStyle: { color: customColorPalette[0] }, desc: '广东第一村' },
                    { name: '东莞塘尾村', value: 268, itemStyle: { color: customColorPalette[1] }, desc: '全国重点文保' },
                    { name: '广州沙湾古镇', value: 300, itemStyle: { color: customColorPalette[2] }, desc: '年游客300万' },
                    { name: '花都塱头村', value: 200, itemStyle: { color: customColorPalette[3] }, desc: '近200座明清建筑' },
                    { name: '其他散落村落', value: 100, itemStyle: { color: customColorPalette[4] }, desc: '待普查' }
                ]
            }
        ],
    };
    chart3.setOption(guangfuOption);

    // ---------------------- 云南一颗印 · 活化对比柱状图 ----------------------
    const chart4 = echarts.init(document.getElementById('chart4'));
    const yunnanOption = {
        title: {
            text: '卧龙古渔村活化：从废弃到重生',
            left: 'center',
            top: 2,
            textStyle: { color: customColorPalette[3], fontSize: 15, fontWeight: 'bold' },
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(247, 239, 233, 0.95)',
            borderColor: '#D4C8BE',
            textStyle: { color: customColorPalette[3] }
        },
        legend: {
            data: ['活化前', '活化后'],
            bottom: 0,
            textStyle: { color: customColorPalette[3], fontSize: 12 }
        },
        grid: { 
            top: 35, 
            bottom: 55, 
            left: 35, 
            right: 15 
        },
        xAxis: {
            type: 'category',
            data: ['建筑完好率', '使用率', '游客接待', '村民收入', '文化活态'],
            axisLabel: { fontSize: 10, color: customColorPalette[3] },
            axisLine: { lineStyle: { color: customColorPalette[4], width: 1 } }
        },
        yAxis: {
            type: 'value',
            name: '指数',
            nameTextStyle: { color: customColorPalette[3], fontSize: 11 },
            max: 100,
            axisLabel: { color: customColorPalette[3], fontSize: 10 },
            splitLine: { lineStyle: { color: '#E8E0D8', type: 'dashed' } }
        },
        series: [
            {
                name: '活化前',
                type: 'bar',
                data: [30, 10, 5, 20, 15],
                itemStyle: { color: customColorPalette[3], opacity: 0.5 },
                barWidth: 18
            },
            {
                name: '活化后',
                type: 'bar',
                data: [85, 90, 75, 80, 88],
                itemStyle: { color: customColorPalette[3] },
                barWidth: 18,
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}',
                    fontSize: 11,
                    color: customColorPalette[3],
                    fontWeight: 'bold'
                }
            }
        ]
    };
    chart4.setOption(yunnanOption);
    
    // ---------------------- 西北窑洞 · 历史人口折线图（卡片完美适配版） ----------------------
    const chart5 = echarts.init(document.getElementById('chart5'));
    const shanxiOption = {
        title: {
            text: '西北窑洞：4500年的居住史诗',
            left: 'center',
            top: 2,
            textStyle: { 
                color: '#5d4037', 
                fontSize: 13,  // 再缩小一点
                fontWeight: 'bold' 
            }
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(247, 239, 233, 0.95)',
            borderColor: customColorPalette[4],
            textStyle: { color: customColorPalette[3] }
        },
        grid: { 
            top: 30, 
            bottom: 30, 
            left: 50,
            right: 20
        },
        xAxis: {
            type: 'category',
            data: ['周代', '秦汉', '明清', '1950s', '1980s', '2000s', '2024'],
            axisLabel: { 
                fontSize: 9,
                color: '#5d4037', 
                rotate: 40
            },
            axisLine: { lineStyle: { color: '#b6aca4', width: 1 } }
        },
        yAxis: {
            type: 'value',
            name: '居住人口（万人）',
            axisLabel: { 
                color: '#5d4037', 
                fontSize: 9,
                formatter: function(v) {
                    return v >= 10000 ? (v/10000) + '千万' : v;
                }
            },
            splitLine: { lineStyle: { color: '#c9ba96', type: 'dashed' } }
        },
        series: [
            {
                type: 'line',
                data: [100,500,2000,8000,12000,8000,4000],
                smooth: true,
                lineStyle: { color: '#af9379', width: 2 },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x:0,y:0,x2:0,y2:1,
                        colorStops: [
                            { offset:0, color:'rgba(209,178,150,0.4)' },
                            { offset:1, color:'rgba(209,178,150,0.05)' }
                        ]
                    }
                },
                symbol: 'circle',
                symbolSize: 4,
                itemStyle: { color: '#b18a67' },
                label: {
                    show: true,
                    position: 'top',
                    formatter: params => params.dataIndex === 6 ? '4000万\n仍居住' : '',
                    fontSize: 10,
                    color: '#5d4037',
                    fontWeight: 'bold'
                }
            }
        ]
    };
    chart5.setOption(shanxiOption);

    // ---------------------- ✅ 北京四合院：雨儿胡同空间流向图 ✅ ----------------------
    const chart1 = echarts.init(document.getElementById('chart1'));
    const spaceFlowOption = {
      title: {
        text: '雨儿胡同腾退空间流向与价值转化',
        left: 'center',
        textStyle: { fontSize: 15, color: '#5d4037',fontWeight:'bold' }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false }
      },
      yAxis: {
        type: 'category',
        data: ['腾退空间'],
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { color: '#5d4037',fontSize:14,fontWeight:'bold' }
      },
      series: [
        {
          name: '原住民改善',
          type: 'bar',
          stack: 'total',
          barWidth: '40',
          itemStyle: { color: '#D1B296' }, // 项目主色
          label: {
            show: true,
            position: 'inside',
            formatter: '80户留存\n人均36.89㎡',
            textStyle:{color:'#ffffff',fontSize:12}
          },
          data: [30]
        },
        {
          name: '青年公寓',
          type: 'bar',
          stack: 'total',
          barWidth: '40',
          itemStyle: { color: '#805E45' },
          label: {
            show: true,
            position: 'inside',
            formatter: '40套公寓\n入住率80%',
            textStyle:{color:'#ffffff',fontSize:12}
          },
          data: [40]
        },
        {
          name: '公共文化',
          type: 'bar',
          stack: 'total',
          barWidth: '40',
          itemStyle: { color: '#997C5E' },
          label: {
            show: true,
            position: 'inside',
            formatter: '5大功能区\n年均40+场',
            textStyle:{color:'#ffffff',fontSize:12}
          },
          data: [20]
        },
        {
          name: '特色商业',
          type: 'bar',
          stack: 'total',
          barWidth: '40',
          itemStyle: { color: '#76635A' },
          label: {
            show: true,
            position: 'inside',
            formatter: '业态>70%\n居民增收',
            textStyle:{color:'#fff',fontSize:12}
          },
          data: [10]
        }
      ]
    };
    chart1.setOption(spaceFlowOption);

    // 窗口大小变化时适配所有图表
    window.addEventListener('resize', () => {
        timelineBarChart.resize();
        flowLineChart.resize();
        chart1.resize();
        chart2.resize();
        chart3.resize();
        chart4.resize();
        chart5.resize();
    });
}

// ==================== 点击图片渐隐 显示图表 ====================
const chart1El = document.getElementById('chart1');
const chart1Cover = document.getElementById('chart1Cover');
const chart2El = document.getElementById('chart2');
const chart2Cover = document.getElementById('chart2Cover');
const chart3El = document.getElementById('chart3');
const chart3Cover = document.getElementById('chart3Cover');
const chart4El = document.getElementById('chart4');
const chart4Cover = document.getElementById('chart4Cover');
const chart5El = document.getElementById('chart5');
const chart5Cover = document.getElementById('chart5Cover');

// 点击事件通用处理函数
function initFadeClick(coverEl, chartEl, chartInstance) {
  if (!coverEl) return;
  coverEl.addEventListener('click', () => {
    coverEl.classList.add('fade-out');
    chartEl.style.display = '';
    chartInstance.resize();
  });
}

// 初始化两个点击效果
initFadeClick(chart1Cover, chart1El, chart1);
initFadeClick(chart2Cover, chart2El, chart2);
initFadeClick(chart3Cover, chart3El, chart3);
initFadeClick(chart4Cover, chart4El, chart4);
initFadeClick(chart5Cover, chart5El, chart5);

// 页面加载后初始化
window.addEventListener('load', () => {
  initAllCharts();
});