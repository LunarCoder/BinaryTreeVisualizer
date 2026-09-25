//The main index.html script for BST Visualizer. Links everything together to create the final webapp.

// future imports
//
//
import { BinarySearchTree } from "./bst.js";
import {drawTree} from "./drawer.js";


//Initial example tree to display when the page is loaded
const initialTree = new BinarySearchTree();
let generatedValues = [];
for (let i = 0; i < 15; i++) {
  let val = Math.floor(Math.random() * 100);
  while (generatedValues.includes(val)) {
    val = Math.floor(Math.random() * 100);
  }
  console.log(`Generated value: ${val}`);
  generatedValues.push(val);
  initialTree.insert(val);
}

console.log("Drawing inital tree..");
drawTree(initialTree, document.getElementById("bst"));