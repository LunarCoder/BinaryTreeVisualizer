//The main index.html script for BST Visualizer. Links everything together to create the final webapp.

// future imports
//
//
import { BinarySearchTree } from "./bst.js";
import {drawTree} from "./drawer.js";


//Initial example tree to display when the page is loaded
const initialTree = new BinarySearchTree();
for (let i = 0; i < 20; i++) {
  initialTree.insert(Math.floor(Math.random() * 100));
}

console.log("Drawing inital tree..");
drawTree(initialTree, document.getElementById("bst"));