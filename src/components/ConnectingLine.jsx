import React, {useEffect, useState} from "react";
import {connectAll} from "../algorithms/connectNodes";
import Node from "./Node";

const ConnectingLine = (props) => {
    const [lines, setLines] = useState([]);

    useEffect(() => {
        let attributes = [];
        if(props.left) {
            //connectAll2(props.left,props.right);
            let attributes1 = connectAll(props.left, "path1");
            attributes.push(attributes1);
        }
        if(props.right) {
            let attributes2 = connectAll(props.right, "path2");
            attributes.push(attributes2);
        }
        if(attributes.length > 0){
            let l = [];
            attributes.forEach(function (attribute, index) {
                let path = "path" + (index+1);
                l.push(<path
                    key = {attribute.endX}
                    id={path}
                    d={'M'+attribute.startX+' '+attribute.startY+' V'+(attribute.startY +
                        attribute.delta)+' A' +attribute.delta + ' ' +attribute.delta + ' 0 0 ' +attribute.arc1 + ' ' + (attribute.startX +
                        attribute.delta * attribute.sigDeltaX) + ' ' + (attribute.startY + 2 * attribute.delta) + ' H' + (attribute.endX -
                        attribute.delta * attribute.sigDeltaX) + ' A' + attribute.delta + ' ' + attribute.delta + ' 0 0 ' + attribute.arc2 + ' ' + attribute.endX + ' ' +(attribute.startY +
                        3 * attribute.delta) + ' V' + attribute.endY}
                    stroke="#000"
                    fill="none"
                    strokeWidth="5px"/>);
            });
            setLines(l);
        }
    }, []);
    return (
        <div id="svgContainer" key = {props.rand} style={{margin: "50px 50px",position:"absolute",paddingTop:"40px"}}>
            <svg id="svg1" width="1000" height="1000" >
                {lines}
                <path
                    id="path2"
                    d="M0 0"
                    stroke="#000"
                    fill="none"
                    strokeWidth="5px"/>
                <path
                    id="path3"
                    d="M0 0"
                    strokeWidth="5px"
                    stroke="#000"
                    style={{fill:"none"}}/>
                <path
                    id="path4"
                    d="M0 0"
                    strokeWidth="5px"
                    stroke="#000"
                    style={{fill:"none",strokeWidth: "12px"}} />
                <path
                    id="path5"
                    d="M0 0"
                    strokeWidth="5px"
                    stroke="#000"
                    style={{fill:"none"}}/>
                <path
                    id="path6"
                    d="M0 0"
                    strokeWidth="5px"
                    style={{fill:"none"}}/>
            </svg>
        </div>
    )
};


export default ConnectingLine;