//Simple implementation of Binary Search Tree node
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // BST Insert algorithm
  insert(value, parent = this.root) {
    const newNode = new Node(value);
    if (this.root === null) return this.root = newNode;

    if (newNode.value < parent.value) {
          if (parent.left === null) {
            parent.left = newNode;
          } else {
            this.insert(value, parent.left);
          }
        } else {
          if (parent.right === null) {
            parent.right = newNode;
          } else {
            this.insert(value, parent.right);
          }
        }
  }
}
