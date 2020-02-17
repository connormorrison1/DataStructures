import {BinaryTree} from "./binaryTree";

let arr = [];
let tree = new BinaryTree();
let levels = {};
let farthestLeft = -150;
let farthestRight = 150;

const findParent = (allNodes, node) => {
    allNodes.forEach((item, key) => {
        if(item.key === node.parent) {
            let index = allNodes.findIndex(function(thisNode) {
                return thisNode.key == node.parent;
            });
            node.top = allNodes[index].top + 150;
            if(levels[node.top]) {
                if(!levels[node.top].includes(node.key)) {
                    levels[node.top].push(node.key);
                }
            } else {
                levels[node.top] = [node.key];
            }
            findParent(allNodes, item);
        }
    });
};

const findSpacing = (allNodes, node, overlap) => {
    if(node.left !== null) {
        node.hasLeft = true;
        let spacing = -150;
        if(overlap){
            console.log(overlap);
            if(overlap.indexOf(node.left) >= 0){
                spacing = -450;
                node.hasFarRight = true;
            }
        }
        node.left.leftSpacing = (node.leftSpacing + spacing);
        findSpacing(allNodes, node.left,overlap);
    }
    if(node.right !== null) {
        node.hasRight = true;
        let spacing = 150;
        if(overlap){
            console.log(overlap);
            if(overlap.indexOf(node.right) >= 0){
                spacing = 450;
                node.hasFarRight = true;
            }
        }
        node.right.leftSpacing = (node.leftSpacing + spacing);
        findSpacing(allNodes, node.right,overlap);

    }
};

const findFarthestLeft = (allNodes, rightNode) => {
    if(rightNode.left !== null) {
        if(rightNode.left.leftSpacing < 150 && rightNode.left.leftSpacing < farthestRight){
            farthestRight = rightNode.left.leftSpacing;
        }
        findFarthestLeft(allNodes,rightNode.left);
    }
    if(rightNode.right !== null){
        if(rightNode.right.leftSpacing < 150 && rightNode.right.leftSpacing < farthestRight){
            farthestRight = rightNode.right.leftSpacing;
        }
        findFarthestLeft(allNodes,rightNode.right);
    }
    return (farthestRight);
};

const findFarthestRight = (allNodes, rightNode) => {
    if(rightNode.left !== null) {
        if(rightNode.left.leftSpacing > -150 && rightNode.left.leftSpacing > farthestLeft){
            farthestLeft = rightNode.left.leftSpacing;
        }
        findFarthestRight(allNodes,rightNode.left);
    }
    if(rightNode.right !== null){
        if(rightNode.right.leftSpacing > -150 && rightNode.right.leftSpacing > farthestLeft){
            farthestLeft = rightNode.right.leftSpacing;
        }
        findFarthestRight(allNodes,rightNode.right);
    }
    return (farthestLeft);
};

export const uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
};

export const build = (allNodes) => {
    allNodes.map((node, key) => {
        if(node.parent === null) {
            node.top = 0;
        } else {
            findParent(allNodes, node);
        }
    });
    let nodesToMove = [];
    allNodes.map((node,key)=>{
        if(node.left !== null && node.right !== null && node.parent !== null) {
            console.log(node);
            if(node.right.left !== null && node.left.right !== null) {
                nodesToMove.push(node.right);
            }
        }
    });
    allNodes.map((node,key)=>{
        findSpacing(allNodes, node, nodesToMove);
    });
    let distRight = 150;
    let distLeft = -150;
    if(allNodes[0].right) {
        distRight= findFarthestLeft(allNodes, allNodes[0].right);
        allNodes[0].right.leftSpacing = (distRight-300)*(-1);
        allNodes[0].rightChild = allNodes[0].right.key;
    }
    if(allNodes[0].left) {
        distLeft = findFarthestRight(allNodes, allNodes[0].left);
        allNodes[0].left.leftSpacing = (distLeft+300)*(-1);
        allNodes[0].leftChild = allNodes[0].left.key;
    }
    allNodes[0].type = "root";
    if(distLeft > -150) {
        findSpacing(allNodes, allNodes[0].left,nodesToMove);
    }
    if(distRight < 150) {
        findSpacing(allNodes, allNodes[0].right,nodesToMove);
    }

    let hasDuplicate = false;
    let sameSpacedNode = "";
    allNodes.map(v => [v.leftSpacing, v.top, v.key, v.parent, v]).sort().sort((a, b) => {
        if (a[0] === b[0] && a[1] === b[1]) {
            hasDuplicate = true;
            sameSpacedNode = a[2] + " " + a[0] + " " + a[1];
            if(parseInt(a[2]) > parseInt(a[3])){
                a[4].isRightOverlap = true;
                b[4].isLeftOverlap = true;
            } else {
                a[4].isLeftOverlap = true;
                b[4].isRightOverlap = true;
            }
        }
    });
    return allNodes;
};