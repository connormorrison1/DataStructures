import React, {useState, useEffect} from 'react';
import {InputBase} from "@material-ui/core";
import '../css/Node.css';
import ConnectingLine from "./ConnectingLine";

const Node = (props) => {
    const [lines, setLine] = useState([]);
    //equiv to componentDidMount(), which is runs when component is initial loaded. like init()
    let lineLeft = 0;
    let lineTop = 0;
    let lineAngle = 0;
    let lineHeight = 0;

    return (
        <div >
        <div id = {props.type === "root" ? "root": props.value} className={props.type !== "root"? "circle childNodes " + props.value : "root circle"} style = {{left:props.style.left, top: props.style.top}}>
            <h3>{props.value}</h3>
        </div>
            {props.hasRight && !props.hasFarRight && props.type !== "root" ? <div className={"arrow rightArrow"} style={{left: props.style.left + 77, top: props.style.top + 73}}></div> : ""}
            {props.hasRight && props.hasFarRight && props.type !== "root" ? <div className={"arrow rightArrow"} style={{left: props.style.left + 227, top: props.style.top + 73, width: "200px", transform: "rotateY(0deg) rotate(20deg)"}}></div> : ""}
            {props.hasLeft && props.type !== "root" ? <div className={"arrow leftArrow"} style={{left: props.style.left - 77, top: props.style.top + 73}}></div> : ""}
        </div>
    );
};

export default Node;