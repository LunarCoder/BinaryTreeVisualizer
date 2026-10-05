// Drawer.js handles the logic for drawing the BST using SVG elements. 
// It takes a tree and an <svg> element and draws the tree inside the SVG recursively.

// Tree Settings
const nodeColor = "black";
const textColor = "white";
const lineColor = "lightpink";
const nodeSize = 80; // Initial node size

// Function that takes a BST and SVG element and draws the tree inside the SVG
export function drawTree(tree, svg) {
  svg.innerHTML = "";
  const nodes = {};
  drawNodes(tree.root, 0, 0, svg, 0.7, 0.95, nodes);
  return nodes;
}

// Helper function to recursively draw nodes and lines connecting them.
function drawNodes(node, slot, depth, svg, shrinkFactor = 0.7, verticalShrinkFactor = 0.95, nodes = {}) {
  if (node === null) return;

  // Allocating nodes using a slot system based on depth 
  // Slots at depth = 2^depth
  // This ensures that each node has it's own position, avoiding overlapping nodes
  const rect = svg.getBoundingClientRect();
  const slots = 2 ** depth;
  const x = (slot + 0.5) / slots * rect.width;
  const y = nodeSize + depth * (nodeSize * verticalShrinkFactor ** depth);
  const nextY = nodeSize + (depth + 1) * (nodeSize * verticalShrinkFactor ** (depth + 1));  // Calculate the child y position
  const size = nodeSize * shrinkFactor ** depth;

  nodes[node.value] = { x, y, size };

  if (node.left !== null) {
    const nextX = (slot * 2 + 0.5) / (slots * 2) * rect.width;

    drawLine(x, y, nextX, nextY, svg);
    drawNodes(node.left, slot * 2, depth + 1, svg, shrinkFactor, verticalShrinkFactor, nodes);
  }
  if (node.right !== null) {
    const nextX = (slot * 2 + 1 + 0.5) / (slots * 2) * rect.width;

    drawLine(x, y, nextX, nextY, svg);
    drawNodes(node.right, slot * 2 + 1, depth + 1, svg, shrinkFactor, verticalShrinkFactor, nodes);
  }

  drawNode(x, y, size, svg);
  drawText(x, y, size, node.value, svg);
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
