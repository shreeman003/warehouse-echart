var dom = document.getElementById('chart-container');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};

var option;

option = {
  title: {
    text: 'warehouse'
  },
  tooltip: {},

  series: [
    {
      type: 'graph',
      layout: 'none',
      symbolSize: 50,
      roam: true,
      label: {
        show: true
      },
      edgeSymbol: ['circle', 'line'],
      edgeSymbolSize: [4, 10],
      edgeLabel: {
        fontSize: 20
      },
      data: [
        {
          name: 'aisle 1',
          x: 300,
          y: 0
        },
        {
          name: 'aisle 2',
          x: 300,
          y: 100
        },
        {
          name: 'aisle 3',
          x: 300,
          y: 200
        },
        {
          name: 'aisle 4',
          x: 300,
          y: 300
        },
        {
          name: 'bin 1',
          x: 400,
          y: 0
        },
        {
          name: 'bin 2',
          x: 500,
          y: 0
        },
        {
          name: 'bin 3',
          x: 600,
          y: 0
        },
        {
          name: 'bin 4',
          x: 400,
          y: 100
        },
        {
          name: 'bin 5',
          x: 500,
          y: 100
        },
        {
          name: 'bin 6',
          x: 600,
          y: 100
        },

        {
          name: 'bin 7',
          x: 400,
          y: 200
        },
        {
          name: 'bin 8',
          x: 500,
          y: 200
        },
        {
          name: 'bin 9',
          x: 600,
          y: 200
        },
        {
          name: 'bin 10',
          x: 400,
          y: 300
        },

        {
          name: 'bin 11',
          x: 500,
          y: 300
        },
        {
          name: 'bin 12',
          x: 600,
          y: 300
        }
      ],
      // links: [],
      links: [
        {
          source: 'aisle 1',
          target: 'aisle 2',
          lineStyle: {
            color: 'green'
          }
        },
        {
          source: 'aisle 1',
          target: 'bin 1'
        },
        {
          source: 'bin 1',
          target: 'bin 2'
        },
        {
          source: 'bin 2',
          target: 'bin 3'
        },
        {
          source: 'bin 3',
          target: 'bin 6'
        },
        {
          source: 'aisle 2',
          target: 'bin 4',
          lineStyle: {
            color: 'green'
          }
        },
        {
          source: 'bin 4',
          target: 'bin 5',
          lineStyle: {
            color: 'green'
          }
        },
        {
          source: 'bin 5',
          target: 'bin 6'
        },
        {
          source: 'bin 6',
          target: 'bin 9'
        },
        {
          source: 'aisle 2',
          target: 'aisle 3'
        },
        {
          source: 'aisle 3',
          target: 'bin 7'
        },
        {
          source: 'bin 7',
          target: 'bin 8'
        },
        {
          source: 'bin 8',
          target: 'bin 9'
        },
        {
          source: 'bin 9',
          target: 'bin 12'
        },
        {
          source: 'aisle 3',
          target: 'aisle 4'
        },
        {
          source: 'aisle 4',
          target: 'bin 10'
        },
        {
          source: 'bin 10',
          target: 'bin 11'
        },
        {
          source: 'bin 11',
          target: 'bin 12'
        }
      ],
      lineStyle: {
        opacity: 0.9,
        width: 2,
        curveness: 0
      }
    }
  ]
};


if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);