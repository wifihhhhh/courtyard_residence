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
            case 'adaptation':
                // 当前页面，无需跳转
                break;
            case 'wisdom':
                window.location.href = 'sub3_wisdom.html';
                break;
            case 'culture':
                window.location.href = 'sub4_culture.html';
                break;
            case 'modern':
                window.location.href = 'sub5_modern.html';
                break;
        }
    });
});

// 3. 初始化所有图表
function initAllCharts() {
    // ---------------------- 1. 散点图（民居屋顶坡度与墙体厚度） ----------------------
    const scatterChart = echarts.init(document.getElementById('scatterChart'));
    const scatterOption = {
      tooltip: {
        show: true,
        trigger: 'item',
        formatter: function(params) {
          return `
            <div style="padding:5px;">
              <div><strong>${params.data[2]}</strong></div>
              <div>屋顶坡度：${params.data[0]} °</div>
              <div>墙体厚度：${params.data[1]} mm</div>
            </div>
          `;
        },
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderColor: '#e2ca56',
        borderWidth: 1,
        textStyle: {
          color: '#333'
        }
      },
      xAxis: {
        name: '屋顶坡度 (°)',
        nameLocation: 'middle',
        nameGap: 30,
        nameTextStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        },
        axisLabel: {
          fontSize: 12
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            opacity: 0.3
          }
        }
      },
      yAxis: {
        name: '墙体厚度 (mm)',
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        },
        axisLabel: {
          fontSize: 12
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            opacity: 0.3
          }
        },
        min: 0,
        max: 1600,  // 比最大值1500多100，避免点贴顶
        interval: 300,
        splitLine: {
            show: true,
            lineStyle: {
            type: 'dashed',
            opacity: 0.3
            }
        }
      },
      series: [
        {
          name: '民居数据',
          type: 'scatter',
          symbolSize: 20,
          itemStyle: {
            color: function(params) {
              // 使用自定义颜色数组
              return customColorPalette[params.dataIndex];
            },
            borderColor: '#74655A',
            borderWidth: 1.5,
            shadowBlur: 5,
            shadowColor: 'rgba(223, 173, 72, 0.3)'
          },
          data: [
            [27.5, 600, '华北四合院'],
            [30.0, 500, '徽派民居'],
            [27.0, 240, '广府镬耳屋'],
            [35, 550, '云南一颗印'],
            [0.0, 1500, '西北窑洞']
          ],
          label: {
            show: false
          }
        }
      ],
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%',
        top: '20%'
      },
      backgroundColor: 'transparent'
    };
    scatterChart.setOption(scatterOption);

    // ---------------------- 2. 漏斗图（地区天气情况） ----------------------
    const funnelChart = echarts.init(document.getElementById('funnelChart'));
    const funnelOption = {
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          let category = '';
          if (params.seriesIndex === 0 || params.seriesIndex === 1) {
            category = '年均气温';
          } else {
            category = '年降水量';
          }
          return `${category}<br>${params.name}：${params.value}`;
        }
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        top: 'center',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: 'Funnel',
          type: 'funnel',
          width: '35%',
          height: '40%',
          left: '5%',
          top: '10%',
          funnelAlign: 'right',
          itemStyle: {
            color: function(params) {
              // 使用自定义颜色数组
              return customColorPalette[params.dataIndex];
            }
          },
          data: [
            { value: 12.2, name: '北京市' },
            { value: 15.9, name: '河南省' },
            { value: 17, name: '安徽省' },
            { value: 18.1, name: '云南省' },
            { value: 22.2, name: '广东省' }
          ]
        },
        {
          name: 'Pyramid',
          type: 'funnel',
          width: '35%',
          height: '40%',
          left: '5%',
          top: '55%',
          sort: 'ascending',
          funnelAlign: 'right',
          itemStyle: {
            color: function(params) {
              // 使用自定义颜色数组
              return customColorPalette[params.dataIndex];
            }
          },
          data: [
            { value: 12.2, name: '北京市' },
            { value: 15.9, name: '河南省' },
            { value: 17, name: '安徽省' },
            { value: 18.1, name: '云南省' },
            { value: 22.2, name: '广东省' }
          ]
        },
        {
          name: 'Funnel',
          type: 'funnel',
          width: '35%',
          height: '40%',
          left: '60%',
          top: '10%',
          funnelAlign: 'left',
          itemStyle: {
            color: function(params) {
              // 使用自定义颜色数组
              return customColorPalette[params.dataIndex];
            }
          },
          data: [
            { value: 55.8, name: '北京市' },
            { value: 985.7, name: '河南省' },
            { value: 1149, name: '安徽省' },
            { value: 1050.3, name: '云南省' },
            { value: 1892.5, name: '广东省' }
          ]
        },
        {
          name: 'Pyramid',
          type: 'funnel',
          width: '35%',
          height: '40%',
          left: '60%',
          top: '55%',
          sort: 'ascending',
          funnelAlign: 'left',
          itemStyle: {
            color: function(params) {
              // 使用自定义颜色数组
              return customColorPalette[params.dataIndex];
            }
          },
          data: [
            { value: 55.8, name: '北京市' },
            { value: 985.7, name: '河南省' },
            { value: 1149, name: '安徽省' },
            { value: 1050.3, name: '云南省' },
            { value: 1892.5, name: '广东省' }
          ]
        }
      ],
      backgroundColor: 'transparent'
    };
    funnelChart.setOption(funnelOption);

    // ---------------------- 3. 5张雷达图 ----------------------
    // 雷达图1：华北四合院
    const radarChart1 = echarts.init(document.getElementById('radarChart1'));
    const radarOption1 = {
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          const indicators = ['严寒适应力', '多雨适应力', '强辐射适应力', '通风散热力', '防风设计力'];
          let tooltipContent = `<strong>${params.name}</strong><br/>`;
          params.value.forEach((score, index) => {
            tooltipContent += `${indicators[index]}：${score}分<br/>`;
          });
          return tooltipContent;
        }
      },
      radar: {
        indicator: [
          { name: '严寒', max: 100 },
          { name: '多雨', max: 100 },
          { name: '强辐射', max: 100 },
          { name: '通风', max: 100 },
          { name: '防风', max: 100 }
        ],
        center: ['50%', '55%'],
        radius: '70%',
        nameTextStyle: { fontSize: 10 },
        axisName: {
            color: '#625645',
            fontSize: 14,
        },
      },
      series: [{
        name: '华北四合院',
        type: 'radar',
        areaStyle: { opacity: 0.4, color: customColorPalette[0] },
        lineStyle: { color: customColorPalette[0], width: 2 },
        itemStyle: {color: customColorPalette[1]},
        data: [{ value: [37.14, 51.43, 34.51, 60, 70.84], name: '华北四合院' }]
      }],
      backgroundColor: 'transparent'
    };
    radarChart1.setOption(radarOption1);

    // 雷达图2：徽派民居
    const radarChart2 = echarts.init(document.getElementById('radarChart2'));
    const radarOption2 = {
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          const indicators = ['严寒适应力', '多雨适应力', '强辐射适应力', '通风散热力', '防风设计力'];
          let tooltipContent = `<strong>${params.name}</strong><br/>`;
          params.value.forEach((score, index) => {
            tooltipContent += `${indicators[index]}：${score}分<br/>`;
          });
          return tooltipContent;
        }
      },
      radar: {
        indicator: [
          { name: '严寒', max: 100 },
          { name: '多雨', max: 100 },
          { name: '强辐射', max: 100 },
          { name: '通风', max: 100 },
          { name: '防风', max: 100 }
        ],
        center: ['50%', '55%'],
        radius: '70%',
        nameTextStyle: { fontSize: 10 },
        axisName: {
            color: '#625645',
            fontSize: 14,
        },
      },
      series: [{
        name: '徽派民居',
        type: 'radar',
        areaStyle: { opacity: 0.4, color: customColorPalette[1] },
        lineStyle: { color: customColorPalette[1], width: 2 },
        itemStyle: {color: customColorPalette[1]},
        data: [{ value: [38.62, 78.09, 43.33, 30.4, 69.76], name: '徽派民居' }]
      }],
      backgroundColor: 'transparent'
    };
    radarChart2.setOption(radarOption2);

    // 雷达图3：广府镬耳屋
    const radarChart3 = echarts.init(document.getElementById('radarChart3'));
    const radarOption3 = {
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          const indicators = ['严寒适应力', '多雨适应力', '强辐射适应力', '通风散热力', '防风设计力'];
          let tooltipContent = `<strong>${params.name}</strong><br/>`;
          params.value.forEach((score, index) => {
            tooltipContent += `${indicators[index]}：${score}分<br/>`;
          });
          return tooltipContent;
        }
      },
      radar: {
        indicator: [
          { name: '严寒', max: 100 },
          { name: '多雨', max: 100 },
          { name: '强辐射', max: 100 },
          { name: '通风', max: 100 },
          { name: '防风', max: 100 }
        ],
        center: ['50%', '55%'],
        radius: '70%',
        nameTextStyle: { fontSize: 10 },
        axisName: {
            color: '#625645',
            fontSize: 14,
        },
      },
      series: [{
        name: '广府镬耳屋',
        type: 'radar',
        areaStyle: { opacity: 0.4, color: customColorPalette[2] },
        lineStyle: { color: customColorPalette[2], width: 2 },
        itemStyle: {color: customColorPalette[1]},
        data: [{ value: [20, 81.71, 28.64, 80, 74.8], name: '广府镬耳屋' }]
      }],
      backgroundColor: 'transparent'
    };
    radarChart3.setOption(radarOption3);

    // 雷达图4：云南一颗印
    const radarChart4 = echarts.init(document.getElementById('radarChart4'));
    const radarOption4 = {
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          const indicators = ['严寒适应力', '多雨适应力', '强辐射适应力', '通风散热力', '防风设计力'];
          let tooltipContent = `<strong>${params.name}</strong><br/>`;
          params.value.forEach((score, index) => {
            tooltipContent += `${indicators[index]}：${score}分<br/>`;
          });
          return tooltipContent;
        }
      },
      radar: {
        indicator: [
          { name: '严寒', max: 100 },
          { name: '多雨', max: 100 },
          { name: '强辐射', max: 100 },
          { name: '通风', max: 100 },
          { name: '防风', max: 100 }
        ],
        center: ['50%', '55%'],
        radius: '70%',
        nameTextStyle: { fontSize: 10 },
        axisName: {
            color: '#625645',
            fontSize: 14,
        },
      },
      series: [{
        name: '云南一颗印',
        type: 'radar',
        areaStyle: { opacity: 0.4, color: customColorPalette[3] },
        lineStyle: { color: customColorPalette[3], width: 2 },
        itemStyle: {color: customColorPalette[1]},
        data: [{ value: [39.68, 81.65, 58.67, 28.2, 52], name: '云南一颗印' }]
      }],
      backgroundColor: 'transparent'
    };
    radarChart4.setOption(radarOption4);

    // 雷达图5：西北窑洞
    const radarChart5 = echarts.init(document.getElementById('radarChart5'));
    const radarOption5 = {
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          const indicators = ['严寒适应力', '多雨适应力', '强辐射适应力', '通风散热力', '防风设计力'];
          let tooltipContent = `<strong>${params.name}</strong><br/>`;
          params.value.forEach((score, index) => {
            tooltipContent += `${indicators[index]}：${score}分<br/>`;
          });
          return tooltipContent;
        }
      },
      radar: {
        indicator: [
          { name: '严寒', max: 100 },
          { name: '多雨', max: 100 },
          { name: '强辐射', max: 100 },
          { name: '通风', max: 100 },
          { name: '防风', max: 100 }
        ],
        center: ['50%', '55%'],
        radius: '70%',
        nameTextStyle: { fontSize: 10 },
        axisName: {
            color: '#625645',
            fontSize: 14,
        },
      },
      series: [{
        name: '西北窑洞',
        type: 'radar',
        areaStyle: { opacity: 0.4, color: customColorPalette[4] },
        lineStyle: { color: customColorPalette[4], width: 2 },
        itemStyle: {color: customColorPalette[1]},
        data: [{ value: [91.28, 20, 70.09, 38.8, 78.34], name: '西北窑洞' }]
      }],
      backgroundColor: 'transparent'
    };
    radarChart5.setOption(radarOption5);

    // 窗口大小变化时适配所有图表
    window.addEventListener('resize', () => {
        scatterChart.resize();
        funnelChart.resize();
        radarChart1.resize();
        radarChart2.resize();
        radarChart3.resize();
        radarChart4.resize();
        radarChart5.resize();
    });
}

// 页面加载完成后初始化图表
window.addEventListener('load', initAllCharts);