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
        { name: 'aisle 1', x: 300, y: 0 },
        { name: 'aisle 2', x: 300, y: 100 },
        { name: 'aisle 3', x: 300, y: 200 },
        { name: 'aisle 4', x: 300, y: 300 },
        { name: 'bin 1', x: 400, y: 0 },
        { name: 'bin 2', x: 500, y: 0 },
        { name: 'bin 3', x: 600, y: 0 },
        { name: 'bin 4', x: 400, y: 100 },
        { name: 'bin 5', x: 500, y: 100 },
        { name: 'bin 6', x: 600, y: 100 },
        { name: 'bin 7', x: 400, y: 200 },
        { name: 'bin 8', x: 500, y: 200 },
        { name: 'bin 9', x: 600, y: 200 },
        { name: 'bin 10', x: 400, y: 300 },
        { name: 'bin 11', x: 500, y: 300 },
        { name: 'bin 12', x: 600, y: 300 }
      ],
      links: [
        { source: 'aisle 1', target: 'aisle 2' },
        { source: 'aisle 1', target: 'bin 1' },
        { source: 'bin 1', target: 'bin 2' },
        { source: 'bin 2', target: 'bin 3' },
        { source: 'bin 3', target: 'bin 6' },
        { source: 'aisle 2', target: 'bin 4' },
        { source: 'bin 4', target: 'bin 5' },
        { source: 'bin 5', target: 'bin 6' },
        { source: 'bin 6', target: 'bin 9' },
        { source: 'aisle 2', target: 'aisle 3' },
        { source: 'aisle 3', target: 'bin 7' },
        { source: 'bin 7', target: 'bin 8' },
        { source: 'bin 8', target: 'bin 9' },
        { source: 'bin 9', target: 'bin 12' },
        { source: 'aisle 3', target: 'aisle 4' },
        { source: 'aisle 4', target: 'bin 10' },
        { source: 'bin 10', target: 'bin 11' },
        { source: 'bin 11', target: 'bin 12' }
      ],
      lineStyle: {
        opacity: 0.9,
        width: 2,
        curveness: 0
      }
    }
  ]
};

myChart.setOption(option);

window.addEventListener('resize', myChart.resize);

function dijkstra(graph, startNode) {
  let distances = {};
  let prev = {};
  let pq = new PriorityQueue();
  graph.nodes.forEach(node => {
    if (node === startNode) {
      distances[node] = 0;
      pq.enqueue(node, 0);
    } else {
      distances[node] = Infinity;
      pq.enqueue(node, Infinity);
    }
    prev[node] = null;
  });

  while (!pq.isEmpty()) {
    let minNode = pq.dequeue().element;
    if (obstacles.includes(minNode)) continue; // Skip nodes with obstacles

    graph.edges[minNode].forEach(neighbor => {
      if (obstacles.includes(neighbor.node)) return; // Skip neighbors with obstacles

      let alt = distances[minNode] + neighbor.weight;
      if (alt < distances[neighbor.node]) {
        distances[neighbor.node] = alt;
        prev[neighbor.node] = minNode;
        pq.enqueue(neighbor.node, distances[neighbor.node]);
      }
    });
  }

  return { distances, prev };
}

class PriorityQueue {
  constructor() {
    this.collection = [];
  }
  enqueue(element, priority) {
    let newElement = { element, priority };
    if (this.isEmpty()) {
      this.collection.push(newElement);
    } else {
      let added = false;
      for (let i = 0; i < this.collection.length; i++) {
        if (newElement.priority < this.collection[i].priority) {
          this.collection.splice(i, 0, newElement);
          added = true;
          break;
        }
      }
      if (!added) {
        this.collection.push(newElement);
      }
    }
  }
  dequeue() {
    return this.collection.shift();
  }
  isEmpty() {
    return this.collection.length === 0;
  }
}

function prepareGraphData(option) {
  let nodes = option.series[0].data.map(node => node.name);
  let edges = {};
  nodes.forEach(node => {
    edges[node] = [];
  });
  option.series[0].links.forEach(link => {
    edges[link.source].push({ node: link.target, weight: 1 });
    edges[link.target].push({ node: link.source, weight: 1 });
  });
  return { nodes, edges };
}

let graph = prepareGraphData(option);

function findShortestPath(startNode, endNode, obstacles) {
  let { distances, prev } = dijkstra(graph, startNode, obstacles);
  let path = [];
  let u = endNode;
  while (prev[u] !== null) {
    path.unshift(u);
    u = prev[u];
  }
  if (u === startNode) path.unshift(u);
  return path;
}

function highlightPath(path) {
  option.series[0].links.forEach(link => {
    link.lineStyle = { color: 'black' }; // Reset all links to black
  });

  for (let i = 0; i < path.length - 1; i++) {
    let source = path[i];
    let target = path[i + 1];
    option.series[0].links.forEach(link => {
      if ((link.source === source && link.target === target) || (link.source === target && link.target === source)) {
        link.lineStyle = { color: 'red' };
      }
    });
  }
  myChart.setOption(option);
}

let paths = [
  ['aisle 1', 'aisle 3'],
  ['aisle 3', 'bin 1'],
  ['bin 1', 'bin 9'],
  ['aisle 4', 'bin 12']
];
let obstacles = ['aisle 2']
let currentIndex = 0;

document.getElementById('next-button').addEventListener('click', function() {
  if (currentIndex < paths.length) {
    let startNode = paths[currentIndex][0];
    let endNode = paths[currentIndex][1];
    let shortestPath = findShortestPath(startNode, endNode,obstacles);
    highlightPath(shortestPath);
    currentIndex++;
  }
});
