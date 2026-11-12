// The main index.html script for BST Visualizer.

// Imports
import { BinarySearchTree } from "./bst.js";
import {drawTree, highlightNode, unhighlightNode} from "./drawer.js";

// HTML element links
const input = document.getElementById("valueInput");
const clearButton = document.getElementById("clear");
const code = document.getElementById("code");
const speed = document.getElementById("speed");
let delay = 5000 - speed.value; //all in ms

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
    await visualInsert(initialTree, value);

    nodes = drawTree(initialTree, document.getElementById("bst"));
  } else {
    alert("Please enter a valid number.");
  }

  input.value = "";
});

deleteButton.addEventListener("click", async () => {
  const value = parseInt(input.value);

  if (!isNaN(value)) {
    await visualDelete(initialTree, value);

    nodes = drawTree(initialTree, document.getElementById("bst"));
  } else {
    alert("Please enter a valid number.");
  }

  input.value = "";
})

clearButton.addEventListener("click", () => {
  initialTree.clear();
  nodes = drawTree(initialTree, document.getElementById("bst"));
});

speed.addEventListener("input", () => {
  // As the slider goes up, the delay goes down in ms (faster)
  // Max speed is no delay
  delay = 5000 - speed.value;
});


// Visual functions to interface with the BST generator functions for each algorithm
async function visualSearch(tree, value) {
  const steps = tree.search(value);

  await visualizeSteps(steps);

}

async function visualInsert(tree, value) {
  const steps = tree.insert(value);

  await visualizeSteps(steps);
}

async function visualDelete(tree, value) {
  const steps = tree.delete(value);

  await visualizeSteps(steps);
}

async function visualSelectByRank(tree, rank) {

}

// Handle the steps of a generator function
async function visualizeSteps(_steps) {
  for await (const step of _steps) {
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