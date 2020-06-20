// This performs the A* algorithm WITHOUT finding the best
// path, it simply finds the order of the nodes in which we
// explored. Later, in the PathfindingVisualizer.jsx file, we
// will find the path by backtracking through to least weighted
// path (using a function defined here). Note that this is just
// copied dijkstra.js, with a few addons.

export function aStar(grid, startNode, finishNode) {
  // Goal return value of this function
  const orderedNodes = [];
  startNode.distance = 0;
  startNode.weightDistance = 0;
  const unvisited = getAllNodes(grid);

  // !! gives the boolean value of a number (i.e. 0 = false, 1 = true)
  while (!!unvisited.length) {
    sortNodes(unvisited);
    const closestNode = unvisited.shift();

    if (closestNode.isWall) continue;
    // If the closest node is at distance infinity, that means we are stuck...
    if (closestNode.distance === Infinity) return orderedNodes;

    closestNode.isVisited = true;
    // Here, we use push because the nodes need to be in order to animate properly and for other operations
    orderedNodes.push(closestNode);

    if (closestNode === finishNode) return orderedNodes;

    updateUnvisitedNeighbors(closestNode, grid, finishNode);
  }
}

const heuristic = (node, finish) => {
  return Math.abs(node.row - finish.row) + Math.abs(node.col - finish.col);
};

const updateUnvisitedNeighbors = (currentNode, grid, finish) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
  const currentDistance = currentNode.distance;

  for (const neighbor of unvisitedNeighbors) {
    if (neighbor.isWeight) {
      neighbor.distance = currentDistance + 12;
    } else {
      neighbor.distance = currentDistance + 1;
    }

    // Change their weight distance to reflect whether they are or aren't in the direction of the finish node
    neighbor.weightDistance = heuristic(neighbor, finish) + neighbor.distance;
    neighbor.previousNode = currentNode;
  }
};

const getUnvisitedNeighbors = (currentNode, grid) => {
  const neighbors = [];
  const { row, col } = currentNode;

  // Get everything on the bottom of this node (if there is anything)
  if (row > 0) neighbors.push(grid[row - 1][col]);
  // Get everything on the top of this node (if there is anything)
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  // Get everything on the left of this node (if there is anything)
  if (col > 0) neighbors.push(grid[row][col - 1]);
  // Get everything on the right of this node (if there is anything)
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  // Only return the unvisited nodes
  return neighbors.filter((neighbor) => !neighbor.isVisited);
};

const sortNodes = (nodeList) =>
  nodeList.sort((nodeA, nodeB) => nodeA.weightDistance - nodeB.weightDistance);

const getAllNodes = (grid) => {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

// Function that backtracks AFTER the dijkstra main function
// has been called. This will get the shortest path.
export const getStarPath = (finishNode) => {
  const nodesInPath = [];
  let currentNode = finishNode;

  while (currentNode) {
    nodesInPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInPath;
};
