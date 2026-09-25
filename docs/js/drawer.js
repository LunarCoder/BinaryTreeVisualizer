// Drawer.js handles the logic for drawing the BST using SVG elements. 
// It takes a tree and an <svg> element and draws the tree inside the SVG recursively.

// Tree Settings
const nodeColor = "black";
const textColor = "white";
const lineColor = "lightpink";

//Initial node size
const nodeSize = 100;

// Function that takes a BST and SVG element and draws the tree inside the SVG
export function drawTree(tree, svg) {
  svg.innerHTML = "";
  drawNodes(tree.root, 0, 0, svg);
}

// Helper function to recursively draw nodes and lines connecting them
function drawNodes(node, slot, depth, svg) {
  if (node === null) return;

  // Determine the x position using a simple slot system
  // This ensures that each node has it's own position, avoiding overlapping nodes
  const rect = svg.getBoundingClientRect();
  const slots = 2 ** depth;

  // Based on depth and current slot, calculate the current x and y position of this node
  const x = (slot + 0.5) / slots * rect.width;
  const y = nodeSize + depth * (nodeSize * 0.95 ** depth);

  // Calculate the child y position
  const nextY = nodeSize + (depth + 1) * (nodeSize * 0.95 ** (depth + 1));

  if (node.left !== null) {
    const nextX = (slot * 2 + 0.5) / (slots * 2) * rect.width;

    drawLine(x, y, nextX, nextY, svg);
    drawNodes(node.left, slot * 2, depth + 1, svg);
  }
  if (node.right !== null) {
    const nextX = (slot * 2 + 1 + 0.5) / (slots * 2) * rect.width;

    drawLine(x, y, nextX, nextY, svg);
    drawNodes(node.right, slot * 2 + 1, depth + 1, svg);
  }

  drawNode(x, y, nodeSize * 0.7 ** depth, svg);
  drawText(x, y, nodeSize * 0.7 ** depth, node.value, svg);
}

// Helper function to draw a single node
function drawNode(x, y, size, svg) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  node.setAttribute("cx", x);
  node.setAttribute("cy", y);
  node.setAttribute("r", size);
  node.setAttribute("fill", nodeColor);

  svg.appendChild(node);
}

// Helper function to draw a line
function drawLine(x1, y1, x2, y2, svg) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", lineColor);
  line.setAttribute("stroke-width", "2.5");

  svg.appendChild(line);
}
// Helper function to draw text
function drawText(x, y, fontSize, value, svg) {
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", x);
  text.setAttribute("y", y);
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("dominant-baseline", "middle");
  text.setAttribute("font-size", fontSize);
  text.setAttribute("fill", textColor);
  text.textContent = value;

  svg.appendChild(text);
}