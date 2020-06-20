export function randWeight(grid, startNode, finishNode) {
  const returnGrid = grid;

  for (let row = 0; row < grid.length; row++) {
    const currentRow = [];
    for (let col = 0; col < grid[0].length; col++) {
      const node = returnGrid[row][col];

      if (node.isFinish || node.isStart || node.isWall) {
        currentRow.push(node);
        continue;
      }

      node.isWeight = Math.random() >= 0.7;
      currentRow.push(node);
    }
    returnGrid[row] = currentRow;
  }
  return returnGrid;
}
