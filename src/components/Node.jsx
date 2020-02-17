import React from 'react';
import '../css/Node.css';

const Node = (props) => {
    return (
        <div>
            <div id = {props.type === "root" ? "root": props.value} className={props.type !== "root" && (!props.isLeftOverlap && !props.isRightOverlap) ? "circle childNodes " + props.value : ((props.isLeftOverlap || props.isRightOverlap)) ?  ("overlapCircle childNodes " + props.value) : "root circle"} style = {{left:(props.isRightOverlap ? props.style.left-50 : props.isLeftOverlap ? props.style.left+50 :props.style.left), top:(props.isRightOverlap || props.isLeftOverlap) ? props.style.top-50 : props.style.top}}>
                <h3>{props.value}</h3>
            </div>
            {props.hasRight && !props.hasFarRight && props.type !== "root" ? <div className={"arrow rightArrow"} style={{left: props.isRightOverlap ? props.style.left +33 : props.style.left + 77, top: props.isRightOverlap ? props.style.top + 23 : props.style.top + 73, width: props.isRightOverlap ? "120px" : ""}}></div> : ""}
            {props.hasRight && props.hasFarRight && props.type !== "root" ? <div className={"arrow rightArrow"} style={{left: props.style.left + 227, top: props.style.top + 73, width: "200px", transform: "rotateY(0deg) rotate(20deg)"}}></div> : ""}
            {props.hasLeft && props.type !== "root" ? <div className={"arrow leftArrow"} style={{left: props.isLeftOverlap ? props.style.left -33 : props.style.left - 77, top: props.isLeftOverlap ? props.style.top + 23 : props.style.top + 73, width: props.isLeftOverlap ? "120px" : ""}}></div> : ""}
        </div>
    );
};

export default Node;