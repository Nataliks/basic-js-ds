const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {

  constructor() {
    this.base = null;
  }

  root() {    
    if (this.base === null) {
      this.data = "null";
    }

    return this.base;   
  }

  add(data) {
    this.base = addItem(this.base, data);
    
    function addItem(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = addItem(node.left, data);
      } else {
        node.right = addItem(node.right, data);
      }

      return node;
    }
    
  }

  has(data) {
    return searchItem(this.base, data);

    function searchItem(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      if (data < node.data) {
        return searchItem(node.left, data);
      } else {
        return searchItem(node.right, data);
      }
    }
  }

  find(data) {
    return findItem(this.base, data);

    function findItem(node, data) {
      if (node === null) {
        return null;
      }
      
      if (data < node.data) {
        return findItem(node.left, data);
      } else if (data > node.data){
        return findItem(node.right, data);
      } else {
        return node;
      }
    }

  }

  remove(data) {
    this.base = removeItem(this.base, data);
    
    function removeItem(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeItem(node.left, data);
        return node;
      } else if(data > node.data){
        node.right = removeItem(node.right, data);
      } else {
        if (!node.left && !node.right) {
          node = null;
          return node;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minRightItem = node.right;
        while (minRightItem.left) {
          minRightItem = minRightItem.left;
        }

        node.data = minRightItem.data;

        node.right = removeItem(node.right, minRightItem.data);

        return node;

      }

      return node;
    }
    
  }

  min() {
    if (!this.base) {
      return;
    }

    let node = this.base;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.base) {
      return;
    }

    let node = this.base;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }

  leftMovement(cb) {
    moveLeft(this.base, cb);

    function moveLeft(node, cb) {
      if (node) {
        moveLeft(node.left, cb);
        cb(node.data);
        moveLeft(node.right, cb)
      }
    }
  }

  RightMovement(cb) {
    moveRight(this.base, cb);

    function moveRight(node, cb) {
      if (node) {
        moveRight(node.right, cb);
        cb(node.data);
        moveRight(node.left, cb)
      }
    }
  }
}

module.exports = {
  BinarySearchTree
};


