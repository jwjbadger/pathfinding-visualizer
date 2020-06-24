# This Project

This project was created following the rough instructions given by [Clément Mihailescu](https://www.youtube.com/watch?v=msttfIHHkak). This project will hopefully be used to learn about React and path-finding algorithms. Hopefully this project will also give an insight into creating projects and how to go about working on them.

## What Am I Looking At?

You are watching what a pathfinding algorithm is 'looking' at when it decides to go somewhere. Any of the blue nodes are areas that the algorithm is currently 'exploring'. The yellow nodes represent the path from the start to end node. The weights (accessed through creation selector) represent a node that is tough to get to. In real life this might represent a road that is wet, snowy, or somewhere else that is hard to get to. The '>' symbol represents the start and the flag represents the finish. The walls represent an area that can't be moved through (like a blocked off road).

## What I Learned

With this project, I learned a bit about how to use git, Github, and manage projects. This project taught me about web frameworks, specifically React. I also learned a bit about Electron and using Node.js in order to create the project and the Electron app. I feel as though I learned a lot with this project about frontend development in general, including: working with frameworks, state, laying out pages, and css.

## Viewing

You can view this project through github pages [here](https://jwjbadger.github.io/pathfinding-visualizer/index.html).

## Running

If you want to try out this project **locally**, run:

```bash
git clone https://github.com/jwjbadger/pathfinding-visualizer.git
```

then, `npm run` or `npm run build` from the project's root folder depending on the amount of optimization you want. Also check out the [desktop version](#desktop-application) if you want to try an App rather than a webapp.

## Desktop Application

If you want to try the desktop application created with electron, use the following command to clone the branch:

```bash
git clone -b desktop --single-branch https://github.com/jwjbadger/pathfinding-visualizer.git
```

Then use `cd pathfinding-visualizer` to move to the local folder, then run `npm install` and `npm run build` to get a binary for your OS. Now, in the dist folder, their should be an installer which you can run to install and run the application.

## The Algorithms

### Dijkstra's

Dijkstra's algorithm works by setting the distance to everything as infinity. Next, Dijkstra's algorithm sets the distance to the start node to 0. This insures that the algorithm will start at the _start_.

Next, the algorithm will explore all nodes around it. Here, it will update the distance from it to the nodes. If a node is a weight, it will set its distance to the weight of the current node plus a higher number (i.e. 12). If the node is a wall, it will keep its distance at infinity. Otherwise, it will set the weight to the weight of the node the current node's weight plus 1. Finally, it will move to the lowest weighted node. If there are multiple lowest nodes, it will move in a predefined direction (i.e. the first lowest of up, down, left, then right). It will also store the node it came from.

It will repeat this until it finds the target node. Then, from the target node, it will find the node with the lowest total weight (the weight from that node through the shortest path to the start), and follow that path all the way to the start.

### A*

The A* algorithm is more of an addon to Dijkstra's algorithm than an algorithm in itself. How it works, is it creates the basic Dijkstra functionality, but adds a number to the weight of each node. This number has to do with how far the node is from the finish node. An easy way to compute this is `abs(node.x - target.x) + abs(node.y - target.y)` (pseudocode). This keeps the algorithm from *moving* away from the target.
