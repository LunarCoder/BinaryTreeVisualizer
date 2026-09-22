//Handles the logic for drawing the BST.

//Node spacing
const xSpacing = 200;
const yspacing = 75;

//Takes a BST and SVG element and draws the tree inside the SVG
export function drawTree(tree, svg) {
  svg.innerHTML = ""; //Clear the SVG element

  //Determine starting position of the root node
  const rect = svg.getBoundingClientRect();
  const x = rect.width / 2;
  const y = rect.y + 50;

  drawNodes(tree.root, x, y, svg, 0);
}

//Recursively draw nodes and lines connecting them
function drawNodes(node, x, y, svg, depth) {
  if (node === null) return;
    drawNode(x, y, svg);
    if (node.left !== null) {
        drawLine(x, y, x - xSpacing, y + yspacing, svg);
        drawNodes(node.left, x - xSpacing, y + yspacing, svg, depth + 1);
    }
    if (node.right !== null) {
        drawLine(x, y, x + xSpacing, y + yspacing, svg);
        drawNodes(node.right, x + xSpacing, y + yspacing, svg, depth + 1);
    }
}

//Helper function to draw a single node
function drawNode(x, y, svg) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  node.setAttribute("cx", x);
  node.setAttribute("cy", y);
  node.setAttribute("r", 20);
  node.setAttribute("fill", "black");
  svg.appendChild(node);
}

//Helper function to drawn a line
function drawLine(x1, y1, x2, y2, svg) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "black");
  line.setAttribute("stroke-width", "2");
  svg.appendChild(line);
}