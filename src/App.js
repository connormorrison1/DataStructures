import React, {useEffect, useState} from 'react';
import './App.css';
import Node from "./components/Node";
import Header from "./components/Header";
import {BinaryTree} from "./algorithms/binaryTree";
import ConnectingLine from "./components/ConnectingLine";
import {build, uuidv4} from "./algorithms/buildTree";

function App() {
  const [nodes, setNodes] = useState([]);
  const [lines, setLines] = useState([<ConnectingLine/>]);
  const setArray = (data) => {
      let tree = new BinaryTree();
      let nodes = data.split(",");
      let allNodes = tree.createTree(nodes);
      allNodes = build(allNodes);
      setNodes(allNodes.map((item, key) =>
          <Node value = {item.key} isRightOverlap = {item.isRightOverlap} isLeftOverlap = {item.isLeftOverlap} type = {item.type ? item.type : ""} hasFarRight = {item.hasFarRight ? true : ""} leftChild = {item.type === "root" && item.left ? item.left.key : ""} rightChild = {item.type === "root" && item.right ? item.right.key : ""} hasRight={item.hasRight} hasLeft={item.hasLeft} leftNode = {item.left ? item.left.leftSpacing : ""} rightNode = {item.right ? item.right.leftSpacing : ""} parent={item.parent} style={{left:item.leftSpacing, top:item.top}}/>
      ));
      setLines(<ConnectingLine key = {uuidv4()} left={allNodes[0].left ? allNodes[0].left.key : ""} right={allNodes[0].right ? allNodes[0].right.key : ""} rand = {Math.random()}/>);
  };

  return (
    <div className="App">
      <Header id={"header"} className={"header"} updateArray = {setArray}/>
      {lines}
      <div id="nodes" className={"nodes"}>
          {nodes}
      </div>
    </div>
  );
}

export default App;
