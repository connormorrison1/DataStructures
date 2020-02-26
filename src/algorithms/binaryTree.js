class Node {

    constructor(key, parent) {
        this.key = key;
        this.left = null;
        this.right = null;
        this.parent = parent;
        this.top = 0;
        this.hasLeft = false;
        this.hasRight = false;
        this.leftSpacing = 0;
    }

}

class BinaryTree {

    constructor() {
        this.root = null;
    }

    insertNode(key) {
        if (this.root === null) {
            let nodeToAdd = new Node(key, null);
            this.root = nodeToAdd;
            this.root.isRoot = true;
        } else {
            let nodeToAdd = new Node(key, this.root.key);
            this.addNode(this.root, nodeToAdd);
        }
    }

    addNode(parent, toAdd) {
        let nodeToAdd = new Node(toAdd.key, parent.key);
        if (parseInt(nodeToAdd.key) > parseInt(parent.key)) {
            if (parent.right === null) {
                parent.right = nodeToAdd;
            } else {
                this.addNode(parent.right, nodeToAdd);
            }
        } else {
            if (parent.left === null) {
                parent.left = nodeToAdd;
            } else {
                this.addNode(parent.left, nodeToAdd);
            }
        }
    }

    createTree(nodesToAdd) {
        let self = this;
        nodesToAdd.forEach(function (item, index) {
            self.insertNode(item);
        });
        return this.preorderTraversal(this.root, []);
    }

    /**
     * Irorder traversal:
     * traverse left subtree -> visit root -> traverse right subtree
     */
    inorderTraversal() {

    }

    preorderTraversal(node, listOfNodes) {
        if (node === null) {
            return;
        }
        listOfNodes.push(node);
        this.preorderTraversal(node.left, listOfNodes);
        this.preorderTraversal(node.right, listOfNodes);
        return listOfNodes;
    }

    postorderTraversal(node, listOfNodes, firstRun) {
        if (node === null) {
            return;
        }
        this.postorderTraversal(node.left, listOfNodes, false);
        this.postorderTraversal(node.right, listOfNodes, false);
        listOfNodes.push(node);
    }
}

export {BinaryTree};