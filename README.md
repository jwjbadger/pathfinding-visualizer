# This Project

This project was created following the rough instructions given by [Clément Mihailescu](https://www.youtube.com/watch?v=msttfIHHkak). This project will hopefully be used to learn about React and path-finding algorithms. Hopefully this project will also give an insight into creating projects and how to go about working on them.

## Viewing

You can view this project through github pages [here](https://jwjbadger.github.io/pathfinding-visualizer/index.html).

## Running

If you want to try out this project **locally**, run:

```bash
git clone https://github.com/jwjbadger/pathfinding-visualizer.git
```

then, `npm run` or `npm run build` from the project's root folder depending on the amount of optimization you want.

## The Algorithms

### Dijkstra's

Dijkstra's algorithm works by setting the distance to everything as infinity. Next, Dijkstra's algorithm sets the distance to the start node to 0. This insures that the algorithm will start at the _start_.

Next, the algorithm will explore all nodes around it. Here, it will update the distance from it to the nodes. If a node is a weight, it will set its distance to the weight of the current node plus a higher number (i.e. 12). If the node is a wall, it will keep its distance at infinity. Otherwise, it will set the weight to the weight of the node the current node's weight plus 1. Finally, it will move to the lowest weighted node. If there are multiple lowest nodes, it will move in a predefined direction (i.e. the first lowest of up, down, left, then right). It will also store the node it came from.

It will repeat this until it finds the target node. Then, from the target node, it will find the node with the lowest total weight (the weight from that node through the shortest path to the start), and follow that path all the way to the start.

### A*

The A* algorithm is more of an addon to Dijkstra's algorithm than an algorithm in itself. How it works, is it creates the basic Dijkstra functionality, but adds a number to the weight of each node. This number has to do with how far the node is from the finish node. An easy way to compute this is `abs(node.x - target.x) + abs(node.y - target.y)` (pseudocode). This keeps the algorithm from *moving* away from the target.