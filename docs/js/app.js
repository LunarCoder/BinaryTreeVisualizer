// The main index.html script for BST Visualizer.

// Imports
import { BinarySearchTree } from "./bst.js";
import {drawTree, highlightNode, unhighlightNode} from "./drawer.js";

// Constants
const delay = 1500; 

// HTML element links
const input = document.getElementById("valueInput");
const clearButton = document.getElementById("clear");
const code = document.getElementById("code");

const searchButton = document.getElementById("search");
const insertButton = document.getElementById("insert");
const deleteButton = document.getElementById("delete");
const selByRankButton = document.getElementById("selByRank");


// Helper sleep function for async operations
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Initial example tree to display when the page is loaded
// Calls the bare-bone insert function because we don't need highlighting for that
console.log("Drawing initial tree..");
const initialTree = new BinarySearchTree();
let generatedValues = [];
for (let i = 0; i < 15; i++) {
  let val = Math.floor(Math.random() * 100);
  while (generatedValues.includes(val)) {
    val = Math.floor(Math.random() * 100);
  }
  console.log(`Generated unique value: ${val}`);
  generatedValues.push(val);
  initialTree._insert(val);
}

let nodes = drawTree(initialTree, document.getElementById("bst"));


// Assign buttons to their respective algorithm functions
searchButton.addEventListener("click", () => {
  const value = parseInt(input.value);

  if (!isNaN(value)) {
    visualSearch(initialTree, value);
  } else {
    alert("Please enter a valid number.");
  }

  input.value = "";
});

insertButton.addEventListener("click", async () => {
  const value = parseInt(input.value);

  if (!isNaN(value)) {
    const alg = await visualInsert(initialTree, value);

    nodes = drawTree(initialTree, document.getElementById("bst"));
    //alert("Value already exists in the tree.");
  } else {
    alert("Please enter a valid number.");
  }

  input.value = "";
});

clearButton.addEventListener("click", () => {
  initialTree.clear();
  nodes = drawTree(initialTree, document.getElementById("bst"));
});


// Visual functions to interface with the BST generator functions for each algorithm
async function visualSearch(tree, value) {
  const steps = tree.search(value);

  for await (const step of steps) {
    const node = step.node;
    const pseudo = step.text;

    if (!(node === null)) {
      highlightNode(nodes[node.value].nodeElement);
      code.textContent = pseudo;
      await sleep(delay);
      unhighlightNode(nodes[node.value].nodeElement);

    } else {
      code.textContent = pseudo;
      await sleep(delay);
    }
  }

}

async function visualInsert(tree, value) {
  const steps = tree.insert(value);

  for await (const step of steps) {
    const node = step.node;
    const pseudo = step.text;

    if (!(node === null)) {
      highlightNode(nodes[node.value].nodeElement);
      code.textContent = pseudo;
      await sleep(delay);
      unhighlightNode(nodes[node.value].nodeElement);

    } else {
      code.textContent = pseudo;
      await sleep(delay);
    }
  }


}

async function visualDelete(tree, value) {

}

async function visualSelectByRank(tree, rank) {

}
