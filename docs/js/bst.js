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
      /*yield {
        node: current,
        text: `Check if ${value} == ${current.value}`
      };*/
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
  

  *delete(value, node = this.root) {
    if (node === null) {
      yield {
        node: null,
        text: `${value} not found in tree`
      };

      return null;
    }
    
    //Search left or right until found
    if (node.value > value) {
      yield {
        node: node,
        text: `${value} < ${node.value}; search left`
      };

      node.left = yield *this.delete(value, node.left);
    } else if (node.value < value) {
      yield {
        node: node,
        text: `${value} > ${node.value}; search right`
      };

      node.right = yield *this.delete(value, node.right);
    } else {
      yield {
        node: node,
        text: `Found ${value}; delete node`
      };

      // Three delete cases

      // 0 children
      if (node.left === null && node.right === null) {
        yield {
          node: node,
          text: `Node has no children; delete node`
        };

        if (node === this.root) {
          this.root = null;
        }

        return null;
      }

      // 1 child, left or right
      if (node.left === null) {
        yield {
          node: node,
          text: `Node has no left child; replace with right child`
        };
        
        if (node === this.root) {
          this.root = node.right;
        }

        return node.right;
      }

      if (node.right === null) {
        yield {
          node: node,
          text: `Node has no right child; replace with left child`
        };

        if (node === this.root) {
          this.root = node.left;
        }

        return node.left;
      }

      // 2 children
      yield {
        node: node,
        text: `Node has two children; replace with in-order successor`
      };

      let successor = node.right;
      while (successor.left !== null) {
        successor = successor.left;
      }

      node.value = successor.value;
      node.right = yield *this.delete(successor.value, node.right);
    }

    return node;
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
