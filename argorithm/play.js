//const readFileSyncAddress = "/dev/stdin"; // BackJun Submit
const readFileSyncAddress = "backjun/input.txt"; // vscode Test

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const log = console.log;

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) { // 정점추가
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }

  addEdge(v1, v2) { // 간선추가
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      v => v !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      v => v !== vertex1
    );
  }
}

let g = new Graph();
g.addVertex("Dallas");
g.addVertex("Tokyo");
g.addVertex("Aspen");

g.removeVertex("Dallas");

g.removeVertex("Asia")

g.addEdge("Dallas", "Tokyo");

g.removeEdge("Dallas", "Tokyo");
console.log(g);


// 인접 리스트 생성
const edges = [[0, 1], [1, 2], [3, 4]];

// Find the amzimum of Vertices
const maxVertex = edges.reduce((a, c) => {
  const bigger = Math.max(...c);
  if (bigger > a) return bigger;
  return a;
}, 0);

const adjList = {};

for (let i = 0; i <= maxVertex; i++) {
  adjList[i] = [];
}
for (let i = 0; i < edges.length; i++) {
  adjList[edges[i][0]].push(edges[i][1]);
  adjList[edges[i][1]].push(edges[i][0]);
}

const visited = {};
let count = 0;

