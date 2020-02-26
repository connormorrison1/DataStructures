import React, {useEffect, useState} from 'react';
import './App.css';
import Node from "./components/Node";
import Header from "./components/Header";
import {BinaryTree} from "./algorithms/binaryTree";
import {Trie} from "./algorithms/Trie";
import ConnectingLine from "./components/ConnectingLine";
import {build, uuidv4} from "./algorithms/buildTree";

function App() {
    const [nodes, setNodes] = useState([]);
    const [lines, setLines] = useState([<ConnectingLine/>]);
    const setArray = (data, type) => {
        let nodes = data.split(",");
        if (type === "BST") {
            let tree = new BinaryTree();
            let allNodes = tree.createTree(nodes);
            allNodes = build(allNodes);
            setNodes(allNodes.map((item, key) =>
                <Node value={item.key} isRightOverlap={item.isRightOverlap} isLeftOverlap={item.isLeftOverlap}
                      type={item.type ? item.type : ""} hasFarRight={item.hasFarRight ? true : ""}
                      leftChild={item.type === "root" && item.left ? item.left.key : ""}
                      rightChild={item.type === "root" && item.right ? item.right.key : ""} hasRight={item.hasRight}
                      hasLeft={item.hasLeft} leftNode={item.left ? item.left.leftSpacing : ""}
                      rightNode={item.right ? item.right.leftSpacing : ""} parent={item.parent}
                      style={{left: item.leftSpacing, top: item.top}}/>
            ));
            setLines(allNodes.map((item, key) => <ConnectingLine key={uuidv4()}
                                                                 parent={item.parent !== null ? item.parent : null}
                                                                 node={item.key} rand={Math.random()}/>));
        } else {
            let trieTree = new Trie();
            trieTree.createTree(nodes);
            let root = trieTree.root;
            let allTrieNodes = printTrie(root, 0, []);
            checkOverlap(allTrieNodes);
            setNodes(allTrieNodes.map((item, key) =>
                <Node trieNode={true} value={item.randomKey} type={(item.key !== null ? "" : "root")} letter={item.key}
                      style={{left: item.spacing, top: item.offset, marginRight: 50}}/>
            ));
            let initialTrieNodeLines = [];
            Object.values(allTrieNodes[0].children).forEach((child, key) => {
                initialTrieNodeLines.push(<ConnectingLine key={uuidv4()} type={"root"} parent={"root"}
                                                          node={child.randomKey}
                                                          rand={Math.random()}/>);
            });
            let allTrieNodeLines = [];
            allTrieNodes.forEach((item, key) =>
                allTrieNodeLines.push(<ConnectingLine key={uuidv4()}
                                                      parent={item.randomKey !== null ? item.parent.randomKey : null}
                                                      node={item.randomKey} rand={Math.random()}/>)
            );
            allTrieNodeLines.push(initialTrieNodeLines);
            setLines(allTrieNodeLines);
        }
    };

    const checkOverlap = (allNodes) => {
        for (let i = 0; i < allNodes.length; i++) {
            let nodeToCheck = allNodes[i];
            for (let y = 0; y < allNodes.length; y++) {
                let nodeCheckedAgainst = allNodes[y];
                if (i !== y) {
                    if ((nodeToCheck.spacing === nodeCheckedAgainst.spacing) && (nodeToCheck.offset === nodeCheckedAgainst.offset)) {
                        nodeToCheck.spacing -= 200;
                    }
                }
            }
        }
    };

    const printTrie = (node, offset, arrayOfNodes) => {
        node.offset = offset;
        arrayOfNodes.push(node);
        Object.values(node.children).forEach((child, key) => {
            printTrie(child, offset + 250, arrayOfNodes)
        });
        return arrayOfNodes;
    };

    return (
        <div className="App">
            <Header id={"header"} className={"header"} updateArray={setArray}/>
            <div id="svgContainer"></div>
            {lines}
            <div id="nodes" className={"nodes"}>
                {nodes}
            </div>
        </div>
    );
}

export default App;
