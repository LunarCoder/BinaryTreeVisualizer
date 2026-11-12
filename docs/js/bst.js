// BST Definitions, logic, and associated algorithms.

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

  clear() {
    this.root = null;
  }

  // Generator functions to be used with a highlighter
  // Each step call yields information about the current node, and a description of what is happening for the code highlighter.

  //A visualized iterative search algorithm for the BST
  *search(value) {
    let current = this.root;

    while (current !== null) {
      yield {
        node: current,
        text: `Check if ${value} == ${current.value}`
      };
      if (current.value === value) {
        yield {
          node: current,
          text: `Found ${value}`
        };        
        return true;
      } else if (value < current.value) {
        yield {
          node: current,
          text: `${value} < ${current.value}; search left`
        };        
        current = current.left;
      } else {
        yield {
          node: current,
          text: `${value} > ${current.value}; search right`
        };        
        current = current.right;
      }
    }

    yield {
      node: null,
      text: `${value} not found`
    };
    return false;
  }

  // A visualized recursive insert
  *insert(value, parent = this.root) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = new Node(value);
      yield {
        node: null,
        text: `Inserting ${value} as the root node`
      };
      return true;
    }

    if (value === parent.value) {
      yield {
        node: parent,
        text: `${value} already exists in the tree`
      };
      return false; // Prevent duplicate values
    }
    
    
    if (newNode.value < parent.value) {
      yield {
        node: parent,
        text: `${value} < ${parent.value}; search left`
      };
          if (parent.left === null) {
            yield {
              node: parent,
              text: `No value found; insert left`
            };
            parent.left = newNode;
            return true;
          } else {
            yield *this.insert(value, parent.left);
            return;
          }
        } else {
          yield {
            node: parent,
            text: `${value} > ${parent.value}; search right`
          };
          if (parent.right === null) {
            yield {
              node: parent,
              text: `${value} > ${parent.value}; no value found; insert right`
            };
            parent.right = newNode;
            return true;
          } else {
            yield * this.insert(value, parent.right);
            return;
          }
        }
  }
  

  *delete(value) {
  }

  *selectByRank(rank) {

  }



  // Barebones BST Insert algorithm
  _insert(value, parent = this.root) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return true;
    }

    if (value === parent.value) {
      return false; // Prevent duplicate values
    }
    
    if (newNode.value < parent.value) {
          if (parent.left === null) {
            parent.left = newNode;
            return true;
          } else {
            return this._insert(value, parent.left);
          }
        } else {
          if (parent.right === null) {
            parent.right = newNode;
            return true;
          } else {
            return this._insert(value, parent.right);
          }
        }
  }

  // Generator functions are utilized to segment each algorithm
  // This allows highlighting and code view updates in between steps.

}
