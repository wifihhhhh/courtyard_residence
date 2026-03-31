// 定义全局自定义颜色数组
const customColorPalette = ['#76635A', '#805E45', '#997C5E', '#514036', '#D1B296'];

// ---------------------- 菜单跳转逻辑 ----------------------
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
                // 当前页面，无需跳转
                break;
            case 'culture':
                window.location.href = 'sub4_culture.html';
                break;
            case 'modern':
                window.location.href = 'sub5_modern.html';
                break;
            default:
                break;
        }
    });
});

// ---------------------- 图表初始化逻辑 ----------------------
function initAllCharts() {
    /* ---------------- 1. 基础配置：颜色表 + 类型映射 ---------------- */
    const regionColorMap = {
        '华北': customColorPalette[0],  // #76635A
        '华东': customColorPalette[1],  // #805E45
        '华南': customColorPalette[2],  // #997C5E
        '西南': customColorPalette[3],  // #514036
        '西北': customColorPalette[4]   // #D1B296
    };

    /* ---------------- 2. 图表1：结构-材料-性能关联图（和弦图） ---------------- */
    const rawGraphData = [
        // 结构类型节点（5种）- 索引0-4
        {"name":"抬梁式","type":"structure","region":"华北"},        // 北京四合院
        {"name":"砖木混合","type":"structure","region":"华东"},      // 徽派民居
        {"name":"穿斗式与抬梁式混合","type":"structure","region":"华南"},  // 广府镬耳屋（新）
        {"name":"穿斗式土木","type":"structure","region":"西南"},    // 云南一颗印（新）
        {"name":"拱券复合","type":"structure","region":"西北"},      // 西北窑洞
        
        // 材料节点（6种主要材料）- 索引5-10
        {"name":"青砖","type":"material"},           // 徽派、镬耳屋主要材料
        {"name":"夯土","type":"material"},           // 一颗印、窑洞主要材料
        {"name":"木材","type":"material"},           // 所有木结构共用
        {"name":"石材","type":"material"},           // 基础材料
        {"name":"砖瓦","type":"material"},           // 屋面材料
        {"name":"黄土","type":"material"},           // 窑洞特色
        
        // 资源消耗等级（3级）- 索引11-13
        {"name":"高消耗","type":"consumption"},      // 材料用量大、运输远
        {"name":"中消耗","type":"consumption"},      // 就地取材、适量使用
        {"name":"低消耗","type":"consumption"},      // 原生材料、极少加工
        
        // 建造便捷等级（3级）- 索引14-16
        {"name":"高便捷","type":"convenience"},      // 标准化构件、快速搭建
        {"name":"中便捷","type":"convenience"},      // 传统工艺、周期适中
        {"name":"低便捷","type":"convenience"},      // 手工为主、工期较长
        
        // 性能优化等级（3级）- 索引17-19
        {"name":"高优化","type":"optimization"},     // 多维度气候适应
        {"name":"中优化","type":"optimization"},     // 主要气候适应
        {"name":"低优化","type":"optimization"}      // 基础气候适应
    ];
    // 颜色映射
    const colorMap = {
        "structure": customColorPalette[0],
        "material": customColorPalette[1],
        "consumption": customColorPalette[2],
        "convenience": customColorPalette[3],
        "optimization": customColorPalette[4]
    };
    const typeDict = {
        "抬梁式":"structure", "砖木混合":"structure", "穿斗式与抬梁式混合":"structure", "穿斗式土木":"structure", "拱券复合":"structure",
        "青砖":"material", "夯土":"material", "木材":"material", "石材":"material", "砖瓦":"material", "黄土":"material",
        "高消耗":"consumption", "中消耗":"consumption", "低消耗":"consumption",
        "高便捷":"convenience", "中便捷":"convenience", "低便捷":"convenience",
        "高优化":"optimization", "中优化":"optimization", "低优化":"optimization"
    };
    const nodeData = rawGraphData.map(d=>({
        name:d.name,
        itemStyle:{color:colorMap[typeDict[d.name]]}
    }));
    const links = [
        // 1. 抬梁式（北京四合院）- 木材为主，中消耗、中便捷、高优化
        {"source":0,"target":7,"value":3,"lineStyle":{"width":3,"color":customColorPalette[1]}},   // 抬梁式 → 木材（强）
        {"source":0,"target":9,"value":2,"lineStyle":{"width":2,"color":customColorPalette[1]}},   // 抬梁式 → 砖瓦（中）
        {"source":0,"target":12,"value":2,"lineStyle":{"width":2,"color":customColorPalette[2]}},  // 抬梁式 → 中消耗
        {"source":0,"target":15,"value":2,"lineStyle":{"width":2,"color":customColorPalette[3]}},  // 抬梁式 → 中便捷
        {"source":0,"target":17,"value":3,"lineStyle":{"width":3,"color":customColorPalette[4]}},  // 抬梁式 → 高优化（抗震、空间灵活）
        
        // 2. 砖木混合（徽派民居）- 青砖+木材，中高消耗、中便捷、高优化
        {"source":1,"target":5,"value":3,"lineStyle":{"width":3,"color":customColorPalette[1]}},
        {"source":1,"target":7,"value":2,"lineStyle":{"width":2,"color":customColorPalette[1]}},
        {"source":1,"target":11,"value":2,"lineStyle":{"width":2,"color":customColorPalette[2]}},
        {"source":1,"target":15,"value":2,"lineStyle":{"width":2,"color":customColorPalette[3]}},
        {"source":1,"target":17,"value":3,"lineStyle":{"width":3,"color":customColorPalette[4]}},
        
        // 3. 穿斗式与抬梁式混合（广府镬耳屋）- 砖(42%)+木(35%)+石(15%)，中高消耗、中便捷、高优化
        {"source":2,"target":5,"value":3,"lineStyle":{"width":3,"color":customColorPalette[1]}},
        {"source":2,"target":7,"value":3,"lineStyle":{"width":3,"color":customColorPalette[1]}},
        {"source":2,"target":8,"value":2,"lineStyle":{"width":2,"color":customColorPalette[1]}},
        {"source":2,"target":11,"value":2,"lineStyle":{"width":2,"color":customColorPalette[2]}},
        {"source":2,"target":15,"value":2,"lineStyle":{"width":2,"color":customColorPalette[3]}},
        {"source":2,"target":17,"value":3,"lineStyle":{"width":3,"color":customColorPalette[4]}},
        
        // 4. 穿斗式土木（云南一颗印-新）- 土(45%)+木(35%)+砖(12%)，低消耗、低便捷、中优化
        {"source":3,"target":5,"value":2,"lineStyle":{"width":2,"color":customColorPalette[1]}},
        {"source":3,"target":7,"value":3,"lineStyle":{"width":3,"color":customColorPalette[1]}},
        {"source":3,"target":6,"value":3,"lineStyle":{"width":3,"color":customColorPalette[1]}},
        {"source":3,"target":13,"value":3,"lineStyle":{"width":3,"color":customColorPalette[2]}},
        {"source":3,"target":16,"value":3,"lineStyle":{"width":3,"color":customColorPalette[3]}},
        {"source":3,"target":18,"value":2,"lineStyle":{"width":2,"color":customColorPalette[4]}},
        
        // 5. 拱券复合（西北窑洞）- 黄土为主，低消耗、低便捷、中优化
        {"source":4,"target":6,"value":2,"lineStyle":{"width":2,"color":customColorPalette[1]}},
        {"source":4,"target":10,"value":3,"lineStyle":{"width":3,"color":customColorPalette[1]}},
        {"source":4,"target":13,"value":3,"lineStyle":{"width":3,"color":customColorPalette[2]}},
        {"source":4,"target":16,"value":3,"lineStyle":{"width":3,"color":customColorPalette[3]}},
        {"source":4,"target":18,"value":2,"lineStyle":{"width":2,"color":customColorPalette[4]}}
    ];
    const chordOption = {
        tooltip:{
            formatter: params => {
                if (params.dataType === 'edge') {
                    return rawGraphData[params.data.source].name + ' → ' + rawGraphData[params.data.target].name + '<br/>关联强度：' + params.data.value;
                }
                return params.name;
            },
            backgroundColor: 'rgba(247, 239, 233, 0.9)',
            borderColor: '#D4C8BE',
            borderWidth: 1
        },
        
        legend:{show:false},
        series:[{
            type:'graph',
            layout:'force',
            force:{
                repulsion: 200,
                gravity: 0.1,
                edgeLength: [100, 200],
                layoutAnimation: true
            },
            roam:true,
            label:{show: true,fontSize: 14,color: '#5d4037'},
            edgeSymbol:['none','arrow'],
            edgeSymbolSize:[0,8],
            data:nodeData,
            links:links,
            lineStyle:{opacity:0.6},
            emphasis:{
                focus: 'adjacency',
                lineStyle:{
                    width: 3,
                    opacity: 1,
                    color: colorMap.material,
                }
            },
        }],
        backgroundColor: 'transparent'
    };

    /* ---------------- 3. 图表2：民居营造效率（树图/旭日图切换） ---------------- */
    const colorList = customColorPalette;
    const treeData = {
        name:'建筑营造智慧',
        children:[
            {name:'华北四合院',children:[{name:'资源消耗',value:57.6},{name:'施工便捷性',value:45},{name:'空间优化率',value:81.6}]},
            {name:'徽派民居',children:[{name:'资源消耗',value:59.6},{name:'施工便捷性',value:45},{name:'空间优化率',value:74.5}]},
            {name:'广府镬耳屋',children:[{name:'资源消耗',value:65.4},{name:'施工便捷性',value:40},{name:'空间优化率',value:75.3}]},
            {name:'云南一颗印',children:[{name:'资源消耗',value:33.8},{name:'施工便捷性',value:60},{name:'空间优化率',value:73.8}]},
            {name:'西北窑洞',children:[{name:'资源消耗',value:34.7},{name:'施工便捷性',value:65},{name:'空间优化率',value:91.6}]}]
    };
    // 树图配置
    const treemapOption = {
        color:colorList,
        series:[{
            type:'treemap',
            id:'echarts-package-size',
            animationDurationUpdate:1000,
            roam:false,
            nodeClick:undefined,
            data:treeData.children,
            universalTransition:true,
            label:{show:true,showAllContent:true,fontSize:11,overflow:'break',color: '#fff'},
            breadcrumb:{show:false},
            itemStyle:{borderColor:'#fff',borderWidth:1}
        }],
        backgroundColor: 'transparent'
    };
    // 旭日图配置
    const sunburstOption = {
        color:colorList,
        series:[{
            type:'sunburst',
            id:'echarts-package-size',
            radius:['20%','80%'],
            animationDurationUpdate:1000,
            nodeClick:undefined,
            data:treeData.children,
            universalTransition:true,
            itemStyle:{borderWidth:1,borderColor:'rgba(255,255,255,.5)'},
            label:{
                show:true,
                showAllContent:true,
                fontSize:10,
                overflow:'break',
                color: '#fff'
            }
        }],
        backgroundColor: 'transparent'
    };

    /* ---------------- 4. 图表3：结构力学多维分析（平行坐标+散点矩阵） ---------------- */
    const rawData2 = [
        [7.5, 75.4, 62, '华北', '华北四合院'],
        [7.5, 54.6, 71.5, '华东', '徽派民居'],
        [6.0, 25.8, 70, '华南', '广府镬耳屋'],
        [7.5, 22.7, 72, '西南', '云南一颗印'],
        [6.0, 19.2, 82.8, '西北', '西北窑洞']
    ];

    // Schema
    const schema = [
        { name: 'antiQuake', index: 0, text: '抗震性（级）' },
        { name: 'materialEff', index: 1, text: '材料效率（%）' },
        { name: 'spaceUtil', index: 2, text: '空间利用率（%）' },
        { name: 'region', index: 3, text: '地域' },
        { name: 'structureType', index: 4, text: '建筑类型' }
    ];

    // 配色 - 使用自定义颜色数组
    const regionColorMap2 = {
        '华北': customColorPalette[0],  // #76635A
        '华东': customColorPalette[1],  // #805E45
        '华南': customColorPalette[2],  // #997C5E
        '西南': customColorPalette[3],  // #514036
        '西北': customColorPalette[4]   // #D1B296
    };

    // 基础配置
    const CATEGORY_DIM_COUNT = 3;
    const GAP = 2;
    const BASE_LEFT = 8;
    const BASE_TOP = 15;
    const GRID_WIDTH = (100 - BASE_LEFT - GAP) / CATEGORY_DIM_COUNT - GAP;
    const GRID_HEIGHT = (100 - BASE_TOP - GAP) / CATEGORY_DIM_COUNT - GAP;
    const CATEGORY_DIM = 3;
    const SYMBOL_SIZE = 8;

    // 提取散点数据
    function retrieveScatterData(data, dimX, dimY) {
        let result = [];
        for (let i = 0; i < data.length; i++) { 
            const region = data[i][CATEGORY_DIM];
            let item = [
                data[i][dimX], 
                data[i][dimY],
                regionColorMap2[region], 
                data[i][4]
            ];
            item[CATEGORY_DIM] = region;
            result.push(item);
        }
        return result;
    }

    // 生成散点矩阵
    function generateGrids() {
        let index = 0;
        const grid = [];
        const xAxis = [];
        const yAxis = [];
        const series = [];
        for (let i = 0; i < CATEGORY_DIM_COUNT; i++) {
            for (let j = 0; j < CATEGORY_DIM_COUNT; j++) {
                if (CATEGORY_DIM_COUNT - i + j >= CATEGORY_DIM_COUNT) continue;
                grid.push({
                    left: BASE_LEFT + i * (GRID_WIDTH + GAP) + '%',
                    top: BASE_TOP + j * (GRID_HEIGHT + GAP) + '%',
                    width: GRID_WIDTH + '%',
                    height: GRID_HEIGHT + '%',
                    containLabel: true
                });
                xAxis.push({
                    splitNumber: 3,
                    position: 'top',
                    axisLine: { show: j === 0, onZero: false, lineStyle: { width: 1.2 } },
                    axisTick: { show: j === 0, inside: true, length: 4 },
                    axisLabel: { 
                        show: j === 0, 
                        fontSize: 11, 
                        margin: 5,
                        formatter: val => schema[i].text.includes('%') ? val + '%' : val
                    },
                    type: 'value',
                    gridIndex: index,
                    scale: true,
                    min: getMin(i),
                    max: getMax(i)
                });
                yAxis.push({
                    splitNumber: 3,
                    position: 'right',
                    axisLine: { show: i === CATEGORY_DIM_COUNT - 1, onZero: false, lineStyle: { width: 1.2 } },
                    axisTick: { show: i === CATEGORY_DIM_COUNT - 1, inside: true, length: 4 },
                    axisLabel: { 
                        show: i === CATEGORY_DIM_COUNT - 1, 
                        fontSize: 11, 
                        margin: 5,
                        formatter: val => schema[j].text.includes('%') ? val + '%' : val
                    },
                    type: 'value',
                    gridIndex: index,
                    scale: true,
                    min: getMin(j),
                    max: getMax(j)
                });
                series.push({
                    type: 'scatter',
                    symbolSize: SYMBOL_SIZE,
                    symbol: 'circle',
                    itemStyle: {
                        color: params => params.data[2],
                        borderColor: '#fff',
                        borderWidth: 1,
                        shadowBlur: 3
                    },
                    xAxisIndex: index,
                    yAxisIndex: index,
                    data: retrieveScatterData(rawData2, i, j),
                    emphasis: { 
                        itemStyle: { 
                            color: params => params.data[2],
                            borderColor: '#ff4500',
                            borderWidth: 2
                        },
                        label: { 
                            show: true, 
                            position: 'right',
                            fontSize: 10,
                            formatter: params => params.data[3]
                        }
                    }
                });
                index++;
            }
        }
        return { grid, xAxis, yAxis, series };
    }

    // 轴范围函数
    function getMin(dimIndex) {
        const values = rawData2.map(item => item[dimIndex]);
        return Math.floor(Math.min(...values) - (dimIndex === 0 ? 0.1 : 2));
    }
    function getMax(dimIndex) {
        const values = rawData2.map(item => item[dimIndex]);
        return Math.ceil(Math.max(...values) + (dimIndex === 0 ? 0.1 : 2));
    }

    const gridOption = generateGrids();

    // 平行坐标系列
    function getParallelSeriesByRegion() {
        return rawData2.map(item => ({
            name: item[4],
            type: 'parallel',
            smooth: true,
            lineStyle: { 
                width: 2.5,
                opacity: 0.8,
                color: regionColorMap2[item[CATEGORY_DIM]]
            },
            data: [item.slice(0, 3)],
            emphasis: { 
                lineStyle: { width: 3.5, opacity: 1 }
            }
        }));
    }

    // 最终配置
    const parallelScatterOption = {
        animation: false,
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(247, 239, 233, 0.9)',
            borderColor: '#d2b48c',
            borderWidth: 1,
            padding: 10,
            fontSize: 12,
            color: '#5d4037',
            formatter: function (params) {
                const data = params.seriesType === 'scatter' ? params.data : params.data[0];
                const structInfo = rawData2.find(item => item[4] === (params.seriesName || data[3]));
                return `
                    <div style="font-weight:500">${structInfo[4]}</div>
                    <div>地域：${structInfo[3]}</div>
                    <div>抗震性：${structInfo[0]}级</div>
                    <div>材料效率：${structInfo[1]}%</div>
                    <div>空间利用率：${structInfo[2]}%</div>
                `;
            }
        },
        brush: {
            brushLink: 'all',
            xAxisIndex: gridOption.xAxis.map((_, idx) => idx),
            yAxisIndex: gridOption.yAxis.map((_, idx) => idx),
            inBrush: { opacity: 1, itemStyle: { shadowBlur: 8 } },
            outOfBrush: { opacity: 0.15 },
            brushType: 'rect',
            toolbox: { show: false }
        },
        legend: {
            data: rawData2.map(item => item[4]),
            orient: 'horizontal',
            top: 30,
            left: '5%',
            itemWidth: 12,
            itemHeight: 12,
            textStyle: { fontSize: 11, color: '#5d4037' },
            selectedMode: 'multiple',
            tooltip: { show: true, formatter: '点击切换{name}显示/隐藏' },
            selected: rawData2.reduce((obj, item) => {
                obj[item[4]] = true;
                return obj;
            }, {})
        },
        parallelAxis: [
            { 
                dim: 0, 
                name: schema[0].text, 
                nameTextStyle: { fontSize: 12, fontWeight: 500 },
                splitNumber: 3,
                min: getMin(0),
                max: getMax(0),
                axisLabel: { fontSize: 11, formatter: '{value}' }
            },
            { 
                dim: 1, 
                name: schema[1].text, 
                nameTextStyle: { fontSize: 12, fontWeight: 500 },
                splitNumber: 3,
                min: getMin(1),
                max: getMax(1),
                axisLabel: { fontSize: 11, formatter: '{value}%' }
            },
            { 
                dim: 2, 
                name: schema[2].text, 
                nameTextStyle: { fontSize: 12, fontWeight: 500 },
                splitNumber: 3,
                min: getMin(2),
                max: getMax(2),
                axisLabel: { fontSize: 11, formatter: '{value}%' }
            }
        ],
        parallel: {
            bottom: '8%',
            left: '5%',
            right: '40%',
            height: '28%',
            parallelAxisDefault: {
                type: 'value',
                nameLocation: 'end',
                nameGap: 18,
                axisLine: { lineStyle: { color: customColorPalette[0], width: 1.2 } }, // 使用自定义颜色
                axisTick: { lineStyle: { color: customColorPalette[0], width: 1 } }, // 使用自定义颜色
                splitLine: { show: true, lineStyle: { color: 'rgba(118, 99, 90, 0.1)' } }, // 对应 #76635A 的透明色
                axisLabel: { color: '#5d4037', fontSize: 11 }
            }
        },
        xAxis: gridOption.xAxis,
        yAxis: gridOption.yAxis,
        grid: gridOption.grid,
        series: [
            ...getParallelSeriesByRegion(),
            ...gridOption.series
        ],
        backgroundColor: 'transparent'
    };

    /* ---------------- 5. 图表4：桑基图（三层流向） ---------------- */
    const sankeyOption = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                if (params.dataType === 'link') {
                    return `
                        流向：${params.sourceName} → ${params.targetName}<br/>
                        构成占比：${(params.value * 100).toFixed(1)}%<br/>
                    `;
                } else {
                    return `
                        类型：${params.data.category === 'build' ? '建筑类型' : '材料名称'}<br/>
                        名称：${params.name}
                    `;
                }
            },
            backgroundColor: 'rgba(247, 239, 233, 0.9)',
            borderColor: '#D4C8BE',
            borderWidth: 1
        },
        series: [
            {
                type: 'sankey',
                layout: 'none',
                left: '5%',
                right: '15%',
                top: '20%',
                bottom: '10%',
                data: [
                    // 建筑类型节点 - 使用自定义颜色数组（保持原有配色）
                    { name: '华北四合院', category: 'build', itemStyle: { color: customColorPalette[0] } },
                    { name: '徽派民居', category: 'build', itemStyle: { color: customColorPalette[1] } },
                    { name: '广府镬耳屋', category: 'build', itemStyle: { color: customColorPalette[2] } },
                    { name: '云南一颗印', category: 'build', itemStyle: { color: customColorPalette[3] } },
                    { name: '西北窑洞', category: 'build', itemStyle: { color: customColorPalette[4] } },
                    // 材料名称节点 - 保留原有配色，新增必要材料
                    { name: '木材（松木）', category: 'material', itemStyle: { color: '#8d6e63' } },
                    { name: '木材（杉木）', category: 'material', itemStyle: { color: '#8d6e63' } },
                    { name: '木材（楠木）', category: 'material', itemStyle: { color: '#8d6e63' } },
                    { name: '青砖', category: 'material', itemStyle: { color: '#757575' } },
                    { name: '条石（花岗岩）', category: 'material', itemStyle: { color: '#5d4037' } },
                    { name: '条石（青条石）', category: 'material', itemStyle: { color: '#5d4037' } },
                    { name: '石灰灰浆', category: 'material', itemStyle: { color: '#bdbdbd' } },
                    { name: '糯米灰浆', category: 'material', itemStyle: { color: '#bdbdbd' } },
                    { name: '陶瓦', category: 'material', itemStyle: { color: '#a1887f' } },
                    { name: '黄土（夯实）', category: 'material', itemStyle: { color: '#8b4513' } },
                    { name: '黄土（石灰改良）', category: 'material', itemStyle: { color: '#8b4513' } },
                ],
                links: [
                    // 华北四合院 - 材料连接（基于Excel数据：木材0.55, 砖0.30, 灰浆0.08, 石材0.05, 瓦作0.02）
                    { source: '华北四合院', target: '木材（松木）', value: 0.165 },
                    { source: '华北四合院', target: '木材（杉木）', value: 0.165 },
                    { source: '华北四合院', target: '木材（楠木）', value: 0.220 },
                    { source: '华北四合院', target: '青砖', value: 0.300 },
                    { source: '华北四合院', target: '石灰灰浆', value: 0.048 },
                    { source: '华北四合院', target: '糯米灰浆', value: 0.032 },
                    { source: '华北四合院', target: '条石（花岗岩）', value: 0.025 },
                    { source: '华北四合院', target: '条石（青条石）', value: 0.025 },
                    { source: '华北四合院', target: '陶瓦', value: 0.020 },
                    
                    // 徽派民居 - 材料连接（基于Excel数据：木材0.50, 砖0.32, 灰浆0.04, 石材0.12, 瓦作0.02）
                    { source: '徽派民居', target: '木材（松木）', value: 0.150 },
                    { source: '徽派民居', target: '木材（杉木）', value: 0.150 },
                    { source: '徽派民居', target: '木材（楠木）', value: 0.200 },
                    { source: '徽派民居', target: '青砖', value: 0.320 },
                    { source: '徽派民居', target: '石灰灰浆', value: 0.024 },
                    { source: '徽派民居', target: '糯米灰浆', value: 0.016 },
                    { source: '徽派民居', target: '条石（花岗岩）', value: 0.060 },
                    { source: '徽派民居', target: '条石（青条石）', value: 0.060 },
                    { source: '徽派民居', target: '陶瓦', value: 0.020 },
                    
                    // 广府镬耳屋 - 材料连接（基于Excel数据：木材0.35, 砖0.42, 灰浆0.06, 石材0.15, 瓦作0.02）
                    { source: '广府镬耳屋', target: '木材（松木）', value: 0.105 },
                    { source: '广府镬耳屋', target: '木材（杉木）', value: 0.105 },
                    { source: '广府镬耳屋', target: '木材（楠木）', value: 0.140 },
                    { source: '广府镬耳屋', target: '青砖', value: 0.420 },
                    { source: '广府镬耳屋', target: '石灰灰浆', value: 0.036 },
                    { source: '广府镬耳屋', target: '糯米灰浆', value: 0.024 },
                    { source: '广府镬耳屋', target: '条石（花岗岩）', value: 0.075 },
                    { source: '广府镬耳屋', target: '条石（青条石）', value: 0.075 },
                    { source: '广府镬耳屋', target: '陶瓦', value: 0.020 },
                    
                    // 云南一颗印 - 材料连接（基于Excel数据：木材0.35, 砖0.12, 灰浆0.03, 石材0.05, 土0.45）
                    { source: '云南一颗印', target: '木材（松木）', value: 0.105 },
                    { source: '云南一颗印', target: '木材（杉木）', value: 0.105 },
                    { source: '云南一颗印', target: '木材（楠木）', value: 0.140 },
                    { source: '云南一颗印', target: '青砖', value: 0.120 },
                    { source: '云南一颗印', target: '石灰灰浆', value: 0.018 },
                    { source: '云南一颗印', target: '糯米灰浆', value: 0.012 },
                    { source: '云南一颗印', target: '条石（花岗岩）', value: 0.025 },
                    { source: '云南一颗印', target: '条石（青条石）', value: 0.025 },
                    { source: '云南一颗印', target: '黄土（夯实）', value: 0.225 },
                    { source: '云南一颗印', target: '黄土（石灰改良）', value: 0.225 },
                    
                    // 西北窑洞 - 材料连接（基于Excel数据：木材0.05, 砖0.20, 灰浆0.03, 石材0.12, 土0.60）
                    { source: '西北窑洞', target: '木材（松木）', value: 0.015 },
                    { source: '西北窑洞', target: '木材（杉木）', value: 0.015 },
                    { source: '西北窑洞', target: '木材（楠木）', value: 0.020 },
                    { source: '西北窑洞', target: '青砖', value: 0.200 },
                    { source: '西北窑洞', target: '石灰灰浆', value: 0.018 },
                    { source: '西北窑洞', target: '糯米灰浆', value: 0.012 },
                    { source: '西北窑洞', target: '条石（花岗岩）', value: 0.060 },
                    { source: '西北窑洞', target: '条石（青条石）', value: 0.060 },
                    { source: '西北窑洞', target: '黄土（夯实）', value: 0.300 },
                    { source: '西北窑洞', target: '黄土（石灰改良）', value: 0.300 }
                ],
                categories: [
                    { name: 'build' },
                    { name: 'material' }
                ],
                lineStyle: {
                    color: 'source',
                    curveness: 0.5,
                    opacity: 0.8
                },
                emphasis: {
                    focus: 'adjacency',
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 2,
                        borderType: 'solid'
                    },
                },
                label: {
                    show: true,
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#3e231a'
                }
            }
        ],
        backgroundColor: 'transparent'
    };

    // 初始化所有图表
    const chordChart = echarts.init(document.getElementById('chordChart'));
    const treemapSunburstChart = echarts.init(document.getElementById('treemapSunburstChart'));
    const pcScatChart = echarts.init(document.getElementById('parallelScatter'));
    const sankeyChart = echarts.init(document.getElementById('sankeyChart'));

    // 设置初始配置
    chordChart.setOption(chordOption);
    treemapSunburstChart.setOption(treemapOption);
    pcScatChart.setOption(parallelScatterOption);
    sankeyChart.setOption(sankeyOption);

    // 图表2：树图↔旭日图 3秒切换
    let currentTreeOption = treemapOption;
    setInterval(()=>{
        currentTreeOption = currentTreeOption === treemapOption ? sunburstOption : treemapOption;
        treemapSunburstChart.setOption(currentTreeOption);
    }, 3000);

    // 图表1↔图表2 联动：点击结构→高亮对应建筑
    const structureToDwelling = {
        '抬梁式':'华北四合院','砖木混合':'徽派民居','砖木结构':'岭南骑楼','竹木结构':'傣族竹楼','拱券复合':'西北窑洞'
    };
    chordChart.on('click', params=>{
        const dwelling = structureToDwelling[params.name];
        if (dwelling) {
            const opt = JSON.parse(JSON.stringify(treemapSunburstChart.getOption()));
            function traverse(nodes) {
                nodes.forEach(n=>{
                    if (n.name === dwelling) {
                        n.itemStyle = n.itemStyle || {};
                        n.itemStyle.stroke = '#ffcc00';
                        n.itemStyle.strokeWidth = 3;
                        n.itemStyle.shadowBlur = 8;
                        n.itemStyle.shadowColor = 'rgba(255,204,0,0.6)';
                    }
                    if (n.children) traverse(n.children);
                });
            }
            traverse(opt.series[0].data);
            treemapSunburstChart.setOption(opt);
        }
    });

    // 窗口大小变化时适配所有图表
    window.addEventListener('resize', () => {
        chordChart.resize();
        treemapSunburstChart.resize();
        pcScatChart.resize();
        sankeyChart.resize();
    });
}

// 页面加载完成后初始化图表
window.addEventListener('load', initAllCharts);